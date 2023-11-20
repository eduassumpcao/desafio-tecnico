const BadRequest = require('../../errors/BadRequest')
const DuplicateError = require('../../errors/DuplicateError')
const NotFound = require('../../errors/NotFound')
const driverService = require('../../services/driver.service')
const memoryStorage = require('../../storage/memoryStorage')
const uuid = require('uuid')

jest.mock('../../storage/memoryStorage')
jest.mock('uuid')

const sampleDriver = {
  id: 'SOMEUUID',
  name: 'Pedro',
}

const existingDriver = {
  id: 'existingId',
  name: 'Bino',
}

describe('driverService', () => {
  beforeEach(() => {
    memoryStorage.getDrivers.mockReset()
  })

  describe('getDrivers', () => {
    test('getDrivers returns all drivers from memoryStorage when no filters are provided', () => {
      memoryStorage.getDrivers.mockReturnValue([sampleDriver])

      const result = driverService.getDrivers()

      expect(result).toEqual([sampleDriver])
      expect(memoryStorage.getDrivers).toHaveBeenCalled()
    })

    test('getDrivers returns filtered drivers based on name', () => {
      const filters = { name: 'ped' }
      memoryStorage.getDrivers.mockReturnValue([sampleDriver])

      const result = driverService.getDrivers(filters)

      expect(result).toEqual([sampleDriver])
      expect(memoryStorage.getDrivers).toHaveBeenCalled()
    })
  })

  describe('getDriver', () => {
    test('getDriver returns the driver with the specified ID', () => {
      const driverId = 'SOMEUUID'
      memoryStorage.getDrivers.mockReturnValue([sampleDriver])

      const result = driverService.getDriver(driverId)

      expect(result).toEqual(sampleDriver)
      expect(memoryStorage.getDrivers).toHaveBeenCalled()
    })

    test('getDriver throws NotFound error when driver with the specified ID is not found', () => {
      const nonExistentDriverId = 'nonExistentId'
      memoryStorage.getDrivers.mockReturnValue([sampleDriver])

      expect(() => driverService.getDriver(nonExistentDriverId)).toThrowError(
        NotFound
      )
      expect(memoryStorage.getDrivers).toHaveBeenCalled()
    })
  })

  describe('registerDriver', () => {
    test('registerDriver is called with valid data.', () => {
      const { name } = sampleDriver
      memoryStorage.getDrivers.mockReturnValue([])
      uuid.v4.mockReturnValue('SOMEUUID')
      const result = driverService.registerDriver({ name })
      expect(result).toEqual(sampleDriver)
      expect(memoryStorage.getDrivers).toHaveBeenCalled()
      expect(memoryStorage.setDrivers).toHaveBeenCalled()
    })
  })

  describe('updateDriver', () => {
    beforeEach(() => {
      memoryStorage.getDrivers.mockReset()
      memoryStorage.setDrivers.mockReset()
    })

    test('updateDriver updates an existing driver with valid data', () => {
      const updatedDriverData = {
        name: 'Pedro',
      }
      memoryStorage.getDrivers.mockReturnValue([existingDriver])

      const result = driverService.updateDriver(
        existingDriver.id,
        updatedDriverData
      )

      expect(result).toEqual({
        id: 'existingId',
        name: 'Pedro',
      })
      expect(memoryStorage.getDrivers).toHaveBeenCalled()
      expect(memoryStorage.setDrivers).toHaveBeenCalled()
    })

    test('updateDriver throws NotFound error for a non-existent driver', () => {
      const nonExistentDriverId = 'nonExistentId'
      const updatedDriverData = {
        name: 'Alfredo',
      }
      memoryStorage.getDrivers.mockReturnValue([])

      expect(() =>
        driverService.updateDriver(nonExistentDriverId, updatedDriverData)
      ).toThrowError(NotFound)
      expect(memoryStorage.getDrivers).toHaveBeenCalled()
      expect(memoryStorage.setDrivers).not.toHaveBeenCalled()
    })
  })

  describe('deleteDriver', () => {
    test('deleteDriver is called with a valid id', () => {
      const sampleDriverId = 'SOMEUUID'
      memoryStorage.getDrivers.mockReturnValue([{ id: sampleDriverId }])
      const deleteDriverId = sampleDriverId
      driverService.deleteDriver(deleteDriverId)
      expect(memoryStorage.getDrivers).toHaveBeenCalled()
      expect(memoryStorage.setDrivers).toHaveBeenCalledWith([])
    })

    test('deleteDriver is called with an invalid id, throws NotFound', () => {
      const validDriverId = 'SOMEUUID'
      memoryStorage.getDrivers.mockReturnValue([{ id: validDriverId }])
      const invalidDriverId = 'INVALID_ID'
      expect(() => driverService.deleteDriver(invalidDriverId)).toThrowError(
        NotFound
      )
      expect(memoryStorage.getDrivers).toHaveBeenCalled()
    })
  })
})
