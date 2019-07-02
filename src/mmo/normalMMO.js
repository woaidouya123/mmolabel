import React, { Component } from "react";

class NormalMMo extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="normal-div">
                <span>{this.props.message}</span>
                <span className="finish-button"></span>
            </div>
        );
    };
}
module.exports = NormalMMo;