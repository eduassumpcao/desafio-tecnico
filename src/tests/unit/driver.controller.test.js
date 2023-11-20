const driverController = require('../../controllers/driver.controller')
const driverService = require('../../services/driver.service')

jest.mock('../../services/driver.service')

describe('driverController', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getDrivers calls driverService.getDrivers with correct filters and returns the result', () => {
    const req = { query: { name: 'alf' } }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    const expectedFilters = { name: 'alf' }
    const expectedDrivers = [{ name: 'Alfredo' }]

    driverService.getDrivers.mockReturnValue(expectedDrivers)

    driverController.getDrivers(req, res)

    expect(driverService.getDrivers).toHaveBeenCalledWith(expectedFilters)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(expectedDrivers)
  })

  test('getDriver calls driverService.getDriver with correct id and returns the result', () => {
    const req = { params: { id: 'RANDOMUUID' } }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    const expectedId = 'RANDOMUUID'
    const expectedDriver = {
      id: 'RANDOMUUID',
      name: 'Alfredo',
    }

    driverService.getDriver.mockReturnValue(expectedDriver)

    driverController.getDriver(req, res)

    expect(driverService.getDriver).toHaveBeenCalledWith(expectedId)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(expectedDriver)
  })

  test('registerDriver calls driverService.registerDriver with correct data and returns the result', () => {
    const req = { body: { name: 'Alfredo' } }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    const expectedNewDriver = { name: 'Alfredo' }
    const expectedRegisteredDriver = {
      id: 'RANDOMUUID',
      name: 'Alfredo',
    }

    driverService.registerDriver.mockReturnValue(expectedRegisteredDriver)

    driverController.registerDriver(req, res)

    expect(driverService.registerDriver).toHaveBeenCalledWith(expectedNewDriver)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Driver successfully registered',
      driver: expectedRegisteredDriver,
    })
  })

  test('updateDriver calls driverService.updateDriver with correct data and returns the result', () => {
    const req = {
      params: { id: 'RANDOMUUID' },
      body: { name: 'Pedro' },
    }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    const expectedID = 'RANDOMUUID'
    const expectedNewDriverData = {
      name: 'Pedro',
    }
    const expectedUpdatedDriver = {
      id: 'RANDOMUUID',
      name: 'Pedro',
    }

    driverService.updateDriver.mockReturnValue(expectedUpdatedDriver)

    driverController.updateDriver(req, res)

    expect(driverService.updateDriver).toHaveBeenCalledWith(
      expectedID,
      expectedNewDriverData
    )
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Driver successfully updated',
      driver: expectedUpdatedDriver,
    })
  })

  describe('deleteDriver', () => {
    test('deleteDriver calls driverService.deleteDriver with correct id', () => {
      const req = { params: { id: 'RANDOMUUID' } }
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

      const expectedId = 'RANDOMUUID'

      driverService.deleteDriver.mockReturnValue()

      driverController.deleteDriver(req, res)

      expect(driverService.deleteDriver).toHaveBeenCalledWith(expectedId)
      expect(res.status).toHaveBeenCalledWith(204)
    })
  })
})
