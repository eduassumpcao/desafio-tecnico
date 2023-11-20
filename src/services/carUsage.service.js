const uuid = require('uuid')
const BadRequest = require('../errors/BadRequest')
const NotFound = require('../errors/NotFound')
const memoryStorage = require('../storage/memoryStorage')
const helper = require('../utils/helper.util')
const DuplicateError = require('../errors/DuplicateError')


const getCarUsages = () => {
  const carUsages = memoryStorage.getCarUsage();


  const formattedCarUsages = carUsages.map((carUsage) => {
    const { carId, driverId, startTimestamp, finishTimestamp } = carUsage;

    const car = memoryStorage.getCars().find((car) => car.id === carId);
    const driver = memoryStorage.getDrivers().find((driver) => driver.id === driverId);


    return {
      id: carUsage.id,
      car: {
        id: car.id,
        brand: car.brand,
        model: car.model,

      },
      driver: {
        id: driver.id,
        name: driver.name,
      },
      startTimestamp: startTimestamp,
      finishTimestamp: finishTimestamp,
    };
  });

  return formattedCarUsages;
};


const getCarUsage = (id) => {
  const carUsages = memoryStorage.getCarUsage();
  const existingCarUsage = carUsages.find((carUsage) => carUsage.id === id);

  if (!existingCarUsage) {
    throw new NotFound(`Car usage with id '${id}' not found.`);
  }

  const car = memoryStorage.getCars().find((car) => car.id === existingCarUsage.carId);
  const driver = memoryStorage.getDrivers().find((driver) => driver.id === existingCarUsage.driverId);

  const response = {
    id: existingCarUsage.id,
    car,
    driver,
    reason: existingCarUsage.reason,
    startTimestamp: existingCarUsage.startTimestamp,
    finishTimestamp: existingCarUsage.finishTimestamp,
  };

  return response;
};


const startCarUsage = (newCarUsage) => {
  const { driverId, carId, startTimestamp, reason } = newCarUsage

  if (!driverId || !carId || !startTimestamp || !reason) {
    throw new BadRequest(
      'Invalid request. Please provide a valid JSON object with properties: driverId, carId, startTimestamp, reason.'
    )
  }

  const existingCar = memoryStorage.getCars().find((car) => car.id === carId)
  const existingDriver = memoryStorage.getDrivers().find((driver) => driver.id === driverId)

  if (!existingCar) {
    throw new NotFound(`Car with id '${carId}' not found.`)
  }

  if (!existingDriver) {
    throw new NotFound(`Driver with id '${driverId}' not found.`)
  }

  const isBeingUsed = memoryStorage.getCarUsage().some(
    (usage) => driverId === usage.driverId && !usage.finishTimestamp
  )

  if (isBeingUsed) {
    throw new DuplicateError('The requested car is already being used.')
  }

  if (!helper.validateTimestamp(startTimestamp)) {
    throw new BadRequest('Invalid Timestamp.')
  }

  const carUsage = {
    id: uuid.v4(),
    carId: carId,
    driverId: driverId,
    reason: reason,
    startTimestamp: startTimestamp,
    finishTimestamp: null,
  }

  const carUsages = memoryStorage.getCarUsage()
  memoryStorage.setCarUsage([carUsage, ...carUsages])

  return carUsage
}


const finishCarUsage = (id, bodyData) => {
  const carUsages = memoryStorage.getCarUsage();
  const { endDate } = bodyData;

  if (!endDate) {
    throw new BadRequest('Missing endDate in the request body.');
  }

  const existingCarUsageIndex = carUsages.findIndex(
    (carUsage) => carUsage.id === id
  );

  if (existingCarUsageIndex === -1) {
    throw new NotFound(`Car Usage with id '${id}' not found.`);
  }

  if (!helper.validateTimestamp(endDate)) {
    throw new BadRequest('Invalid Timestamp.');
  }

  const existingCarUsage = carUsages[existingCarUsageIndex];

  const updatedCarUsage = {
    ...existingCarUsage,
    finishTimestamp: endDate,
  };

  carUsages[existingCarUsageIndex] = updatedCarUsage;
  memoryStorage.setCarUsage([...carUsages]);

  return updatedCarUsage;
};

module.exports = {
  getCarUsage,
  startCarUsage,
  finishCarUsage,
  getCarUsages
}
