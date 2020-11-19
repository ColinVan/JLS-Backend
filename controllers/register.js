const insert = require("../handleDB/insert.js");
const query = require("../handleDB/query.js");
module.exports = async (ctx, next) => {
    console.log(ctx.request.body);
    let requestData = ctx.request.body;
    /**
     * 此时应先检查数据库user表中有没有和requestData.username重名的用户
     * 如果结果为空数组, 则向下走代码
     * 否则, 回复注册失败
     */
    let data = await query("SELECT username FROM user WHERE username=\'" + requestData.username + "\'");
    if(data.length == 0){
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
        let userID = date + hour + minu + sec;
        let sql = 
            "INSERT INTO user VALUES (\'"
            + userID + "\', \'"
            + requestData.username + "\', \'"
            + requestData.nickname + "\', \'"
            + requestData.password + "\', \'"
            + requestData.assertpassword + "\')";
        console.log(sql);
        let result = await insert(sql);
        console.log(result);

        ctx.body = {
            message: "OK"
        };
    }else{
        ctx.body = {
            message: "Duplicate name"
        };
    }
    next();
}