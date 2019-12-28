import React, { Component } from "react";
class NormalMMo extends Component {
    constructor(props) {
        super(props);
        this.mousedown = this.mousedown.bind(this);
        this.mousemove = this.mousemove.bind(this);
        this.mouseup = this.mouseup.bind(this);
        this.labelFinish = this.labelFinish.bind(this);
        this.finishAnimation = this.finishAnimation.bind(this);
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
            <div style={this.style} className="label-paper" >
                <div className="paper-content" onAnimationEnd={this.labelFinish}>
                    <span>{this.props.info.content}</span>
                </div>
                <div className="op">
                    <button className="move" onMouseDown={this.mousedown} onMouseMove={this.mousemove} 
            onMouseUp={this.mouseup} onMouseLeave={this.mouseup} dangerouslySetInnerHTML={{__html: '&#10021'}}></button>
                    <button className="finish" onClick={this.finishAnimation} dangerouslySetInnerHTML={{__html: '&#10004'}}></button>
                    <button className="delete" onClick={this.props.deleteLabel} dangerouslySetInnerHTML={{__html: '&#10006'}}></button>
                </div>
            </div>
        );
    };

    componentDidMount(){
        
    }

    // 拖拽
    mousedown(event) {
        var ev = event || window.event;
    	var target = ev.target || ev.srcElement;
        this.setState({isDraging:true});
        this.setState({paddingX:event.clientX - target.parentNode.parentNode.offsetLeft});
        this.setState({paddingY:event.clientY - target.parentNode.parentNode.offsetTop})
    }
    mousemove(event) {
        if(this.state.isDraging){
            var ev = event || window.event;
    	    var target = ev.target || ev.srcElement;
            target.parentNode.parentNode.style.left = (event.clientX - this.state.paddingX) + "px";
            target.parentNode.parentNode.style.top = (event.clientY - this.state.paddingY) + "px";
        }
    }
    mouseup(event) {
        if(this.state.isDraging){
            var ev = event || window.event;
            var target = ev.target || ev.srcElement;
            this.state.startX = target.parentNode.parentNode.offsetLeft+"";
            this.state.startY = target.parentNode.parentNode.offsetTop+"";
            this.setState({isDraging:false});
            this.props.changePos({
                "_id":this.state._id,
                "x":this.state.startX,
                "y":this.state.startY
            });
        }
        
    }

    // 完成
    labelFinish(event) {
        var ev = event || window.event;
        var target = ev.target || ev.srcElement;
        target.style.animation = "";
        target.style.transform="rotateZ(-5deg)";
        target.style["background-color"]="darkgray";
        target.style["border-radius"] = "5px";
        var self = this;
        var st = setTimeout(function(){
            self.props.finishIt(target,self.state._id);
            clearTimeout(st);
        },500)
        
    }

    // 添加完成动画
    finishAnimation(event) {
        var ev = event || window.event;
        var target = ev.target || ev.srcElement;
        var note = target.parentNode.previousSibling;
        note.style.height = note.scrollHeight + "px";
        note.children[0].style["white-space"] = "normal";
        target.parentNode.previousSibling.style.animation = "paper-save 1s linear";
        target.parentNode.style.height = "0px";
    }
}
module.exports = NormalMMo;