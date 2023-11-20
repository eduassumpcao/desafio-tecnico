const BadRequest = require('../../errors/BadRequest')
const NotFound = require('../../errors/NotFound')
const carUsageService = require('../../services/carUsage.service')
const memoryStorage = require('../../storage/memoryStorage')
const uuid = require('uuid')

jest.mock('../../storage/memoryStorage')
jest.mock('uuid')

const sampleCarUsage = {
  id: 'SOMEUUID',
  carId: 'RANDOMCARID',
  driverId: 'RANDOMDRIVERID',
  reason: 'any reason',
  startTimestamp: '1700231147940',
  finishTimestamp: '1700231177956',
}

const sampleStartCarUsage = {
  id: 'SOMEUUID',
  carId: 'RANDOMCARID',
  driverId: 'RANDOMDRIVERID',
  reason: 'any reason',
  startTimestamp: '1700231147940',
  finishTimestamp: null,
}

const sampleGetCarUsageResponse = {
  id: 'SOMEUUID',
  car: {
    id: 'SOMEUUID',
    plate: 'ABC1222',
    color: 'RED',
    brand: 'FIATA',
  },
  driver: {
    id: 'SOMEUUID',
    name: 'Robert',
  },
  reason: 'reason',
  startTimestamp: '1700231147940',
  endDate: null,
}

describe('carUsageService', () => {
  beforeEach(() => {
    memoryStorage.getCarUsage.mockReset()
    memoryStorage.setCarUsage.mockReset()
  })

  describe('getCarUsage', () => {
    beforeEach(() => {
      memoryStorage.getCarUsage.mockReset()
    })

    test('getCarUsage throws NotFound error when car usage with the specified ID is not found', () => {
      const nonExistentCarUsageId = 'nonExistentId'
      memoryStorage.getCarUsage.mockReturnValue([sampleCarUsage])

      expect(() =>
        carUsageService.getCarUsage(nonExistentCarUsageId)
      ).toThrowError(NotFound)
      expect(memoryStorage.getCarUsage).toHaveBeenCalled()
    })
  })

  describe('startCarUsage', () => {
    test('startCarUsage is called with valid data.', () => {
      const { carId, driverId, reason, startTimestamp } = sampleStartCarUsage
      memoryStorage.getCarUsage.mockReturnValue([])
      memoryStorage.getCars.mockReturnValue([{ id: 'RANDOMCARID' }])
      memoryStorage.getDrivers.mockReturnValue([{ id: 'RANDOMDRIVERID' }])
      uuid.v4.mockReturnValue('SOMEUUID')

      const newCarUsage = {
        carId: carId,
        driverId: driverId,
        reason: reason,
        startTimestamp: startTimestamp,
      }

      const result = carUsageService.startCarUsage(newCarUsage)
      expect(result).toEqual(sampleStartCarUsage)
      expect(memoryStorage.getCars).toHaveBeenCalled()
      expect(memoryStorage.getDrivers).toHaveBeenCalled()
      expect(memoryStorage.getCarUsage).toHaveBeenCalled()
      expect(memoryStorage.setCarUsage).toHaveBeenCalled()
    })

    test('startCarUsage throws BadRequest error for invalid timestamp', () => {
      const { carId, driverId, reason } = sampleStartCarUsage

      memoryStorage.getCarUsage.mockReturnValue([])
      memoryStorage.getCars.mockReturnValue([{ id: 'RANDOMCARID' }])
      memoryStorage.getDrivers.mockReturnValue([{ id: 'RANDOMDRIVERID' }])
      uuid.v4.mockReturnValue('SOMEUUID')

      const carUsage = {
        carId: carId,
        driverId: driverId,
        reason: reason,
        startTimestamp: 'aa123123123',
      }

      expect(() => carUsageService.startCarUsage(carUsage)).toThrowError(
        BadRequest
      )
      expect(memoryStorage.getCars).toHaveBeenCalled()
      expect(memoryStorage.getCarUsage).toHaveBeenCalled()
      expect(memoryStorage.setCarUsage).not.toHaveBeenCalled()
      expect(memoryStorage.getDrivers).toHaveBeenCalled()
    })
  })

  describe('finishCarUsage', () => {
    beforeEach(() => {
      memoryStorage.getCarUsage.mockReset()
      memoryStorage.setCarUsage.mockReset()
    })

    test('finishCarUsage update an existing car usage with valid data', () => {
      const updatedCarUsageData = {
        endDate: '1700231147550',
      }
      memoryStorage.getCarUsage.mockReturnValue([sampleStartCarUsage])

      const result = carUsageService.finishCarUsage(
        sampleStartCarUsage.id,
        updatedCarUsageData
      )
      const expectedResult = { ...sampleStartCarUsage }
      expectedResult.finishTimestamp = '1700231147550'

      expect(result).toEqual(expectedResult)
      expect(memoryStorage.getCarUsage).toHaveBeenCalled()
      expect(memoryStorage.setCarUsage).toHaveBeenCalled()
    })

    test('finishCarUsage throws NotFound error for a non-existent car usage', () => {
      const updatedCarUsageData = { endDate: '1700231147550' }

      const nonExistentCarUsageId = 'nonExistentId'

      memoryStorage.getCarUsage.mockReturnValue([])

      expect(() =>
        carUsageService.finishCarUsage(
          nonExistentCarUsageId,
          updatedCarUsageData
        )
      ).toThrowError(NotFound)
      expect(memoryStorage.getCarUsage).toHaveBeenCalled()
      expect(memoryStorage.setCarUsage).not.toHaveBeenCalled()
    })

    test('finishCarUsage throws BadRequest error for invalid timestamp', () => {
      const updatedCarUsageData = {
        endDate: '12323invalid12323',
      }
      memoryStorage.getCarUsage.mockReturnValue([sampleStartCarUsage])

      expect(() =>
        carUsageService.finishCarUsage(
          sampleStartCarUsage.id,
          updatedCarUsageData
        )
      ).toThrowError(BadRequest)
      expect(memoryStorage.getCarUsage).toHaveBeenCalled()
      expect(memoryStorage.setCarUsage).not.toHaveBeenCalled()
    })
  })
})
