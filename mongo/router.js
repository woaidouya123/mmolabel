var express = require('express');
var Label = require("./model");
var router = express.Router();
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
        label.save(function(err) {
            if (err)
                res.send(err);
            res.json({
                "status":"success",
                "message":"添加成功！"
            });
        });
    })
module.exports = router
