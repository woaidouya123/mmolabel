import React,{Component} from "react";
import {hot} from "react-hot-loader";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>Hello,World123!</h1>
            </div>
        );
    }
}
module.exports = hot(module)(App);