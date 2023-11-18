class BadRequest extends Error {
  constructor(message) {
    super(message)
    this.name = 'BadRequest'
    this.code = 'BAD_REQUEST'
    this.statusCode = 400
  }
}

module.exports = BadRequest
