class MemoryStorage {
  constructor() {
    this.carList = []
    this.driverList = []
    this.carUsageList = []
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

  setCarUsage(newCarUsage) {
    this.carUsageList = newCarUsage
  }

  getCarUsage() {
    return this.carUsageList
  }
}

module.exports = new MemoryStorage()
