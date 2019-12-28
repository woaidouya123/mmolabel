import React, { Component } from "react";

class BgCanvas extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="canvas-div" >
                <canvas>您的浏览器不支持canvas</canvas>
            </div>
        );
    };
    componentDidMount(){
        var self = this;
        console.log(this.props.labels,document.querySelector(".canvas-div").children[0]);
        for(var i=0;i<this.props.labels;i++){
            
            html2canvas(this.props.labels[i], {
                canvas:document.querySelector(".canvas-div").children[0],
                allowTaint: false,
                useCORS: false,
                height: dom.scrollHeight+20,
                width: dom.scrollWidth+10,
                x:dom.parentNode.offsetLeft,
                y:dom.parentNode.offsetTop
            }).then(canvas => {
                // canvas
                console.log(canvas.toDataURL("jpeg",1))
            });
        }
    }
}
module.exports = BgCanvas;