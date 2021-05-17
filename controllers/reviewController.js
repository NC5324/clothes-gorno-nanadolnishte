import express from 'express'
import { Review } from '../models'

const router = express.Router()

router.post('/create', async(request, response) => {
    try {
        const newReview = await Review.create({
            title: request.body.title,
            description: request.body.title,
            rating: request.body.rating,
            author: request.body.author,
            ClothingId: request.body.clothingId
        })
        response.status(200).json(newReview)
    } catch(err) {
        response.status(500)
        console.log(err)
    }
})

router.get('/clothing/:clothingId', async(request, response) => {
    try {
        const review = await Review.findAll({
            where: {
                ClothingId: request.params.clothingId
            }
        })
        response.status(200).json(review)
    } catch(err) {
        response.status(500)
        console.log(err)
    }
})

export default router
