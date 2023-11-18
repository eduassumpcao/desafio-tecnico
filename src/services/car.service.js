const BadRequest = require('../errors/BadRequest');
const DuplicateError = require('../errors/DuplicateError');
const NotFound = require('../errors/NotFound');
const helper = require('../utils/helper.util');

let cars = [];

const getCars = () => cars;

const getCar = (plate) => {
  const upperCasePlate = plate.toUpperCase();
  const existingCar = cars.find((car) => car.plate === upperCasePlate);

  if (!existingCar) {
    throw new NotFound(`Car with plate '${upperCasePlate}' not found.`);
  }

  return existingCar;
};

const registerCar = (newCar) => {
  const { plate, color, brand } = newCar;

  if (!plate || !color || !brand) {
    throw new BadRequest(
      'Invalid request. Please provide a valid JSON object with properties: plate, color, brand.'
    );
  }

  const upperCasePlate = plate.toUpperCase();
  const upperCaseColor = color.toUpperCase();
  const upperCaseBrand = brand.toUpperCase();

  if (!helper.validateBrazilianPlate(upperCasePlate)) {
    throw new BadRequest(
      'Invalid Brazilian plate format. It should have three letters followed by four digits.'
    );
  }

  if (cars.some((car) => car.plate === upperCasePlate)) {
    throw new DuplicateError(`Car with plate '${upperCasePlate}' already exists.`);
  }

  const car = {
    plate: upperCasePlate,
    color: upperCaseColor,
    brand: upperCaseBrand,
  };

  cars.push(car);

  return car;
};

const updateCar = (originalPlate, newCarData) => {
  const { plate, color, brand } = newCarData;

  if (!plate || !color || !brand) {
    throw new BadRequest(
      'Invalid request. Please provide a valid JSON object with properties: plate, color, brand.'
    );
  }

  const originalPlateUpperCase = originalPlate.toUpperCase();
  const newPlateUpperCase = plate.toUpperCase();
  const newColorUpperCase = color.toUpperCase();
  const newBrandUpperCase = brand.toUpperCase();

  if (!helper.validateBrazilianPlate(newPlateUpperCase)) {
    throw new BadRequest(
      'Invalid Brazilian plate format. It should have three letters followed by four digits.'
    );
  }

  const existingCarIndex = cars.findIndex((car) => car.plate === originalPlateUpperCase);

  if (existingCarIndex === -1) {
    throw new NotFound(`Car with plate '${originalPlateUpperCase}' not found.`);
  }

  if (originalPlateUpperCase !== newPlateUpperCase && cars.some((car) => car.plate === newPlateUpperCase)) {
    throw new DuplicateError(`Car with plate '${newPlateUpperCase}' already exists.`);
  }

  const updatedCar = {
    plate: newPlateUpperCase,
    color: newColorUpperCase,
    brand: newBrandUpperCase,
  };

  cars[existingCarIndex] = updatedCar;

  return updatedCar;
};

module.exports = {
  registerCar,
  getCars,
  getCar,
  updateCar,
};
