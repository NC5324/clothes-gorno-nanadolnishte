import express from 'express'
import {syncModels} from './models.js'
import hbs from 'express-handlebars'
import admin from 'firebase-admin'
import serviceAccount from './fir-test-3f43b-firebase-adminsdk-o0ix4-0ca47bfa7e.json'

//syncModels()
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://fir-test-3f43b-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'fir-test-3f43b.appspot.com',
})

const app = express()
const PORT = process.env.PORT || 3000
const db = admin.database()
const storage = admin.storage().bucket()

app.engine('handlebars', hbs())
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/'))

app.get('/', (req, res) => {
    res.render('home', {
        styles: '<link rel="stylesheet" href="public/stylesheets/style-index.css">\n',
        scripts: '<script src="public/scripts/script-index.js"></script>\n',

    })
})

app.get('/browse', (req, res) => {
    const ref = db.ref('furnitures')
    ref.once('value', (snapshot) => {
        const furnitures = snapshot.val();
        (async() => {
            for(let i = 0; i < furnitures.length; i++) {
                const x = furnitures[i]
                const images = JSON.parse(x.images)
                await storage.file(images[0]).getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                }).then(signedUrls => {
                    images[0] = signedUrls[0]
                    x.images = images
                })
            }
        })().then(() => {
            res.render('browse', {
                styles: '<link rel="stylesheet" href="public/stylesheets/style-browse.css">\n',
                scripts: '<script src="public/scripts/script-browse.js"></script>\n',
                furnitures: furnitures
            })
        })
    })
})

app.get('/details', (req, res) => {
    res.render('details', {
        styles: '<link rel="stylesheet" href="public/stylesheets/style-details.css">\n'
    })
})

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})
