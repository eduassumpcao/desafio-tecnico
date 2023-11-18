const brazilianPlateRegex = /^[A-Za-z]{3}\d{4}$/

const validateBrazilianPlate = (plateToValidate) => {
  return brazilianPlateRegex.test(plateToValidate)
}

module.exports = {
  validateBrazilianPlate,
}
