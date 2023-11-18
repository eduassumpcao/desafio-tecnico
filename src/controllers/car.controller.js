const carService = require('../services/car.service')

const getCars = (req, res) => {
  try {
    const cars = carService.getCars()
    res.status(200).json(cars)
  } catch (error) {
    res.status(error?.statusCode || 400).json({ error: error.message })
  }
}

const getCar = (req, res) => {
  try {
    const plate = req.params.id
    console.log(plate)
    const car = carService.getCar(plate)
    res.status(200).json(car)
  } catch (error) {
    res.status(error?.statusCode || 400).json({ error: error.message })
  }
}

const registerCar = (req, res) => {
  try {
    const newCar = req.body
    const registeredCar = carService.registerCar(newCar)
    res.status(201).json(registeredCar)
  } catch (error) {
    res.status(error?.statusCode || 400).json({ error: error.message })
  }
}

module.exports = { registerCar, getCars, getCar }
