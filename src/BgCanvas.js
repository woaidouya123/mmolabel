import React, { Component } from "react";

class BgCanvas extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="canvas-div">
                <canvas>您的浏览器不支持canvas</canvas>
            </div>



        );
    };
}
module.exports = BgCanvas;