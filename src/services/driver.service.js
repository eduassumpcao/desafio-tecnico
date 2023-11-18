const uuid = require('uuid')

let drivers = []

const registerDriver = (newDriver) => {
  const { name } = newDriver

  if (!name) {
    throw new BadRequest(
      'Invalid request. Please provide a valid JSON object with properties: name.'
    )
  }

  const driver = {
    id: uuid.v4(),
    name: name,
  }

  drivers.push(driver)

  return driver
}

module.exports = {
  registerDriver,
}
