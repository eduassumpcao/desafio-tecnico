const BadRequest = require('../errors/BadRequest')
const DuplicateError = require('../errors/DuplicateError')
const NotFound = require('../errors/NotFound')
const helper = require('../utils/helper.util')

let cars = []

const getCars = () => {
  return cars
}

const getCar = (plate) => {
  const upperCasePlate = plate.toUpperCase()
  const existingCar = cars.find((car) => car.plate === upperCasePlate)

  if (!existingCar) {
    throw new NotFound('Car with this plate not found.')
  }

  return existingCar
}

const registerCar = (newCar) => {
  const { plate, color, brand } = newCar

  if (!plate || !color || !brand) {
    throw new BadRequest(
      'Invalid request. Please provide a valid JSON object with properties: plate, color, brand.'
    )
  }
  const upperCasePlate = plate.toUpperCase()

  if (!helper.validateBrazilianPlate(upperCasePlate)) {
    throw new BadRequest(
      'Invalid Brazilian plate format. It should have three letters followed by four digits.'
    )
  }

  const existingCar = cars.find((car) => car.plate === upperCasePlate)

  if (existingCar) {
    throw new DuplicateError('Car with this plate already exists.')
  }

  const car = { plate: upperCasePlate, color, brand }
  cars.push(car)

  return car
}

const updateCar = (originalPlate, newCarData) => {
  const { plate, color, brand } = newCarData

  if (!plate || !color || !brand) {
    throw new BadRequest(
      'Invalid request. Please provide a valid JSON object with properties: newPlate, newColor, newBrand.'
    )
  }

  const originalPlateUpperCase = originalPlate.toUpperCase()
  const newPlateUpperCase = plate.toUpperCase()

  if (!helper.validateBrazilianPlate(plate)) {
    throw new BadRequest(
      'Invalid Brazilian plate format. It should have three letters followed by four digits.'
    )
  }

  // Check if the provided plate exists.
  const existingCarIndex = cars.findIndex(
    (car) => car.plate === originalPlateUpperCase
  )

  if (existingCarIndex === -1) {
    throw new NotFound('Car with this plate not found.')
  }

  // Check if the new plate already exists.
  if (originalPlateUpperCase !== newPlateUpperCase) {
    const newPlateExists = cars.some((car) => car.plate === newPlateUpperCase)

    if (newPlateExists) {
      throw new DuplicateError('Car with this plate already exists.')
    }
  }

  // Update the car with the new information.
  const updatedCar = {
    plate: newPlateUpperCase,
    color: color,
    brand: brand,
  }

  // Update the car in the array.
  cars[existingCarIndex] = updatedCar

  return updatedCar
}

module.exports = {
  registerCar,
  getCars,
  getCar,
  updateCar,
}
