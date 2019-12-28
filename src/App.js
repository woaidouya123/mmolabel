import React,{Component} from "react";
import {hot} from "react-hot-loader";
import PlusButton from './PlusButton.js';
import BgCanvas from './BgCanvas.js';
import ContentInput from './ContentInput.js';
import NormalMMo from './mmo/normalMMO.js';
import PaperMMo from './mmo/paperMMO.js';
import axios from 'axios';
import html2canvas from 'html2canvas';
import "./App.css";

class App extends Component {
    constructor(props){
        super(props);
        this.addMMo = this.addMMo.bind(this);
        this.addInput = this.addInput.bind(this);
        this.setLablePos = this.setLablePos.bind(this);
        this.deleteLabel = this.deleteLabel.bind(this);
        this.finishIt = this.finishIt.bind(this);
        this.saveBgCanvas = this.saveBgCanvas.bind(this);
        this.getBgCanvas = this.getBgCanvas.bind(this);
        this.state = {
            "normalList":[],
            "inputVisible":false,
            "addType":"",
            "finishLabels":[]
        }
    }
    getAllLabels(){
        var self = this;
        axios.post("/api/queryAll",{})
        .then(function(res){
            self.setState({normalList:res.data})
        }).catch(function(err){
            console.log(err);
        })
    }
    componentDidMount(){
        this.getAllLabels();
        var canvas = document.querySelector(".canvas-div").children[0];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.getBgCanvas();
    }
    render() {
        var self = this;
        const mmoList = this.state.normalList.map(function(item,index){
            switch(item.type){
                case 'normal':
                    return <NormalMMo key={item._id} info={item} changePos={self.setLablePos} deleteLabel={self.deleteLabel.bind(self,item._id)}/>;
                    break;
                case 'paper':
                    return <PaperMMo key={item._id} info={item} changePos={self.setLablePos} deleteLabel={self.deleteLabel.bind(self,item._id)} finishIt={self.finishIt}/>;
                    break;
                default:
                    break;
                
            }
        })
        return (
            <div className="App">
                <div className="canvas-div" >
                    <canvas>您的浏览器不支持canvas</canvas>
                </div>
                <PlusButton  addMethod={this.addMMo} />
                {this.state.inputVisible?(<ContentInput addContent={this.addInput} />):null}
                {mmoList}
            </div>
        );
    }
    addMMo(msg){
        console.log(msg);
        this.setState({"addType":msg});
        this.setState({"inputVisible":true});
    }

    // 输入内容
    addInput(msg) {
        this.setState({"inputVisible":false});
        var self = this;
        axios.post("/api/addLabel",{
            "content":msg,
            "type":self.state.addType
        }).then(function(res){
            self.getAllLabels();
        }).catch(function(err){
            console.log(err);
        })
    }

    // 更改位置
    setLablePos(info){
        var self = this;
        axios.post("/api/changePos",{
            "_id":info._id,
            "x":info.x,
            "y":info.y
        }).then(function(res){
            console.log("修改成功");
        }).catch(function(err){
            console.log(err);
        })
    }

    // 删除label
    deleteLabel(_id){
        // debugger
        var self = this;
        axios.post("/api/deleteLabel",{
            "_id":_id
        }).then(function(res){
            console.log("删除成功");
            self.getAllLabels();
        }).catch(function(err){
            console.log(err);
        })
    }

    // 完成
    finishIt(dom,_id){
        var self = this;
        axios.post("/api/changeStatus",{
            "_id":_id
        }).then(function(res){
            console.log(dom.parentNode.offsetLeft,dom.parentNode.offsetTop-10)
            html2canvas(dom, {
                canvas:document.querySelector(".canvas-div").children[0],
                allowTaint: false,
                backgroundColor:null,
                useCORS: false,
                height: dom.scrollHeight+20,
                width: dom.scrollWidth+10,
                backgroundColor:null,
                x:dom.parentNode.offsetLeft+"px",
                y:dom.parentNode.offsetTop-10+"px"
            }).then(canvas => {
                self.getAllLabels();
                self.saveBgCanvas(canvas.toDataURL("jpeg",1))
            });
        }).catch(function(err){
            console.log(err);
        })
        
    }

    // 获取背景
    getBgCanvas(){
        axios.post("/api/getBgCanvas",{}).then(function(res){
            var img = document.createElement("img");
            img.src = res.data.base64;
            img.onload = function(){
                var ctx = document.querySelector(".canvas-div").children[0].getContext("2d");
                ctx.drawImage(this,0,0,this.width,this.height);
            }
        }).catch(function(err){
            console.log(err);
        })
    }

    // 保存背景
    saveBgCanvas(base64){
        var self = this;
        axios.post("/api/updateBgCanvas",{
            base64:base64
        }).then(function(res){
            console.log(res);
        }).catch(function(err){
            console.log(err);
        })
    }
}
module.exports = hot(module)(App);