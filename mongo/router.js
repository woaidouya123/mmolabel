var express = require('express');
var Label = require("./model");
var router = express.Router();
var ObjectId = require("mongodb").ObjectId;
router.route('/queryAll')
    .post(function(req, res) {
        Label.find(function(err, labels) {
            if (err)
                res.send(err);
            res.json(labels);
        });
    })
router.route('/addLabel')
    .post(function(req, res) {
        var label = new Label();
        label.content = req.body.content;
        label.x = "0";
        label.y = "0";
        label.save(function(err) {
            if (err)
                res.send(err);
            res.json({
                "status":"success",
                "message":"添加成功！"
            });
        });
    })
router.route('/changePos')
    .post(function(req, res) {
        console.log(req.body);
        Label.updateOne({_id:ObjectId(req.body._id)},{
            x:req.body.x,
            y:req.body.y
        },function(err) {
            if (err)
                res.send(err);
            res.json({
                "status":"success",
                "message":"修改成功！"
            });
        });
    })
module.exports = router
