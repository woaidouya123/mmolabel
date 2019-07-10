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
    render() {
        return (
            <div className="content-div">
                <div className="input-div">
                    <input type="text" maxLength="30" value={this.state.value} onChange={this.handleChange} />
                    <span onClick={this.addContent}>确认</span>
                </div>
            </div>
        );
    };
    addContent() {
        this.props.addContent();
    }
    handleChange(event) {
        this.setState({value:event.target.value})
    }
}
module.exports = PlusButton;