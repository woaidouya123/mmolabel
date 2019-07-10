import React,{Component} from "react";
import {hot} from "react-hot-loader";
import PlusButton from './PlusButton.js';
import BgCanvas from './BgCanvas.js';
import NormalMMo from './mmo/normalMMO.js';
import "./App.css";

class App extends Component {
    constructor(props){
        super(props);
        this.addMMo = this.addMMo.bind(this);
        this.state = {
            "normalList":[]
        }
    }
    render() {
        const mmoList = this.state.normalList.map((item,index)=>
            <NormalMMo key={index} message={item} />
        )
        console.log(mmoList);
        return (
            <div className="App">
                <BgCanvas />
                <PlusButton  addMethod={this.addMMo} />
                <NormalMMo message="hello" />
                <NormalMMo message="world" />
                {mmoList}
            </div>
        );
    }
    addMMo(){
        console.log("click add");
        let data = [...this.state.normalList];
        console.log(data);
        data.push("hello");
        debugger
        this.setState({normalList:data})
        console.log(this.state.normalList);
    }
}
module.exports = hot(module)(App);