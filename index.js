import express from 'express'
import {syncModels} from './models.js'
import hbs from 'express-handlebars'

syncModels()

const app = express()
const PORT = process.env.PORT || 3000

hbs.create({
    helpers: {
        styles: () => {
            return '<link rel="stylesheet" href="#">'
        },
        scripts: () => {
            return '<script src="#">'
        }
    }
})

app.engine('handlebars', hbs())
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/'))

app.get('/', (req, res) => {
    res.render('home', {
        helpers: {
            styles: () => {
                return '<link rel="stylesheet" href="public/stylesheets/style-index.css">\n'
            },
            scripts: () => {
                return '<script src="public/scripts/script-index.js"></script>\n'
            }
        }
    })
})

app.get('/browse', (req, res) => {
    res.render('browse', {
        helpers: {
            styles: () => {
                return '<link rel="stylesheet" href="public/stylesheets/style-browse.css">\n'
            },
            scripts: () => {
                return '<script src="public/scripts/script-browse.js"></script>\n'
            }
        }
    })
})

app.get('/details', (req, res) => {
    res.render('details', {
        helpers: {
            styles: () => {
                return '<link rel="stylesheet" href="public/stylesheets/style-details.css">\n'
            }
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})
