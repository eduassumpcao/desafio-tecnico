const driverService = require('../services/driver.service')

const getDrivers = (req, res, next) => {
  try {
    const drivers = driverService.getDrivers()
    res.status(200).json(drivers)
  } catch (error) {
    next(error)
  }
}

const registerDriver = (req, res, next) => {
  try {
    const newDriver = req.body
    const registeredDriver = driverService.registerDriver(newDriver)
    res
      .status(201)
      .json({
        message: 'Driver successfully registered',
        driver: registeredDriver,
      })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  registerDriver,
  getDrivers
}
