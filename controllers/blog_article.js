const query = require("../handleDB/query.js");
module.exports = async (ctx, next) => {
    let articleId = parseInt(ctx.params.id);
    console.log("articleId is: " + articleId);
    let sql = `SELECT * FROM article WHERE articleId=${articleId}`;
    let data = await query(sql);
    ctx.body = data[0];
    next();
}