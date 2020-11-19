const Koa = require('koa');
const app = new Koa();
// koa-logger是koa的日志模块，在安装、挂载之后, 命令程序就会在控制台自动打印日志
// const koaLogger = require("koa-logger");
// app.use(koaLogger);

const bodyParser = require("koa-bodyparser");
app.use(bodyParser()); /* 千万不要忘记bodyParser后面的()! */

const router = require("./routes/router.js");
router(app);

const config = require("./configs/port.js");
app.listen(config.port, () => {
    console.log("[demo]server is listening port " + config.port)
})