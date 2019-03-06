import React, { Component } from 'react';
import '../styles/AbuseItem.css';

class AbuseItem extends Component {
    constructor(props) {
        super(props);

        this.uncheckedImage = require("../images/"+this.props.title.toLowerCase()+"/grey.svg");
        this.checkedImage = require("../images/"+this.props.title.toLowerCase()+"/blue.svg");

        this.state = {
            index : this.props.value,
            icon : this.props.icon,
            title :this.props.title,
            desc : this.props.desc,
            checked: this.uncheckedImage
        };

        this.handleClickDiv = this.handleClickDiv.bind(this);
    }


    handleClickDiv(){
        /*
        var href = window.location.href.replace(/.$/,"")
        if(document.getElementById(this.props.id).src === href+this.uncheckedImage){
            document.getElementById(this.props.id).src=this.checkedImage;
            this.props.handleDivSelected(this.state.index);
        }else{
            document.getElementById(this.props.id).src=this.uncheckedImage;
            this.props.handleDivUnselected(this.state.index);
        }*/
        this.setState({checked: this.state.checked === this.checkedImage ? this.uncheckedImage : this.checkedImage })
    }

    render() {
        return(
            <div className="checkbox-abuse-div"  onClick={this.handleClickDiv}>
                <div className="checkbox-div">
                    <img src={this.state.checked} id={this.props.id} alt=""/>
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