const query = module.require("../handleDB/query.js")
module.exports = async (ctx, next) => {
    console.log(ctx.request.body);/*{ username: 'laoba', password: '202cb962ac59075b964b07152d234b70' }*/
    let requestData =  ctx.request.body;
    let sql =
        "SELECT userName, password FROM user WHERE userName=\'"
        + requestData.username
        + "\' AND password=\'"
        + requestData.password
        + "\'";
    let data = await query(sql);
    if(data && data.length == 1){
        console.log(data);
        ctx.body = data[0].password;
    }else if(data){
        console.log(data);
        console.log("login middleWare is calling: No data.");
        ctx.body = '';
    }else{
        console.log("login middleWare is calling:query not succeed.");
        ctx.body = '';
    }
    next();
};
