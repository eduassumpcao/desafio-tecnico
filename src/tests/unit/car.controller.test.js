const carController = require('../../controllers/car.controller')
const carService = require('../../services/car.service')

jest.mock('../../services/car.service')

describe('carController', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getCars calls carService.getCars with correct filters and returns the result', () => {
    const req = { query: { brand: 'TOYOTA', color: 'BLUE' } }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    const expectedFilters = { brand: 'TOYOTA', color: 'BLUE' }
    const expectedCars = [{ plate: 'ABC1234', brand: 'TOYOTA', color: 'BLUE' }]

    carService.getCars.mockReturnValue(expectedCars)

    carController.getCars(req, res)

    expect(carService.getCars).toHaveBeenCalledWith(expectedFilters)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(expectedCars)
  })

  test('getCar calls carService.getCar with correct id and returns the result', () => {
    const req = { params: { id: 'RANDOMUUID' } }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    const expectedId = 'RANDOMUUID'
    const expectedCar = {
      id: 'RANDOMUUID',
      plate: 'ABC1234',
      brand: 'TOYOTA',
      color: 'BLUE',
    }

    carService.getCar.mockReturnValue(expectedCar)

    carController.getCar(req, res)

    expect(carService.getCar).toHaveBeenCalledWith(expectedId)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(expectedCar)
  })

  test('registerCar calls carService.registerCar with correct data and returns the result', () => {
    const req = { body: { plate: 'XYZ5678', brand: 'HONDA', color: 'RED' } }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    const expectedNewCar = { plate: 'XYZ5678', brand: 'HONDA', color: 'RED' }
    const expectedRegisteredCar = {
      id: 'RANDOMUUID',
      plate: 'XYZ5678',
      brand: 'HONDA',
      color: 'RED',
    }

    carService.registerCar.mockReturnValue(expectedRegisteredCar)

    carController.registerCar(req, res)

    expect(carService.registerCar).toHaveBeenCalledWith(expectedNewCar)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Car successfully registered',
      car: expectedRegisteredCar,
    })
  })

  test('updateCar calls carService.updateCar with correct data and returns the result', () => {
    const req = {
      params: { id: 'RANDOMUUID' },
      body: { plate: 'XYZ5678', brand: 'Honda', color: 'Green' },
    }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    const expectedID = 'RANDOMUUID'
    const expectedNewCarData = {
      plate: 'XYZ5678',
      brand: 'Honda',
      color: 'Green',
    }
    const expectedUpdatedCar = {
      id: 'RANDOMUUID',
      plate: 'XYZ5678',
      brand: 'Honda',
      color: 'Green',
    }

    carService.updateCar.mockReturnValue(expectedUpdatedCar)

    carController.updateCar(req, res)

    expect(carService.updateCar).toHaveBeenCalledWith(
      expectedID,
      expectedNewCarData
    )
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Car successfully updated',
      car: expectedUpdatedCar,
    })
  })
})
