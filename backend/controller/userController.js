// backend/controller/userController.js
const express = require("express");
const router = express.Router();
const userService = require("../service/userService");
const commonService = require("../service/commonService");
const jwt = require('jsonwebtoken');

router.post("/auth/login", async (req, res) => {
    const data = req.body;
    if (!data.email || !data.password) {
        return res.status(400).json({
            success: false,
            message: '아이디와 비밀번호를 모두 입력해주세요',
            data: {}
        });
    }

    const rslt = await userService.login(data);
    if(rslt.length != 1){
        return res.status(401).json({
            success: false,
            message: '아이디 또는 비밀번호가 올바르지 않습니다',
            data: {}
        });
    }

    const user = rslt[0];
    const payload = { userId: user.EMAIL };

    const token = {
        accessToken : commonService.createAccessToken(payload),
        refreshToken : commonService.createRefreshToken(payload)
    };

    const tokenString = JSON.stringify(token);

    res.cookie('token', tokenString, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // HTTPS에서만 전송 (운영 환경)
        maxAge: 3600000,
        sameSite: 'lax', // CSRF 공격 방어를 위해 설정 (Next.js 환경에서 중요)
    });

    // 4. 프론트엔드 전역 상태 업데이트를 위해 사용자 정보만 응답 본문에 보냄
    res.status(200).json({
        success: true,
        message: '로그인 성공',
        user: { id: user.EMAIL, name: user.USER_NAME }
    });

});

router.get("/auth/verify", async (req, res) => {

    const tokenCookie = req.cookies.token;
    if (!tokenCookie) {
        return res.status(401).json({ message: '인증 토큰 쿠키가 없습니다.' });
    }

    const accessToken = tokenCookie.accessToken;
    if(!accessToken){
        return res.status(401).json({ message: '인증 토큰이 없습니다.' })
    }

    const rslt = commonService.verifyToken(accessToken);

    if(rslt.success){
        req.user = userPayload;
        next();
    }else{
        return res.status(401).json({ message: '토큰이 유효하지 않거나 만료되었습니다.' });
    }


});


module.exports = router;