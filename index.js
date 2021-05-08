import express from 'express'
import cors from 'cors'
import multer from 'multer'
import {syncModels} from './models.js'
import hbs from 'express-handlebars'
import admin from 'firebase-admin'
import serviceAccount from './fir-test-3f43b-firebase-adminsdk-o0ix4-0ca47bfa7e.json'

//syncModels()
//initialize firebase admin sdk
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://fir-test-3f43b-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'fir-test-3f43b.appspot.com',
})

//configure express stuff
const app = express()
const PORT = process.env.PORT || 3000

//firebase
const db = admin.database()
const storage = admin.storage().bucket()

//other middleware
app.use(express.static(__dirname + '/'))

app.engine('handlebars', hbs())
app.set('view engine', 'handlebars')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    }
})

//routing
//POST route that creates new furniture
app.post('/api/admin/create', upload.array('foo'), (req, res) => {
    //convert from ([Object prototype null]{}) to {}
    const request = JSON.parse(JSON.stringify(req.body))

    const images = []
    req.files.forEach(file => {
        const blob = storage.file(file.originalname);
        const blobStream = blob.createWriteStream();

        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const publicUrl = `https://storage.googleapis.com/${storage.name}/${blob.name}`
            storage.file(blob.name).getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(signedUrls => {
                images.push(signedUrls[0])

                if(images.length === req.files.length) {
                    request.images = JSON.stringify(images)
                    //generate ID and save to firebase realtime db
                    //set ID to last element's ID + 1
                    //if no elements exists set ID to 0
                    const lastNode = db.ref('furnitures').orderByKey().limitToLast(1)
                    let id = req.body.id;
                    (async () => {
                        if (!id) {
                            return await lastNode.get()
                        }
                    })().then((snapshot) => {
                        if (snapshot.exists()) {
                            id = Number(Object.keys(snapshot.val())[0]) + 1
                        }
                        if (!id) {
                            id = 0
                        }
                    }).then(() => {
                        //log request for debugging purposes
                        //console.log(request);

                        db.ref(`furnitures/${id}`).set(request)

                        JSON.parse(request.categories).forEach(ctg => {
                            db.ref(`furnituresByCtg/${ctg}/${id}`).set(request)
                        })
                        res.status(200).send('Saved new furniture')
                    }).catch(error => {
                        res.send(error)
                    })
                }
            })
        })
        blobStream.end(file.buffer);
    })
})

//GET route that renders the homepage
app.get('/', (req, res) => {
    const ref = db.ref('categories')
    ref.once('value', (snapshot) => {
        const categories = snapshot.val()
        const vals = Object.values(categories)
        const keys = Object.keys(categories)
        keys.forEach((key, index) => {
            vals[index].code = key
        })
        res.render('home', {
            styles: '<link rel="stylesheet" href="public/stylesheets/style-index.css">\n',
            scripts: '<script src="public/scripts/script-index.js"></script>\n',
            categories: vals
        })
    })
})

//GET route that renders new-furniture-creation page
app.get('/admin/create', (req, res) => {
    //render create furniture admin page
    const ref = db.ref('categories')
    ref.once('value', (snapshot) => {
        const categories = snapshot.val()
        const vals = Object.values(categories)
        const keys = Object.keys(categories)
        keys.forEach((key, index) => {
            vals[index].code = key
        })
        res.render('admin-product-add', {
            styles: `<link rel="stylesheet" href="/public/stylesheets/style-admin-product-details.css">\n`,
            scripts: `<script src="/public/scripts/script-admin-product-details.js"></script>\n`,
            categories: vals
        })
    })
})

//GET route that renders browse page with optional category selected
app.get('/browse(/:category)?', (req, res) => {
    //render browse tab
    let ctg;
    db.ref('categories').once('value', (snapshot) => {
        const categories = snapshot.val()
        const vals = Object.values(categories)
        const keys = Object.keys(categories)
        keys.forEach((key, index) => {
            vals[index].code = key
            if(key === req.params.category) {
                ctg = {
                    title: vals[index].title,
                    code: key
                }
            }
        })
        let index = 0
        const ref = db.ref(ctg ? `furnituresByCtg/${ctg.code}` : 'furnitures')
        ref.once('value', (snapshot) => {
            const furnitures = snapshot.val();
            if(furnitures) {
                furnitures.forEach((furniture) => {
                    if(furniture.images) {
                        const images = JSON.parse(furniture.images)
                        if(images.length > 0) {
                            furniture.thumbnail = images[0]
                        }
                    }
                })
            }
            res.render('browse', {
                styles: '<link rel="stylesheet" href="/public/stylesheets/style-browse.css">\n',
                scripts: '<script src="/public/scripts/script-browse.js"></script>\n',
                furnitures: furnitures,
                categories: vals,
                title: ctg ? ctg.title : 'Всички продукти'
            })
        })
    })
})

app.get('/details', (req, res) => {
    //render product details page
    res.render('details', {
        styles: '<link rel="stylesheet" href="/public/stylesheets/style-details.css">\n'
    })
})

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})
