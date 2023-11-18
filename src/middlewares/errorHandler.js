const errorHandler = (error, req, res, next) => {
  const statusCode = error?.statusCode || 500
  const errorCode = error?.code || 'INTERNAL_SERVER_ERROR'
  const errorMessage = error?.message || 'Internal Server Error'

  const errorDetails =
    process.env.NODE_ENV === 'production' ? {} : { stack: error.stack }

  const errorResponse = {
    code: errorCode,
    message: errorMessage,
    ...errorDetails,
    timestamp: new Date().toISOString(),
  }

  res.status(statusCode).json({ error: errorResponse })
}

module.exports = errorHandler
