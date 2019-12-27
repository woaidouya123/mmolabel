import React, { Component } from "react";
import axios from 'axios';
class NormalMMo extends Component {
    constructor(props) {
        super(props);
        this.mousedown = this.mousedown.bind(this);
        this.mousemove = this.mousemove.bind(this);
        this.mouseup = this.mouseup.bind(this);
        this.state = {
            "isDraging" : false,
            "startX":props.info.x,
            "startY":props.info.y,
            "_id":props.info._id,
            
        }
        this.style ={left:this.state.startX + "px",top:this.state.startY + "px"}
    }
    render() {
        return (
            <div style={this.style} className="normal-div" onMouseDown={this.mousedown} onMouseMove={this.mousemove} 
            onMouseUp={this.mouseup} onMouseLeave={this.mouseup}>
                <span>{this.props.info.content}</span>
                <label>
                    <input type="checkbox" style={{display:"none"}} />
                    <span className="finish-button"></span>
                </label>
                
            </div>
        );
    };

    componentDidMount(){
        
    }

    // 拖拽
    mousedown(event) {
        this.setState({isDraging:true});
        console.log("mouse",event.clientX,event.clientY);
        var positionX = parseInt(event.target.style.left),
            positionY = parseInt(event.target.style.top);
        positionX = positionX || event.target.scrollLeft;
        positionY = positionY || event.target.scrollTop;
        this.setState({paddingX:event.clientX - positionX});
        this.setState({paddingY:event.clientY - positionY})
    }
    mousemove(event) {
        if(this.state.isDraging){
            event.target.style.left = (event.clientX - this.state.paddingX) + "px";
            event.target.style.top = (event.clientY - this.state.paddingY) + "px";
        }
    }
    mouseup(event) {
        if(this.state.isDraging){
            this.state.startX = event.target.offsetLeft+"";
            this.state.startY = event.target.offsetTop+"";
            this.setState({isDraging:false});
            this.props.changePos({
                "_id":this.state._id,
                "x":this.state.startX,
                "y":this.state.startY
            });
        }
        
    }
    
}
module.exports = NormalMMo;