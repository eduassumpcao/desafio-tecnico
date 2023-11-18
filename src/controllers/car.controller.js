const carService = require('../services/car.service')

const getCars = (req, res, next) => {
  try {
    const { brand, color } = req.query
    const filters = {}

    if (brand) {
      filters.brand = brand
    }

    if (color) {
      filters.color = color
    }

    const cars = carService.getCars(filters)

    res.status(200).json(cars)
  } catch (error) {
    next(error)
  }
}

const getCar = (req, res, next) => {
  try {
    const id = req.params.id
    const car = carService.getCar(id)
    res.status(200).json(car)
  } catch (error) {
    next(error)
  }
}

const registerCar = (req, res, next) => {
  try {
    const newCar = req.body
    const registeredCar = carService.registerCar(newCar)
    res
      .status(201)
      .json({ message: 'Car successfully registered', car: registeredCar })
  } catch (error) {
    next(error)
  }
}

const updateCar = (req, res, next) => {
  try {
    const plate = req.params.id
    const newCarData = req.body
    const updatedCar = carService.updateCar(plate, newCarData)
    res
      .status(200)
      .json({ message: 'Car successfully updated', car: updatedCar })
  } catch (error) {
    next(error)
  }
}

module.exports = { registerCar, getCars, getCar, updateCar }
