var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LabelSchema = new Schema({
    content: { type: String, trim: true },
    x:String,
    y:String,
    Lid:Number
})

module.exports = mongoose.model('label', LabelSchema);