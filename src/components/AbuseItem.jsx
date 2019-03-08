import React, { Component } from 'react';
import '../styles/AbuseItem.css';

class AbuseItem extends Component {
    constructor(props) {
        super(props);
        this.getImageByCheckedValue = this.getImageByCheckedValue.bind(this);
        this.uncheckedImage = require("../images/"+this.props.title.toLowerCase()+"/grey.svg");
        this.checkedImage = require("../images/"+this.props.title.toLowerCase()+"/blue.svg");
    }

    getImageByCheckedValue(isChecked) {
        return isChecked ? this.checkedImage : this.uncheckedImage;
    }

    render() {
        return(
            <div className="abuse-div" onClick={() => this.props.onChange(this.props.value)}>
                <div className="abuse-div-img">
                    <img src={this.getImageByCheckedValue(this.props.checked)} alt=""/>
                </div>
                <div className="label-title-div">
                    <div className="title-label">{this.props.title} </div>
                </div>
                <div className={"label-description-div"}>
                    <div className="content-label">{this.props.desc}</div>
                </div>
            </div>
        )
    }
}

export default AbuseItem;