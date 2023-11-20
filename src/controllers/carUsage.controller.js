const carUsageService = require('../services/carUsage.service')

const getCarUsages = (req, res, next) => {
  try {
    const carUsages = carUsageService.getCarUsages()
    res.status(200).json(carUsages)
  } catch (error) {
    next(error)
  }
}

const getCarUsage = (req, res, next) => {
  try {
    const id = req.params.id
    const carUsage = carUsageService.getCarUsage(id)
    res.status(200).json(carUsage)
  } catch (error) {
    next(error)
  }
}

const startCarUsage = (req, res, next) => {
  try {
    const newCarUsage = req.body
    const startedCarUsage = carUsageService.startCarUsage(newCarUsage)
    res.status(201).json({
      message: 'Car usage successfully started',
      carUsage: startedCarUsage,
    })
  } catch (error) {
    next(error)
  }
}

const finishCarUsage = (req, res, next) => {
  try {
    const id = req.params.id
    const bodyData = req.body
    const finishedCarUsage = carUsageService.finishCarUsage(id, bodyData)
    res.status(200).json({
      message: 'Car usage successfully finished',
      carUsage: finishedCarUsage,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getCarUsage,
  startCarUsage,
  finishCarUsage,
  getCarUsages
}
