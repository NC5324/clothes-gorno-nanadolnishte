import express from 'express'
import cors from 'cors'
import multer from 'multer'
import { syncModels } from './models'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))
app.use('/stylesheets', express.static(__dirname + '/public/stylesheets'))
app.use('/scripts', express.static(__dirname + '/public/scripts'))
app.use('/assets', express.static(__dirname + '/public/assets'))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    }
})

app.get('/', (req, res) => {
    res.redirect('/index.html')
})

//POST route that creates new furniture
app.post('/api/admin/create', upload.array('foo'), (req, res) => {
    //convert from ([Object prototype null]{}) to {}
    const request = JSON.parse(JSON.stringify(req.body))
})

app.listen(3000, async() => {
    await syncModels()
    console.log(`\nServer running at port ${PORT}`)
    console.log(`Home page: http://localhost:${PORT}/`)
})
