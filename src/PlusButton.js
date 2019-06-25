import React,{Component} from "react";

class PlusButton extends Component {
    constructor(props){
        super(props);
        this.addMMO = this.addMMO.bind(this);
    }
    render() {
        return (
            <div className="plus-button" onClick={this.addMMO}>
                <img src={require("../public/plus.png")}/>
                <ul>
                    <li>Circle</li>
                    <li>Rectangle</li>
                    <li>Star</li>
                    <li>DIY</li>
                </ul>
            </div>
            
            
        );
    };
    addMMO(){
        
    }
}
module.exports = PlusButton;