var express = require('express');
var Label = require("./model").Label;
var BgCanvas = require("./model").BgCanvas;
var router = express.Router();
var ObjectId = require("mongodb").ObjectId;
router.route('/queryAll')
    .post(function(req, res) {
        Label.find({status:"started"},function(err, labels) {
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
        label.status = "started";
        label.type=req.body.type;
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
router.route('/deleteLabel')
    .post(function(req, res) {
        Label.deleteOne({_id:ObjectId(req.body._id)},function(err) {
            if (err)
                res.send(err);
            res.json({
                "status":"success",
                "message":"删除成功！"
            });
        });
    })
router.route('/changeStatus')
    .post(function(req, res) {
        Label.updateOne({_id:ObjectId(req.body._id)},{
            status:"finished"
        },function(err) {
            if (err)
                res.send(err);
            res.json({
                "status":"success",
                "message":"状态修改成功！"
            });
        });
    })
router.route('/saveBgCanvas')
    .post(function(req, res) {
        var bgCanvas = new BgCanvas();
        bgCanvas.userId="1";
        bgCanvas.base64=req.body.base64;
        bgCanvas.save(function(err) {
            if (err)
                res.send(err);
            res.json({
                "status":"success",
                "message":"背景保存成功！"
            });
        });
    })
router.route('/updateBgCanvas')
    .post(function(req, res) {
        BgCanvas.update({
            "userId":"1",
            "base64":req.body.base64
        },function(err) {
            if (err)
                res.send(err);
            res.json({
                "status":"success",
                "message":"背景保存成功！"
            });
        });
    })
router.route('/getBgCanvas')
    .post(function(req, res) {
        BgCanvas.findOne({userId:"1"},function(err, bg) {
            if (err)
                res.send(err);
            res.json(bg);
        });
    })
module.exports = router
