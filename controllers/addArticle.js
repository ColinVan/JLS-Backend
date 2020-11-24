const query = require("../handleDB/query.js");
const insert = require("../handleDB/insert.js");

const { verify } = require("jsonwebtoken");
const config = require("../configs/secret.js");
module.exports = async (ctx, next) => {
    console.log(ctx.request.body);
    console.log(ctx.request.get("Authorization"));
    const decoded = verify(ctx.request.get("Authorization"), config.secret);
    console.log(decoded);
    let sql1 = `SELECT userId FROM user WHERE userName=\"${decoded.user}\"`;
    console.log(sql1);
    let userId = await query(sql1);
    console.log("userId is:");
    console.log(userId[0].userId);
    // 确定articleId
    const now = new Date();
    let date = now.getDate();
    let hour = now.getHours();
    let minu = now.getMinutes();
    let sec = now.getSeconds();
    if(date < 10){
        date = "0" + date;
    }else{
        date = date.toString();
    }
    if(hour < 10){
        hour = "0" + hour;
    }else{
        hour = hour.toString();
    }
    if(minu < 10){
        minu = "0" + minu;
    }else{
        minu = minu.toString();
    }
    if(sec < 10){
        sec = "0" + sec;
    }else{
        sec = sec.toString();
    }
    let articleId = date + hour + minu + sec;
    let sql2 = `INSERT INTO article VALUES (
                \'${articleId}\', \'${ctx.request.body.content}\', 
                \'${ctx.request.body.title}\', \'${userId[0].userId}\',
                NOW(),
                \'${ctx.request.body.introduction}\', null, 0, \'${ctx.request.body.type}\', 0
        )`;
    let result = await insert(sql2);
    ctx.response.status = 200;
    ctx.body = 'OK';
    next();
}