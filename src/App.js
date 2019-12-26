import React,{Component} from "react";
import {hot} from "react-hot-loader";
import PlusButton from './PlusButton.js';
import BgCanvas from './BgCanvas.js';
import ContentInput from './ContentInput.js';
import NormalMMo from './mmo/normalMMO.js';
import axios from 'axios';
import "./App.css";

class App extends Component {
    constructor(props){
        super(props);
        this.addMMo = this.addMMo.bind(this);
        this.addInput = this.addInput.bind(this);
        this.state = {
            "normalList":[],
            "inputVisible":false,
            "addType":""
        }
    }
    componentDidMount(){
        var self = this;
        axios.post("/api/queryAll",{})
        .then(function(res){
            self.setState({normalList:res.data})
        }).catch(function(err){
            console.log(err);
        })
    }
    render() {
        const mmoList = this.state.normalList.map((item,index)=>
            <NormalMMo key={index} message={item.content} />
        )
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
        switch(this.state.addType){
            case 'normal':
                let data = [...this.state.normalList];
                data.push({
                    "content":msg
                });
                this.setState({normalList:data});
                break;
            default:
                break;
        }
    }
}
module.exports = hot(module)(App);