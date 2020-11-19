const query = require("../handleDB/query.js");
module.exports = async (ctx, next) => {
    let data = await query(`SELECT nickName FROM user WHERE userId=${ctx.request.body.userId}`);
    ctx.body = data[0].nickName;
    next();
}