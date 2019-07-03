import React,{Component} from "react";
import {hot} from "react-hot-loader";
import PlusButton from './PlusButton.js';
import BgCanvas from './BgCanvas.js';
import NormalMMo from './mmo/normalMMO.js';
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <BgCanvas />
                <PlusButton />
                <NormalMMo message="hello" />
                <NormalMMo message="world" />
            </div>
        );
    }
}
module.exports = hot(module)(App);