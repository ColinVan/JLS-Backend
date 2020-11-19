const query = require("../handleDB/query.js");
const insert = require("../handleDB/insert.js");
module.exports = async (ctx, next) => {
    console.log(ctx.request.body);
    // 通过token获取添加评论者的Id
    let sql1 = `SELECT userId
                FROM user
                WHERE password=\"${ctx.request.body.token}\"`;
    let userId = await query(sql1);
    console.log("userId is:");
    console.log(userId[0].userId);
    // 确定commentId
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
    let commentId = date + hour + minu + sec;
    let sql2 = `INSERT INTO comment VALUES (
                \'${commentId}\', \'${ctx.request.body.content}\', \'${userId[0].userId}\', 
                NOW(), \'${ctx.request.body.articleid}\'
    )`;
    console.log(sql2);
    let result = await insert(sql2);
    ctx.response.status = 200;
    ctx.body = 'OK';
    next();
}