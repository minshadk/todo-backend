const ErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500
  const message = err.message || 'Something went wrong'
  const stack = process.env.NODE_ENV === 'development' ? err.stack : undefined

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    stack,
  })
}

module.exports = ErrorHandler
