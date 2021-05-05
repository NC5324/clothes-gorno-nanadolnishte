import express from 'express'
import cors from 'cors'

import {syncModels} from './models.js'
import testController from './controllers/testController.js'
//syncModels()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api', testController)

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})
