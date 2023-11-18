const express = require('express')
const router = express.Router()
const driverController = require('../controllers/driver.controller')

/* Get Drivers */
router.get('/', driverController.getDrivers)

/* POST Driver */
router.post('/', driverController.registerDriver)

module.exports = router
