// backend/server.js
const dotenv = require("dotenv");
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./router')
dotenv.config();
const port = process.env.SERVER_PORT;
const cookieParser = require('cookie-parser');
require('./logger');

const { requestLogger, globalErrorHandler } = require('./logger');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);


app.use('/api', router); // 👈 첫 번째 경로: /api

app.use(globalErrorHandler);
app.use((err, req, res, next) => {
    logger.error('Error: %s, URL: %s', err.stack, req.originalUrl);
    res.status(500).json({ message: '서버 오류', error: err.message });
});

// 🚀 서버 시작
app.listen(port, () => {
    console.log(`✅ Express 서버가 http://localhost:${port} 에서 실행 중입니다.`);
    logger.info('서버 시작');
});