const BadRequest = require('../../errors/BadRequest')
const DuplicateError = require('../../errors/DuplicateError')
const NotFound = require('../../errors/NotFound')
const carService = require('../../services/car.service')
const memoryStorage = require('../../storage/memoryStorage')
const uuid = require('uuid')

jest.mock('../../storage/memoryStorage')
jest.mock('uuid')

const sampleCar = {
  id: 'SOMEUUID',
  plate: 'ABC1234',
  color: 'BLUE',
  brand: 'TOYOTA',
}

const existingCar = {
  id: 'existingId',
  plate: 'ABC1234',
  color: 'Red',
  brand: 'Honda',
}

describe('carService', () => {
  beforeEach(() => {
    memoryStorage.getCars.mockReset()
  })

  describe('getCars', () => {
    test('getCars returns all cars from memoryStorage when no filters are provided', () => {
      memoryStorage.getCars.mockReturnValue([sampleCar])

      const result = carService.getCars()

      expect(result).toEqual([sampleCar])
      expect(memoryStorage.getCars).toHaveBeenCalled()
    })

    test('getCars returns filtered cars based on brand', () => {
      const filters = { brand: 'Toyota' }
      memoryStorage.getCars.mockReturnValue([sampleCar])

      const result = carService.getCars(filters)

      expect(result).toEqual([sampleCar])
      expect(memoryStorage.getCars).toHaveBeenCalled()
    })
  })

  describe('getCar', () => {
    test('getCar returns the car with the specified ID', () => {
      const carId = 'SOMEUUID'
      memoryStorage.getCars.mockReturnValue([sampleCar])

      const result = carService.getCar(carId)

      expect(result).toEqual(sampleCar)
      expect(memoryStorage.getCars).toHaveBeenCalled()
    })

    test('getCar throws NotFound error when car with the specified ID is not found', () => {
      const nonExistentCarId = 'nonExistentId'
      memoryStorage.getCars.mockReturnValue([sampleCar])

      expect(() => carService.getCar(nonExistentCarId)).toThrowError(NotFound)
      expect(memoryStorage.getCars).toHaveBeenCalled()
    })
  })

  describe('registerCar', () => {
    test('registerCar is called with valid data.', () => {
      memoryStorage.getCars.mockReturnValue([])
      uuid.v4.mockReturnValue('SOMEUUID')
      const result = carService.registerCar(sampleCar)
      expect(result).toEqual(sampleCar)
      expect(memoryStorage.getCars).toHaveBeenCalled()
      expect(memoryStorage.setCars).toHaveBeenCalled()
    })

    test('registerCar is called with an existing plate.', () => {
      memoryStorage.getCars.mockReturnValue([existingCar])

      expect(() => carService.registerCar(existingCar)).toThrowError(
        DuplicateError
      )
      expect(memoryStorage.getCars).toHaveBeenCalled()
      expect(memoryStorage.setCars).toHaveBeenCalledTimes(1)
    })

    test('registerCar is called with invalid plate.', () => {
      const invalidPlateCar = {
        id: 'existingId',
        plate: 'ABC12345',
        color: 'Red',
        brand: 'Honda',
      }
      memoryStorage.getCars.mockReturnValue([])
      expect(() => carService.registerCar(invalidPlateCar)).toThrowError(
        BadRequest
      )
      expect(memoryStorage.getCars).toHaveBeenCalled()
      expect(memoryStorage.setCars).toHaveBeenCalledTimes(1)
    })
  })

  describe('updateCar', () => {
    beforeEach(() => {
      memoryStorage.getCars.mockReset()
      memoryStorage.setCars.mockReset()
    })

    test('updateCar updates an existing car with valid data', () => {
      const updatedCarData = {
        plate: 'XYZ5678',
        color: 'Blue',
        brand: 'Toyota',
      }
      memoryStorage.getCars.mockReturnValue([existingCar])

      const result = carService.updateCar(existingCar.id, updatedCarData)

      expect(result).toEqual({
        id: 'existingId',
        plate: 'XYZ5678',
        color: 'BLUE',
        brand: 'TOYOTA',
      })
      expect(memoryStorage.getCars).toHaveBeenCalled()
      expect(memoryStorage.setCars).toHaveBeenCalled()
    })

    test('updateCar throws NotFound error for a non-existent car', () => {
      const nonExistentCarId = 'nonExistentId'
      const updatedCarData = {
        plate: 'XYZ5678',
        color: 'Blue',
        brand: 'Toyota',
      }
      memoryStorage.getCars.mockReturnValue([])

      expect(() =>
        carService.updateCar(nonExistentCarId, updatedCarData)
      ).toThrowError(NotFound)
      expect(memoryStorage.getCars).toHaveBeenCalled()
      expect(memoryStorage.setCars).not.toHaveBeenCalled()
    })

    test('updateCar throws BadRequest error for invalid Brazilian plate format', () => {
      const updatedCarData = {
        plate: 'XYZ56789', // Invalid plate format
        color: 'Blue',
        brand: 'Toyota',
      }
      memoryStorage.getCars.mockReturnValue([existingCar])

      expect(() =>
        carService.updateCar(existingCar.id, updatedCarData)
      ).toThrowError(BadRequest)
      expect(memoryStorage.getCars).toHaveBeenCalled()
      expect(memoryStorage.setCars).not.toHaveBeenCalled()
    })

    test('updateCar throws DuplicateError for an existing plate with a different ID', () => {
      const anotherCarWithSamePlate = {
        id: 'anotherId',
        plate: 'ABC1234',
        color: 'Blue',
        brand: 'Toyota',
      }
      memoryStorage.getCars.mockReturnValue([
        existingCar,
        anotherCarWithSamePlate,
      ])

      expect(() =>
        carService.updateCar(existingCar.id, { plate: 'ABC1234' })
      ).toThrowError(DuplicateError)
      expect(memoryStorage.getCars).toHaveBeenCalled()
      expect(memoryStorage.setCars).not.toHaveBeenCalled()
    })
  })

  describe('deleteCar', () => {
    test('deleteCar is called with a valid id', () => {
      const sampleCarId = 'SOMEUUID'
      memoryStorage.getCars.mockReturnValue([{ id: sampleCarId }])
      const deleteCarId = sampleCarId
      carService.deleteCar(deleteCarId)
      expect(memoryStorage.getCars).toHaveBeenCalled()
      expect(memoryStorage.setCars).toHaveBeenCalledWith([])
    })

    test('deleteCar is called with an invalid id, throws NotFound', () => {
      const validCarId = 'SOMEUUID'
      memoryStorage.getCars.mockReturnValue([{ id: validCarId }])
      const invalidCarId = 'INVALID_ID'
      expect(() => carService.deleteCar(invalidCarId)).toThrowError(NotFound)
      expect(memoryStorage.getCars).toHaveBeenCalled()
    })
  })
})
