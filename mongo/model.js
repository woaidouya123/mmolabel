var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LabelSchema = new Schema({
    content: { type: String, trim: true },
    x:String,
    y:String,
    Lid:Number,
    type:String,
    status:String
})
var BgCanvasSchema = new Schema({
    base64: String,
    userId:String
})

module.exports = {
    Label:mongoose.model('label', LabelSchema),
    BgCanvas:mongoose.model('bg', BgCanvasSchema)
}