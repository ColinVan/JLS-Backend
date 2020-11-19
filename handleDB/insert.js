const mysql = require("mysql");
const mysqlConfig = require("../configs/mysql.js");
// 创建连接池
const pool = mysql.createPool({
    host: mysqlConfig.host,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database
});

// 用Promise封装对数据库的插入数据操作(不限SQL语句)
const insert = (sql) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err){
                console.log("[ERROR] database getconnection failed in insert.js.");
                console.log(err);
                reject(err);
            }else{
                connection.query(sql, (err, results, fields) => {
                    if(err){
                        console.log("[ERROR] insert failed.");
                        console.log(err);
                        reject(err);
                    }else{
                        console.log("[OK]insert finished.");
                        resolve(results);
                    }
                    connection.release();
                });
            }
        });
    });
};

module.exports = insert;