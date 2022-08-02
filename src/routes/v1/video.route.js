const router = require('express').Router()
const controller = require('../../controllers/video.controller')
const { isAnURL, isWhitelisted } = require('../../middlewares/url')

router.get('/info', isAnURL, isWhitelisted, controller.info)
router.get('/download/:formatId', isAnURL, isWhitelisted, controller.download)

module.exports = router
