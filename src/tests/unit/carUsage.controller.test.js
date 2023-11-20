const carUsageController = require('../../controllers/carUsage.controller')
const carUsageService = require('../../services/carUsage.service')

jest.mock('../../services/carUsage.service')

describe('carUsageController', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getCarUsage calls carUsageService.getCarUsage with correct id and returns the result', () => {
    const req = { params: { id: 'RANDOMUUID' } }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    const expectedId = 'RANDOMUUID'
    const expectedCarUsage = {
      id: 'RANDOMUUID',
      carId: 'RANDOMCARID',
      driverId: 'RANDOMDRIVERID',
      reason: 'any reason',
      startTimestamp: '1700231147940',
      finishTimestamp: '1700231177956',
    }

    carUsageService.getCarUsage.mockReturnValue(expectedCarUsage)

    carUsageController.getCarUsage(req, res)

    expect(carUsageService.getCarUsage).toHaveBeenCalledWith(expectedId)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(expectedCarUsage)
  })

  test('startCarUsage calls carUsageService.startCarUsage with correct data and returns the result', () => {
    const req = {
      body: {
        carId: 'RANDOMCARID',
        driverId: 'RANDOMDRIVERID',
        reason: 'any reason',
        startTimestamp: '1700231147940',
      },
    }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    const expectedNewCarUsage = {
      carId: 'RANDOMCARID',
      driverId: 'RANDOMDRIVERID',
      reason: 'any reason',
      startTimestamp: '1700231147940',
    }
    const expectedStartedCarUsage = {
      id: 'RANDOMUUID',
      carId: 'RANDOMCARID',
      driverId: 'RANDOMDRIVERID',
      reason: 'any reason',
      startTimestamp: '1700231147940',
      finishTimestamp: null,
    }

    carUsageService.startCarUsage.mockReturnValue(expectedStartedCarUsage)

    carUsageController.startCarUsage(req, res)

    expect(carUsageService.startCarUsage).toHaveBeenCalledWith(
      expectedNewCarUsage
    )
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Car usage successfully started',
      carUsage: expectedStartedCarUsage,
    })
  })

  test('finishCarUsage calls carUsageService.finishCarUsage with correct data and returns the result', () => {
    const req = {
      params: { id: 'RANDOMUUID' },
      body: { finishTimestamp: '1700231147550' },
    }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    const expectedID = 'RANDOMUUID'
    const expectedNewCarUsageData = {
      finishTimestamp: '1700231147550',
    }
    const expectedUpdatedCarUsage = {
      id: 'RANDOMUUID',
      carId: 'RANDOMCARID',
      driverId: 'RANDOMDRIVERID',
      reason: 'any reason',
      startTimestamp: '1700231147940',
      finishTimestamp: '1700231147550',
    }

    carUsageService.finishCarUsage.mockReturnValue(expectedUpdatedCarUsage)

    carUsageController.finishCarUsage(req, res)

    expect(carUsageService.finishCarUsage).toHaveBeenCalledWith(
      expectedID,
      expectedNewCarUsageData
    )
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Car usage successfully finished',
      carUsage: expectedUpdatedCarUsage,
    })
  })
})
