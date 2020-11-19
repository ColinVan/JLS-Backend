// 创建node.js对mysql链接时所用的参数
// 详情可见https://blog.csdn.net/zxsrendong/article/details/17006185
module.exports = {
    host: 'localhost',
    port: 3306,
    database: 'jls',
    user: 'root',
    password: '123456',
    multipleStatements: true /*是否允许在一个query中传递多个查询语句, 默认为false*/
}