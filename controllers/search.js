module.exports = async (ctx, next) => {
    console.log(ctx.request.body);
    ctx.body = {
        message: "Received your search request which is " + ctx.request.body.keyword
    };
    next();
}
