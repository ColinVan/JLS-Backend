const query = require("../handleDB/query.js");
module.exports = async (ctx, next) => {
    let sql = `SELECT chapterName, chapterId, chapterIntroduction, chapterImg
                FROM chapter
                WHERE chaptertype = \"Java基础\"
                `;
    let data = await query(sql);
    ctx.body = data;
    next();
}