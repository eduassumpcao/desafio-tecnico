const driverService = require('../services/driver.service')

const getDrivers = (req, res, next) => {
  try {
    const drivers = driverService.getDrivers()
    res.status(200).json(drivers)
  } catch (error) {
    next(error)
  }
}

const getDriver = (req, res, next) => {
  try {
    const id = req.params.id
    const driver = driverService.getDriver(id)
    res.status(200).json(driver)
  } catch (error) {
    next(error)
  }
}

const registerDriver = (req, res, next) => {
  try {
    const newDriver = req.body
    const registeredDriver = driverService.registerDriver(newDriver)
    res.status(201).json({
      message: 'Driver successfully registered',
      driver: registeredDriver,
    })
  } catch (error) {
    next(error)
  }
}

const deleteDriver = (req, res, next) => {
  try {
    const id = req.params.id
    driverService.deleteDriver(id)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  registerDriver,
  getDrivers,
  getDriver,
  deleteDriver,
}
