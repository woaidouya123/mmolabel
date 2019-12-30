var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var MongoDB = require('./mongo/db');
var router = require('./mongo/router');
var connectHistoryApiFallback = require('connect-history-api-fallback');

var session = require("express-session");
var MongoStore  = require("connect-mongo")(session);
//配置中间件
app.use(session({
    secret: 'welcometommolabel',   // 可以随便写。 一个 String 类型的字符串，作为服务器端生成 session 的签名
    name:'session_id',/*保存在本地cookie的一个名字 默认connect.sid  可以不设置*/
    resave: false,   /*强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。*/
    saveUninitialized: true,   //强制将未初始化的 session 存储。  默认值是true  建议设置成true
    cookie: {
        maxAge:1000*30*60    /*过期时间*/
 
    },   /* secure:true  https这样的情况才可以访问cookie */
    rolling:true, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
    store:new MongoStore({
        url: 'mongodb://127.0.0.1:27017/lable',  //数据库的地址  shop是数据库名
        touchAfter: 24 * 3600   // 通过这样做，设置touchAfter:24 * 3600，您在24小时内只更新一次会话，不管有多少请求(除了在会话数据上更改某些内容的除外)
    })

}));

app.use('/',express.static(path.join(__dirname,'./public')));
app.use('/dist',express.static(path.join(__dirname,'./dist')));
app.use('/', connectHistoryApiFallback());

// 配置bodyParser中间件
app.use(bodyParser.urlencoded({limit: '5mb', extended: true }));
app.use(bodyParser.json({limit: '5mb'}));
app.use('/api',router);


app.post("/login",function(req,res){
    req.session.userId=req.body.userId;  //设置session
    res.send('登录成功');
});

var port = 8080;
MongoDB.connect();

app.listen(port, function (err) {
    if (err) {
        console.error('err:', err);
    } else {
        console.info(`===> start successfully!`)
    }
});
