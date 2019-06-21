import React, { Component } from 'react';
import '../styles/AbuseItem.css';

class AbuseItem extends Component {
    constructor(props) {
        super(props);
        this.uncheckedImage = require("../images/"+this.props.title.toLowerCase()+"/grey.svg");
        this.checkedImage = require("../images/"+this.props.title.toLowerCase()+"/blue.svg");
    }

    render() {
        return(
            <div className="abuse-div" onClick={() => this.props.handleClickItem(this.props.value)}>
                <div className="abuse-div-img">
                    <img className = "img-item" src={this.props.checked ? this.checkedImage : this.uncheckedImage} alt=""/>
                </div>
                <div className="label-title-div">
                    <div className="title-label">{this.props.title}</div>
                </div>
                <div className={"label-description-div"}>
                    <div className="content-label">{this.props.desc}</div>
                </div>
            </div>
        )
    }
}

export default AbuseItem;