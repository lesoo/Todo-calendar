const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const pool = require("./connection");

async function loadMapper(mapperName, queryId, params = {}) {
    const xmlPath = path.join(__dirname, `../mapper/${mapperName}.xml`);
    const xmlData = fs.readFileSync(xmlPath, "utf-8");
    const parser = new xml2js.Parser();
    const parsed = await parser.parseStringPromise(xmlData);

    const queryNode =
        parsed.mapper.select?.find((q) => q.$.id === queryId) ||
        parsed.mapper.insert?.find((q) => q.$.id === queryId) ||
        parsed.mapper.update?.find((q) => q.$.id === queryId) ||
        parsed.mapper.delete?.find((q) => q.$.id === queryId);

    if (!queryNode) throw new Error(`쿼리 ID ${queryId}를 찾을 수 없습니다.`);

    let query = queryNode._.trim();

    // 🔥 MyBatis 스타일 #{param} 지원
    const values = [];
    console.log(query);
    query = query.replace(/#\{(\w+)\}/g, (_, key) => {
        if (!(key in params)) throw new Error(`파라미터 ${key} 누락`);
        values.push(params[key]);
        return "?";

    });
    console.log(params);
    console.log(values);
    const conn = await pool.getConnection();
    const [rows] = await conn.query(query, values);
    conn.release();
    console.log(rows)
    return rows;
}

module.exports = { loadMapper };
