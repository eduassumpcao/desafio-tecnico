const express = require('express')
const router = express.Router()
const driverController = require('../controllers/driver.controller')

/* POST Driver */
router.post('/', driverController.registerDriver)

module.exports = router
