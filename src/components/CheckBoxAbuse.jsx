import React, { Component } from 'react';
import '../styles/CheckBoxAbuse.css';

class CheckBoxAbuse extends Component {
    constructor(props) {
        super(props)
        this.isSelected = this.isSelected.bind(this);
    }

    isSelected(){
        const checkBox = document.getElementById(this.props.id);
        if (checkBox.checked === true){
            this.props.handleCheckBoxSelected(this.props.value);
        }else{
            this.props.handleCheckBoxUnselected(this.props.value);
        }
    }

    render() {
        return(
            <div className="checkbox-div">
                <input type="checkbox" onChange={this.isSelected} id={this.props.id} name ="{this.props.title}" value="{this.props.value}"/>
                <label>{this.props.title}</label>
                <label>{this.props.desc}</label>
            </div>
        )
    }
}

export default CheckBoxAbuse;