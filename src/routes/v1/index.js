const router = require('express').Router()
const videoRoutes = require('./video.route')

router.get('/status', (req, res) => res.json({ status: 200, message: 'OK' }))

router.use('/video', videoRoutes)

module.exports = router
