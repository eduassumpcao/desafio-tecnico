const express = require('express')
const router = express.Router()
const driverController = require('../controllers/driver.controller')

/* Get Drivers */
router.get('/', driverController.getDrivers)

/* Get Driver */
router.get('/:id', driverController.getDriver)

/* POST Driver */
router.post('/', driverController.registerDriver)

/* DELETE Driver */
router.delete('/:id', driverController.deleteDriver)

module.exports = router
