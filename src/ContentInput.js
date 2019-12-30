import React, { Component } from "react";
import { Input,Button } from 'antd';
const { TextArea } = Input;

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
                    <TextArea id="content-input" type="text" placeholder="请输入标签内容" value={this.state.value} onChange={this.handleChange} rows={4} />
                    <Button type="primary" onClick={this.addContent}>确认</Button>
                </div>
            </div>
        );
    };
    addContent() {
        this.state.value&&this.props.addContent(this.state.value);
    }
    handleChange(event) {
        this.setState({value:event.target.value})
    }
}
module.exports = ContentInput;