/**用于连接数据库 */
var dbModel = require("./db_model");         //导入模块
var mysql = require('mysql2');
var bodyParser =require('body-parser');
var http = require('http');

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