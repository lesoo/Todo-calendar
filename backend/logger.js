const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const express = require('express');

// ---------------------------
// 1. Logger 인스턴스 생성
// ---------------------------
const dailyRotateTransport = new transports.DailyRotateFile({
  filename: 'logs/%DATE%-app.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'info'
});

const loggerInstance = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.Console(),
    dailyRotateTransport
  ]
});

// ---------------------------
// 2. 요청/응답 로그 미들웨어
// ---------------------------
function requestLogger(req, res, next) {
  const start = Date.now();
//   console.log(res);

  res.on('finish', () => {
    const duration = Date.now() - start;
    loggerInstance.info('API 요청 로그', {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      reqBody: req.body,
      reqQuery: req.query,
      resBody: res.locals.responseData || null
    });
  });

  next();
}

// ---------------------------
// 3. 글로벌 에러 핸들러
// ---------------------------
function globalErrorHandler(err, req, res, next) {
  loggerInstance.error('서버 오류 발생', {
    url: req.originalUrl,
    method: req.method,
    stack: err.stack
  });

  res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    message: err.message || '서버 처리 중 오류 발생',
    data: {},
    error: err.stack,
    timestamp: new Date().toISOString()
  });
}

// ---------------------------
// 4. 글로벌 logger 노출
// ---------------------------
Object.defineProperty(globalThis, 'logger', {
  value: loggerInstance,
  writable: false,
  configurable: false,
  enumerable: true
});

// ---------------------------
// 5. 모듈 export
// ---------------------------
module.exports = {
  logger: loggerInstance,
  requestLogger,
  globalErrorHandler
};
