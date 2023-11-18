class NotFound extends Error {
  constructor(message) {
    super(message)
    this.name = 'NotFound'
    this.code = 'NOT_FOUND'
    this.statusCode = 404
  }
}
module.exports = NotFound
