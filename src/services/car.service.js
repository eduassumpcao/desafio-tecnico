const BadRequest = require('../errors/BadRequest')
const DuplicateError = require('../errors/DuplicateError')
const NotFound = require('../errors/NotFound')
const helper = require('../utils/helper.util')
const uuid = require('uuid')
const memoryStorage = require('../storage/memoryStorage')

const getCars = (filters = {}) => {
  const { brand, color } = filters

  let filteredCars = memoryStorage.getCars()

  if (brand) {
    filteredCars = filteredCars.filter(
      (car) => car.brand === brand.toUpperCase()
    )
  }

  if (color) {
    filteredCars = filteredCars.filter(
      (car) => car.color === color.toUpperCase()
    )
  }

  return filteredCars
}

const getCar = (id) => {
  const cars = memoryStorage.getCars()
  const existingCar = cars.find((car) => car.id === id)

  if (!existingCar) {
    throw new NotFound(`Car with id '${id}' not found.`)
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

  const cars = memoryStorage.getCars()
  const upperCasePlate = plate.toUpperCase()
  const upperCaseColor = color.toUpperCase()
  const upperCaseBrand = brand.toUpperCase()

  if (!helper.validateBrazilianPlate(upperCasePlate)) {
    throw new BadRequest(
      'Invalid Brazilian plate format. It should have three letters followed by four digits.'
    )
  }

  if (cars.some((car) => car.plate === upperCasePlate)) {
    throw new DuplicateError(
      `Car with plate '${upperCasePlate}' already exists.`
    )
  }

  const car = {
    id: uuid.v4(),
    plate: upperCasePlate,
    color: upperCaseColor,
    brand: upperCaseBrand,
  }

  memoryStorage.setCars([car, ...cars])

  return car
}

const updateCar = (id, newCarData) => {
  const { plate, color, brand } = newCarData

  const cars = memoryStorage.getCars()

  const existingCarIndex = cars.findIndex((car) => car.id === id)

  if (existingCarIndex === -1) {
    throw new NotFound(`Car with id '${id}' not found.`)
  }

  const existingCar = cars[existingCarIndex]

  const newPlateUpperCase = plate?.toUpperCase() || existingCar.plate
  const newColorUpperCase = color?.toUpperCase() || existingCar.color
  const newBrandUpperCase = brand?.toUpperCase() || existingCar.brand

  if (!helper.validateBrazilianPlate(newPlateUpperCase)) {
    throw new BadRequest(
      'Invalid Brazilian plate format. It should have three letters followed by four digits.'
    )
  }

  const otherCarWithSamePlate = cars.find(
    (car) => car.id !== id && car.plate === newPlateUpperCase
  )

  if (otherCarWithSamePlate) {
    throw new DuplicateError(
      `Car with plate '${newPlateUpperCase}' already exists with a different ID.`
    )
  }

  const updatedCar = {
    id: existingCar.id,
    plate: newPlateUpperCase,
    color: newColorUpperCase,
    brand: newBrandUpperCase,
  }

  cars[existingCarIndex] = updatedCar
  memoryStorage.setCars([...cars])

  return updatedCar
}

module.exports = {
  registerCar,
  getCars,
  getCar,
  updateCar,
}
