import express from 'express'
import { Clothing } from '../models'

const router = express.Router()

router.get('/all', async(request, response) => {
    try {
        const clothes = await Clothing.findAll()
        response.status(200).json(clothes)
    } catch (err) {
        response.status(500)
        console.log(err)
    }
})

router.get('/:id', async(request, response) => {
    try {
        const clothing = await Clothing.findOne({
            where: {
                id: request.params.id
            }
        })
        response.status(200).json(clothing)
    } catch(err) {
        response.status(500)
        console.log(err)
    }
})






export default router
