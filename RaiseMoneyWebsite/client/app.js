/**用于启动服务器的文件 */
const express = require("express");    //导入模块
const bodyParser = require("body-parser");
const path = require("path");

const app = express();  //创建一个express应用实例.

app.use(bodyParser.urlencoded({extended:true}));  //to parse URL-encoded & JSON data 
app.use(bodyParser.json());

app.use(express.static(__dirname));  //提供当前目录下的静态文件(html,css等)

app.get("/",(req,res)=>{   //主页路由服务
    res.sendFile(path.join(__dirname,"./html/index.html"));
});

app.get("/search",(req,res)=>{   //搜索页面路由服务
    res.sendFile(path.join(__dirname,"./html/search.html"));
});

app.get("/fundraiser",(req,res)=>{   //筹款人页面路由服务
    res.sendFile(path.join(__dirname,"./html/fundraiser.html"));
});

app.listen(8080,()=>{
    console.log("8080...(~_~)");
});


