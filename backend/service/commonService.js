const { loadMapper } = require("../db/mybatis");

// 모든 사용자 조회
async function responseMiddleware(req, res, next) {
    // 성공 응답
    res.sendData = (data, message = '성공') => {
        res.json({
        success: true,
        message,
        data,
        error: null,
        timestamp: new Date().toISOString()
        });
    };

    // 실패 응답
    res.sendError = (error, message = '실패', statusCode = 500) => {
        res.status(statusCode).json({
        success: false,
        message,
        data: null,
        error: error?.message || error || '알 수 없는 에러',
        timestamp: new Date().toISOString()
        });
    };

    next();
}


module.exports = { responseMiddleware };