import express from 'express'
import { Tag } from '../models'

const router = express.Router()

router.get('/all', async(request, response) => {
    try {
        const tags = await Tag.findAll()
        response.status(200).json(tags)
    } catch(err) {
        response.status(500)
        console.log(err)
    }
})

export default router
