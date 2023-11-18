const BadRequest = require('../errors/BadRequest')
const DuplicateError = require('../errors/DuplicateError')
const helper = require('../utils/helper.util')

let cars = []

const registerCar = (newCar) => {
  const { plate, color, brand } = newCar

  if (!plate || !color || !brand) {
    throw new BadRequest(
      'Invalid request. Please provide a valid JSON object with properties: plate, color, brand.'
    )
  }

  if (!helper.validateBrazilianPlate(plate)) {
    throw new BadRequest(
      'Invalid Brazilian plate format. It should have three letters followed by four digits.'
    )
  }

  const existingCar = cars.find((car) => car.plate === plate)

  if (existingCar) {
    throw new DuplicateError('Car with this plate already exists.')
  }

  const car = { plate, color, brand }
  cars.push(car)

  return car
}

module.exports = {
  registerCar
}
