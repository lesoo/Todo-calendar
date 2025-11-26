const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// controllers 폴더 경로
const controllersPath = path.join(__dirname, "./controller");

// controllers 폴더 안의 모든 파일 불러오기
fs.readdirSync(controllersPath).forEach((file) => {
  if (file.endsWith(".js")) {
    const controller = require(path.join(controllersPath, file));
    router.use("/", controller);
  }
});

module.exports = router;