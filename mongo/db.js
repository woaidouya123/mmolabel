var mongoose = require('mongoose');
var MongoDB = {
    "connect":function(){
        mongoose.connect('mongodb://localhost:27017/mmolable', function (err) {
            if (err) {
                console.log(err, "数据库连接失败");
                return;
            }
            console.log('数据库连接成功');
        });
            
    }
}
module.exports = MongoDB;