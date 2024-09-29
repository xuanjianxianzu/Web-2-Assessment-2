const express = require('express');   //导入模块
const router = express.Router();
const dbcon = require("../models/crowdfunding_db")


const connection = dbcon.getConnection();  //调用getConnection()创建新的连接到MySql数据库

connection.connect(); //打开连接到MySql数据库

router.get("/",(req,res)=>{
    connection.query(
        //使用JOIN操作通过CATEGORY_ID 将两个表连接,使用where f.active=1过滤掉不活跃的筹款人.
        `SELECT 
            f.FUNDRAISER_ID,
            f.ORGANIZER, 
            f.CAPTION,
            f.TARGET_FUNDING, 
            f.CURRENT_FUNDING, 
            f.CITY, 
            f.ACTIVE, 
            c.NAME AS CATEGORY_NAME,
            c.CATEGORY_ID
        FROM
            FUNDRAISER f  
        JOIN
            CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID        
        WHERE 
            f.ACTIVE = 1;`,(err,records,fields)=>{
                if(err){
                    console.error("Error while retrieve the data");
                }else{
                    res.send(records);
                }
             })
});

router.get("/use/search/CATEGORY",(req,res)=>{
    connection.query(
        `SELECT * FROM CATEGORY;`,(err,records,fields)=>{
                if(err){
                    console.error("Error while retrieve the data");
                }else{
                    res.send(records);
                }
             })
});

router.get("/Search/:search",(req,res)=>{

    const searchParts = req.params.search.split('&');
    let query=
        `SELECT 
            f.FUNDRAISER_ID, 
            f.ORGANIZER, 
            f.CAPTION, 
            f.TARGET_FUNDING, 
            f.CURRENT_FUNDING, 
            f.CITY, 
            f.ACTIVE, 
            c.NAME AS CATEGORY_NAME  
        FROM 
            FUNDRAISER f  
        JOIN 
            CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID        
        WHERE 
            f.ACTIVE=1 `;

    let queryParams = [];
    let organizer =null;
    let city =null;
    let categoryName=null;

    for(let i=0;i<searchParts.length&&i<3;i++){
        const part=searchParts[i];
        if(i===0){
            organizer=part;
        }else if(i===1){
            city=part;
        }else if(i===2){
            categoryName=part;
        }
    }

    if(organizer !==''){
        query +='AND f.ORGANIZER=?';
        queryParams.push(organizer);
    }
    if(city !==''){
        query +='AND f.CITY=?';
        queryParams.push(city);
    }
    if(categoryName !==''){
        query +='AND c.NAME=?';
        queryParams.push(categoryName);
    }

    console.log(query,queryParams);

    connection.query(query,queryParams,(err,records,fields)=>{
        if(err){
            console.error("Error while retrieve the data",err);
            res.status(500).send("internal err")
        }else{
            res.send(records);
        }
    }
    
    );

});


router.get("/:ORGANIZER",(req,res)=>{
//筹款人界面的get请求,将路由中的组织人拼接到sql里,查询单个组织人的信息.
    connection.query(
        `SELECT 
            f.FUNDRAISER_ID, 
            f.ORGANIZER, 
            f.CAPTION, 
            f.TARGET_FUNDING, 
            f.CURRENT_FUNDING, 
            f.CITY, 
            f.ACTIVE, 
            c.NAME AS CATEGORY_NAME  
        FROM 
            FUNDRAISER f  
        JOIN 
            CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID        
        WHERE 
            f.ACTIVE=1
            AND f.ORGANIZER='${req.params.ORGANIZER}';`,(err,records,fields)=>{
                if(err){
                    console.error("Error while retrieve the data");
                }else{
                    res.send(records);
                }
             }
    )
}
);


             
module.exports = router;  //将制作的路由模块化