import express from 'express'
const router =express.Router()

router.get('/test', (req, res) => {
    res.status(200).send('Polu4ihme va6eto syob6tenie')
})

export default router
