const mysql = require("mysql");
const mysqlConfig = require("../configs/mysql.js");
// 创建连接池
const pool = mysql.createPool({
    host: mysqlConfig.host,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database
});
// 用Promise封装对数据库的查询操作(不限SQL语句)
const query = (sql) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err){
                // 如果连接数据库失败
                console.log("[ERROR]database getconnection failed in query.js.");
                console.log(err);
                reject(err);
            }else{
                // 连接成功后进行查询, 可能查询成功或者没查到
                connection.query(sql, (err, results, fields) => {
                    if(err){
                        console.log("[ERROR]query failed.");
                        console.log(err);
                        reject(err);
                    }else{
                        console.log("[OK]query finished.");
                        resolve(results);
                        // console.log(fields);
                        /* 划重点: 即使没有查到任何符合条件的结果, 也算是查询成功, result是一个空数组*/
                    }
                    connection.release();
                });
            }
        });
    });
};

module.exports = query;