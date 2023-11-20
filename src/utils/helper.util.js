const brazilianPlateRegex = /^[A-Za-z]{3}\d{4}$/

const validateBrazilianPlate = (plateToValidate) => {
  return brazilianPlateRegex.test(plateToValidate)
}

const validateTimestamp = (timestamp) => {
  if (typeof timestamp !== 'string' || !/^\d+$/.test(timestamp)) return false

  timestamp = parseInt(timestamp, 10)
  const now = Date.now()
  const limit = now - 100 * 365 * 24 * 60 * 60 * 1000

  if (timestamp < limit || timestamp > now) {
    return false
  }

  return true
}

module.exports = {
  validateBrazilianPlate,
  validateTimestamp,
}
