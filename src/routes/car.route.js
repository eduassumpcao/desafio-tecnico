const express = require('express')
const router = express.Router()
const carController = require('../controllers/car.controller')

/* POST Car */
router.post('/', carController.registerCar)

module.exports = router
