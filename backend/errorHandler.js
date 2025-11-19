// errorHandler.js
function globalErrorHandler(err, req, res, next) {
  console.error(err); // 서버 로그용

  const statusCode = err.statusCode || 500;
  const message = err.message || '서버 처리 중 오류 발생';

  res.status(statusCode).json({
    statusCode,
    message,
    data: {},
    error: err.stack || null,
    timestamp: new Date().toISOString()
  });
}

module.exports = globalErrorHandler;
