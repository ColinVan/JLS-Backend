const query = require("../handleDB/query.js");
module.exports = async (ctx, next) => {
    let sql = `SELECT articleId, articleImg, articleType, articleTitle,
                articleReadNum, articleCommentNum, articleIntroduction
                articleDate, articleAuthor
                FROM article`;
    let data = await query(sql);
    ctx.body = data;
    next();
}