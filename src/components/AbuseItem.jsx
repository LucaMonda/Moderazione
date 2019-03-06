import React, { Component } from 'react';
import '../styles/AbuseItem.css';

const imagegrey = require("../images/insulto/grey.svg");
const imageblue = require("../images/insulto/blue.svg");

class AbuseItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index : this.props.value,
            icon : this.props.icon,
            title :this.props.title,
            desc : this.props.desc
        };
        this.src=null;
        this.handleClickDiv = this.handleClickDiv.bind(this);
    }


    handleClickDiv(){
        const href = window.location.href.replace(/.$/, "");
        if(document.getElementById(this.props.id).src === href+imagegrey){
            document.getElementById(this.props.id).src=imageblue;
            this.props.handleDivSelected(this.state.index);
        }else{
            document.getElementById(this.props.id).src=imagegrey;
            this.props.handleDivUnselected(this.state.index);
        }
    }

    render() {
        return(
            <div className="checkbox-abuse-div"  onClick={this.handleClickDiv}>
                <div className="checkbox-div">
                    <img src={imagegrey} id={this.props.id} alt=""/>
                </div>
                <div className="label-title-div">
                    <div htmlFor={this.props.id} className="title-label">{this.state.title} </div>
                </div>
                <div className={"label-description-div"}>
                    <div htmlFor={this.props.id} className="content-label">{this.state.desc}</div>
                </div>
            </div>
        )
    }
}

export default AbuseItem;