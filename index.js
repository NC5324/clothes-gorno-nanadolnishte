import express from 'express'
import {syncModels} from './models.js'

syncModels()

const app = express()
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})
