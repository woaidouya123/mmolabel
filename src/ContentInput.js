import React, { Component } from "react";

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
        this.props.addContent(this.state.value);
    }
    handleChange(event) {
        this.setState({value:event.target.value})
    }
}
module.exports = ContentInput;