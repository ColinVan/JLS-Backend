const query = require("../handleDB/query.js");
module.exports = async (ctx, next) => {
    let sql = `SELECT * FROM article`;
    let data = await query(sql);
    ctx.body = data;
    next();
}