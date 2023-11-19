class MemoryStorage {
  constructor() {
    this.carList = []
    this.driverList = []
  }

  setCars(newCars) {
    this.carList = newCars
  }

  getCars() {
    return this.carList
  }

  setDrivers(newDrivers) {
    this.driverList = newDrivers
  }

  getDrivers() {
    return this.driverList
  }
}

module.exports = new MemoryStorage()
