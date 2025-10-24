// backend/controller/testController.js
const express = require("express");
const router = express.Router();
const testService = require("../service/testService");


router.get("/greeting", async (req, res) => {
    const data = {
        message: '안녕하세요! Controller에서 온 데이터입니다.',
        status: 'OK',
        statusCode: '200',
        name:'test1'
    };
    const rslt = await testService.getTest(data);
    res.json(rslt);
});

router.get("/get-test", (req, res) => {
    const data = {
        message: '안녕하세요! Controller에서 온 데이터입니다.',
        status: 'OK',
        statusCode: '200',
        endpoint : '/api/greeting'
    };
    res.json(data);
});

router.get("/insert-test", (req, res) => {
    const data = {
        message: '안녕하세요! Controller에서 온 데이터입니다.',
        status: 'OK',
        statusCode: '200',
        endpoint : '/api/greeting'
    };
    res.json(data);
});


module.exports = router;