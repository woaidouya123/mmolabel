var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var MongoDB = require('./mongo/db');
var router = require('./mongo/router');
var connectHistoryApiFallback = require('connect-history-api-fallback');

app.use('/',express.static(path.join(__dirname,'./public')));
app.use('/dist',express.static(path.join(__dirname,'./dist')));
app.use('/', connectHistoryApiFallback());

// 配置bodyParser中间件
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api',router);

var port = process.env.PORT || 8080;
MongoDB.connect();

app.listen(port, function (err) {
    if (err) {
        console.error('err:', err);
    } else {
        console.info(`===> start successfully!`)
    }
});
