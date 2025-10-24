// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;
const router = require('./router')

// 🌐 CORS 설정: 모든 출처 허용
app.use(cors());
// 📝 JSON 형식의 요청 본문을 파싱하기 위한 미들웨어
app.use(express.json());


app.use('/api', router); // 👈 첫 번째 경로: /api

// // 📝 테스트용 API 엔드포인트
// app.get('/api/greeting', (req, res) => {
//   const data = {
//     message: '안녕하세요! Express 서버 (Node.js)에서 온 데이터입니다.',
//     status: 'OK',
//     serverPort: port,
//   };
//   res.json(data);
// });

// 🚀 서버 시작
app.listen(port, () => {
  console.log(`✅ Express 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});