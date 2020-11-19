const query = require("../handleDB/query.js");
module.exports = async (ctx, next) => {
    let articleId = ctx.request.body.articleId;
    let sql = `SELECT * FROM comment WHERE commentArticleId=${articleId}`;
    let data = await query(sql);
    ctx.body = data;
    next();
}