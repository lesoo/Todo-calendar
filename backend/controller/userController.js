// backend/controller/userController.js
const express = require("express");
const router = express.Router();
const userService = require("../service/userService");
const commonService = require("../service/commonService");

router.post("/auth/login", async (req, res) => {
    const data = req.body;
    if (!data.email || !data.password) {
        return res.status(400).json({
            success: false,
            message: '아이디와 비밀번호를 모두 입력해주세요',
            data: {}
        });
    }

    const rslt = await userService.getTest(data);

    if(rslt.length != 1){
        return res.status(401).json({
            success: false, // 실패
            message: '아이디 또는 비밀번호가 올바르지 않습니다',
            data: {}
        });
    }
    res.status(200).json({
        success: true, // 실패
        message: '로그인 성공! 환영티비',
        data: {}
    });
});




module.exports = router;