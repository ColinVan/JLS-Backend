const query = require("../handleDB/query.js");
const insert = require("../handleDB/insert.js");
module.exports = async (ctx, next) => {
    console.log(ctx.request.body);/*{ token: '202cb962ac59075b964b07152d234b70', chapterId: 1 }*/
    let sql1 = `SELECT userId
                FROM user
                WHERE password=\"${ctx.request.body.token}\"`;
    let userId = await query(sql1);//[{userId:20}]
    if(ctx.params.action === 'query'){
        let sql2 = `SELECT chapterid
                    FROM haslearn
                    WHERE userid=${userId[0].userId}`;
        let data = await query(sql2);//data:[{chapterid:1},{chapterid:3},{chapterid:2},{chapterid:4}]
        let result = data.find( (item) => {
            return item.chapterid === ctx.request.body.chapterId;
        });//result:{chapterid: 1}
        if(result){
            ctx.body = true;
        }else{
            ctx.body = false;
        }
    }else if(ctx.params.action === 'add'){
        console.log("ctx.params.action is:" + ctx.params.action);
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
        let haslearnId = date + hour + minu + sec;
        let sql3 = `INSERT INTO haslearn VALUES (
                    \'${haslearnId}\', ${userId[0].userId}, ${ctx.request.body.chapterId})`;
        console.log(sql3);
        let result = await insert(sql3);
        ctx.response.status = 200;
        ctx.body = "OK";
    }else{
        console.log("ctx.params.action is:" + ctx.params.action);
    }
    next();
}