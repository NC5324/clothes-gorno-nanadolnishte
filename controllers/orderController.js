import express from 'express'
import { Order } from '../models'

const router = express.Router()

router.post('/create', async(request, response) => {
    console.log(request.body)
    try {
        const newOrder = await Order.create({
            sender: request.body.sender,
            address: request.body.address,
            phone: request.body.phone,
            price: request.body.price,
            products: request.body.products
        })
        response.status(200).json(newOrder)
    } catch(err) {
        response.status(500)
        console.log(err)
    }
})

export default router
