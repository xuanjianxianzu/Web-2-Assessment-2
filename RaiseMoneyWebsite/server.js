/**用于启动服务器的主文件 */
var express =require('express');  //导入express模块
var app = express();  //创建应用程序的一个实例

var RaiseMoneyAPI = require("./API/controllerAPI/api-controller");  // 配置restful API的路径

app.use("/api/raisemoney", RaiseMoneyAPI);

app.listen(3060);

console.log("Server up and running on port 3060");