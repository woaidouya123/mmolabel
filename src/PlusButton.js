import React, { Component } from "react";

class PlusButton extends Component {
    constructor(props) {
        super(props);
        this.addMMO = this.addMMO.bind(this);
    }
    render() {
        return (
            <div className="plus-div">
                <div className="plus-button" >
                    <img src={require("../public/plus.png")} />
                </div><ul>
                    <li>Circle</li>
                    <li onClick={this.addMMO.bind(this,"normal")}>Rectangle</li>
                    <li>Star</li>
                    <li>DIY</li>
                </ul>
            </div>



        );
    };
    addMMO(msg) {
        this.props.addMethod(msg);
    }
}
module.exports = PlusButton;