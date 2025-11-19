// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;
const router = require('./router')
require('./logger');
const { requestLogger, globalErrorHandler } = require('./logger');


// 🌐 CORS 설정: 모든 출처 허용
app.use(cors());
// 📝 JSON 형식의 요청 본문을 파싱하기 위한 미들웨어
app.use(express.json());
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