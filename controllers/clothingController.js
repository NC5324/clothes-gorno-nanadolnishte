import express from 'express'
import { Clothing, Tag } from '../models'
import { Op } from 'sequelize'

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

router.post('/filter', async(request, response) => {
    try {
        const filterRequest = request.body
        console.log(filterRequest)
        const clothes = await Clothing.findAndCountAll({
            include: [{
                model: Tag,
                attributes: [],
                through: {
                    attributes: []
                },
                where: {
                    id: {
                        [Op.in]: filterRequest.categories
                    }
                }
            }],
            limit: filterRequest.perPage,
            offset: (filterRequest.currentPage - 1) * filterRequest.perPage
        })
        response.status(200).json(clothes)
    } catch(err) {
        response.status(500)
        console.log(err)
    }
})

export default router
