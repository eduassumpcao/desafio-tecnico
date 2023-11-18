const carService = require('../services/car.service');

const registerCar = (req, res) => {
  try {
    const newCar = req.body;
    const registeredCar = carService.registerCar(newCar);
    res.status(201).json(registeredCar);
    } catch (error) {
    res.status(error?.statusCode || 400).json({ error: error.message });
  }
};

module.exports = { registerCar };