import React,{Component} from "react";
import {hot} from "react-hot-loader";
import PlusButton from './PlusButton.js';
import BgCanvas from './BgCanvas.js';
import ContentInput from './ContentInput.js';
import NormalMMo from './mmo/normalMMO.js';
import PaperMMo from './mmo/paperMMO.js';
import axios from 'axios';
import "./App.css";

class App extends Component {
    constructor(props){
        super(props);
        this.addMMo = this.addMMo.bind(this);
        this.addInput = this.addInput.bind(this);
        this.setLablePos = this.setLablePos.bind(this);
        this.state = {
            "normalList":[],
            "inputVisible":false,
            "addType":""
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
    }
    render() {
        var self = this;
        const mmoList = this.state.normalList.map(function(item,index){
            switch(item.type){
                case 'normal':
                    return <NormalMMo key={index} info={item} changePos={self.setLablePos}/>;
                    break;
                case 'paper':
                    return <PaperMMo key={index} info={item} changePos={self.setLablePos}/>;
                    break;
                default:
                    break;
                
            }
        })
        return (
            <div className="App">
                <BgCanvas />
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
}
module.exports = hot(module)(App);