import React, { Component } from "react";
import axios from 'axios';

class ContentInput extends Component {
    constructor(props) {
        super(props);
        this.addContent = this.addContent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value:""
        }
    }
    componentDidMount(){
        document.getElementById("content-input").focus();
    }
    render() {
        return (
            <div className="content-div">
                <div className="input-div">
                    <input id="content-input" type="text" placeholder="请输入标签内容" maxLength="30" value={this.state.value} onChange={this.handleChange} />
                    <span onClick={this.addContent}>确认</span>
                </div>
            </div>
        );
    };
    addContent() {
        var self = this;
        axios.post("/api/addLabel",{
            "content":self.state.value
        }).then(function(res){
            self.props.addContent(self.state.value);
        }).catch(function(err){
            console.log(err);
        })
        
    }
    handleChange(event) {
        this.setState({value:event.target.value})
    }
}
module.exports = ContentInput;