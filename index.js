import express from 'express'
import cors from 'cors'
import { syncModels } from './models'
import clothingController from './controllers/clothingController'
import tagController from './controllers/tagController'
import adminController from './controllers/adminController'
import reviewController from './controllers/reviewController'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))
app.use('/stylesheets', express.static(__dirname + '/public/stylesheets'))
app.use('/scripts', express.static(__dirname + '/public/scripts'))
app.use('/assets', express.static(__dirname + '/public/assets'))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.redirect('/index.html')
})

app.use('/api/clothes', clothingController)
app.use('/api/tags', tagController)
app.use('/api/admin', adminController)
app.use('/api/review', reviewController)

app.listen(3000, async() => {
    await syncModels()
    console.log(`\nServer running at port ${PORT}`)
    console.log(`Home page: http://localhost:${PORT}/`)
})
