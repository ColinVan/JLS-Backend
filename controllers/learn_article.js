const query = require("../handleDB/query.js");
module.exports = async (ctx, next) => {
    let chapterId = parseInt(ctx.request.url.slice(ctx.request.url.lastIndexOf("/") + 1, ctx.request.url.length));
    console.log("chapterId is: " + chapterId);
    let sql = `SELECT chapterName, chapterId, chapterContent, chapterImg, chapterReadNum, chaptertype
                FROM chapter
                WHERE chapterId=\"${chapterId}\"`;
    let data = await query(sql);
    ctx.body = data[0];
    next();
}
