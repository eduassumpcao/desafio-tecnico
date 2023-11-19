class MemoryStorage {
  constructor() {
    this.carList = []
  }

  setCars(newCars) {
    this.carList = newCars
  }

  getCars() {
    return this.carList
  }
}

module.exports = new MemoryStorage()
