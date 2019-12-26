import React, { Component } from "react";
import axios from 'axios';
class NormalMMo extends Component {
    constructor(props) {
        super(props);
        this.mousedown = this.mousedown.bind(this);
        this.mousemove = this.mousemove.bind(this);
        this.mouseup = this.mouseup.bind(this);
        this.mouseout = this.mouseout.bind(this);
        this.setLablePos = this.setLablePos.bind(this);
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
            onMouseUp={this.mouseup} onMouseOut={this.mouseout}>
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
        this.state.startX = event.target.offsetLeft+"";
        this.state.startY = event.target.offsetTop+"";
        this.setState({isDraging:false});
        this.setLablePos();
    }
    mouseout(event) {
        this.state.startX = event.target.offsetLeft+"";
        this.state.startY = event.target.offsetTop+"";
        this.setState({isDraging:false});
        this.setLablePos();
    }
    setLablePos(){
        var self = this;
        axios.post("/api/changePos",{
            "_id":self.state._id,
            "x":self.state.startX,
            "y":self.state.startY
        }).then(function(res){
            console.log("修改成功");
        }).catch(function(err){
            console.log(err);
        })
    }
}
module.exports = NormalMMo;