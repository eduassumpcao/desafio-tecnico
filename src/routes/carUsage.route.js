const express = require('express')
const router = express.Router()
const carUsageController = require('../controllers/carUsage.controller')

router.get('/', carUsageController.getCarUsages)

/* Get Car Usage */
router.get('/:id', carUsageController.getCarUsage)

/* Start Car Usage */
router.post('/start', carUsageController.startCarUsage)

/* Finish Car Usage */
router.put('/finish/:id', carUsageController.finishCarUsage)

module.exports = router
