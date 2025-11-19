const { loadMapper } = require("../db/mybatis");
const dotenv = require("dotenv");
dotenv.config();
process.env.DB_HOST

// 모든 사용자 조회
async function getTest(data) {
  data.encKey = process.env.ENC_KEY;
  return await loadMapper("userMapper", "login", data);
}

async function createTest(name, email) {
  return await loadMapper("testMapper", "insertTest", [name, email]);
}

module.exports = { getTest, createTest };