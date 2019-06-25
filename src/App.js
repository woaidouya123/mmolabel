import React,{Component} from "react";
import {hot} from "react-hot-loader";
import PlusButton from './PlusButton.js';
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <PlusButton />
            </div>
        );
    }
}
module.exports = hot(module)(App);