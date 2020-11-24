const query = require("../handleDB/query.js");
module.exports = async (ctx, next) => {
    console.log(ctx.request.body);
    let sql = `SELECT * FROM question WHERE questionType=\"${ctx.request.body.type}\" AND questionStar=\"${ctx.request.body.star}\"`;
    console.log(sql);
    let data = await query(sql);
    console.log("Query question seccessed.");
    ctx.body = data;
    next();
}