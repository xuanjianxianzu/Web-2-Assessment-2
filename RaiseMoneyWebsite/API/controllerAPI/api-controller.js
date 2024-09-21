var express = require('express');   //导入模块
var router = express.Router();
var dbcon = require("../models/crowdfunding_db")

var connection = dbcon.getConnection();  //调用getConnection()创建新的连接到MySql数据库

connection.connect(); //打开连接到MySql数据库

router.get("/",(req,res)=>{
    connection.query(
        //使用JOIN操作通过CATEGORY_ID 将两个表连接,使用where f.active=1过滤掉不活跃的筹款人
        `SELECT f.FUNDRAISER_ID, f.ORGANIZER, f.CAPTION, f.TARGET_FUNDING, f.CURRENT_FUNDING, f.CITY, f.ACTIVE, c.NAME AS CATEGORY_NAME  
             FROM FUNDRAISER f  
             JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID        
             WHERE f.ACTIVE = 1;`,(err,records,fields)=>{
                if(err){
                    console.error("Error while retrieve the data");
                }else{
                    res.send(records);
                }
             })
})


             
module.exports = router;