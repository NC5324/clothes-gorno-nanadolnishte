import express from 'express'
import multer from 'multer'
import { Clothing, ClothingImage, ClothingTag, Image } from '../models'
import { rootPath } from '../root-path'

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, rootPath + '/public/assets')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage
})

router.post('/create', upload.array('foo'), async(request, response) => {
    try {
        //convert the formData request body into normal JSON-ish format
        const createRequest = JSON.parse(JSON.stringify(request.body))
        console.log(createRequest)

        //create new entry in 'clothing' table
        const newClothing = await Clothing.create({
            title: createRequest.title,
            description: createRequest.description,
            price: createRequest.price,
            price2: createRequest.price2
        })

        //create new entries in 'clothing_tag' association table
        for(const tagId of JSON.parse(createRequest.categories)) {
            await ClothingTag.create({
                ClothingId: newClothing.id,
                TagId: tagId
            })
        }

        //create new entries in 'clothing_image' association table
        for(const file of request.files) {
            const image = await Image.create({
                path: `assets/${file.originalname}`
            })
            await ClothingImage.create({
                ClothingId: newClothing.id,
                ImageId: image.id
            })
        }

        //Send HTTP:200 response with the new clothing entry as a message
        response.status(200).send(`Created new item: ${JSON.stringify(newClothing)}`)
    } catch(err) {
        response.status(500)
        console.error(err)
    }
})

export default router
