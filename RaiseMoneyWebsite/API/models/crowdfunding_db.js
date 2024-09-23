/**用于连接数据库 */
const dbModel = require("./db_model");         //导入模块
const mysql = require('mysql2');
const bodyParser =require('body-parser');
const http = require('http');

module.exports = {
    getConnection:()=>{
        return mysql.createConnection({     //创建数据库连接的模块
            host:dbModel.host,
            user:dbModel.user,
            password:dbModel.password,
            database:dbModel.database
    });
    }
}