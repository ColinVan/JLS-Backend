const query = require("../handleDB/query.js");
module.exports = async (ctx, next) => {
    let chapter = ctx.request.url.slice(ctx.request.url.lastIndexOf("/") + 1, ctx.request.url.length);
    console.log("ctx.request.url is: " + chapter);
    let section = "";
    if(chapter === 'basic'){
        section = "Java基础";
    }else if(chapter === 'junior'){
        section = "Java初级";
    }else if(chapter === 'middle'){
        section = "Java中级";
    }else{
        section = "Java高级";
    }
    let sql = `SELECT chapterName, chapterId, chapterIntroduction, chapterImg
                FROM chapter
                WHERE chaptertype=\"${section}\"`;
    let data = await query(sql);
    ctx.body = data;
    next();
}