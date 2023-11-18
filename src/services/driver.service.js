const uuid = require('uuid')
const BadRequest = require('../errors/BadRequest')
const NotFound = require('../errors/NotFound')

let drivers = []

const getDrivers = () => drivers

const getDriver = (id) => {
  const existingDriver = drivers.find((driver) => driver.id === id)

  if (!existingDriver) {
    throw new NotFound(`Driver with id '${id}' not found.`)
  }

  return existingDriver
}

const registerDriver = (newDriver) => {
  const { name } = newDriver

  if (!name) {
    throw new BadRequest(
      'Invalid request. Please provide a valid JSON object with properties: name.'
    )
  }

  const driver = {
    id: uuid.v4(),
    name: name,
  }

  drivers.push(driver)

  return driver
}

module.exports = {
  registerDriver,
  getDrivers,
  getDriver,
}
