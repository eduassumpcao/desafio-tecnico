const carService = require('../services/car.service')

const getCars = (req, res, next) => {
  try {
    const cars = carService.getCars()
    res.status(200).json(cars)
  } catch (error) {
    next(error)
  }
}

const getCar = (req, res, next) => {
  try {
    const plate = req.params.id
    const car = carService.getCar(plate)
    res.status(200).json(car)
  } catch (error) {
    next(error)
  }
}

const registerCar = (req, res, next) => {
  try {
    const newCar = req.body
    const registeredCar = carService.registerCar(newCar)
    res.status(201).json(registeredCar)
  } catch (error) {
    next(error)
  }
}

module.exports = { registerCar, getCars, getCar }
