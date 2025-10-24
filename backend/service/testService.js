const { loadMapper } = require("../db/mybatis");

// 모든 사용자 조회
async function getTest(data) {
  return await loadMapper("testMapper", "getTest", data);
}

async function createTest(name, email) {
  return await loadMapper("testMapper", "insertTest", [name, email]);
}

module.exports = { getTest, createTest };