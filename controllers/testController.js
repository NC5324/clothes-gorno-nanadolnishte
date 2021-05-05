import express from 'express'
const router =express.Router()

router.post('/test', (req, res) => {
    console.log(req.body)
    res.status(200).send('Polu4ihme va6eto syob6tenie')
})

export default router
