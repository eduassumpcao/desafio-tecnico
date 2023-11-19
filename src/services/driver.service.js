const uuid = require('uuid')
const BadRequest = require('../errors/BadRequest')
const NotFound = require('../errors/NotFound')
const memoryStorage = require('../storage/memoryStorage')

const getDrivers = () => memoryStorage.getDrivers()

const getDriver = (id) => {
  const drivers = memoryStorage.getDrivers()
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
  const drivers = memoryStorage.getDrivers()
  memoryStorage.setDrivers([driver, ...drivers])

  return driver
}

const deleteDriver = (id) => {
  const drivers = memoryStorage.getDrivers()
  const existingDriverIndex = drivers.findIndex((driver) => driver.id === id)

  if (existingDriverIndex === -1) {
    throw new NotFound(`Driver with id '${id}' not found.`)
  }

  drivers.splice(existingDriverIndex, 1)
  memoryStorage.setDrivers([...drivers])
}

module.exports = {
  registerDriver,
  getDrivers,
  getDriver,
  deleteDriver,
}
