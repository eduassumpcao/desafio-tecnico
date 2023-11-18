const express = require('express')
const router = express.Router()
const carController = require('../controllers/car.controller')

/* GET Cars */
router.get('/', carController.getCars)

/* GET Car by plate */
router.get('/:id', carController.getCar)

/* POST Car */
router.post('/', carController.registerCar)

module.exports = router
