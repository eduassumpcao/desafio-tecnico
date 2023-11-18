class DuplicateError extends Error {
  constructor(message) {
    super(message)
    this.name = 'DuplicateError'
    this.code = 'DUPLICATE_ERROR'
    this.statusCode = 409
  }
}
module.exports = DuplicateError
