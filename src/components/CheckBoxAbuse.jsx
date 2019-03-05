import React, { Component } from 'react';
import '../styles/CheckBoxAbuse.css';

class CheckBoxAbuse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index : this.props.value,
            icon : this.props.icon,
            title :this.props.title,
            desc : this.props.desc
        }
        this.isSelected = this.isSelected.bind(this);
    }

    isSelected(){
        const checkBox = document.getElementById(this.props.id);
        if (checkBox.checked === true){
            this.props.handleCheckBoxSelected(this.state.index);
        }else{
            this.props.handleCheckBoxUnselected(this.state.index);
        }
    }

    render() {
        return(
            <div className="checkbox-div">
                <input type="checkbox" src={this.state.icon} onChange={this.isSelected} id={this.props.id} name={this.state.title} value={this.state.index}/>
                <label htmlFor={this.props.id} className="title-label">{this.state.title}
                    <label htmlFor={this.props.id} className="content-label">{this.state.desc}
                        <img src="../images/insulto/img.png"/>
                    </label>
                </label>
            </div>
        )
    }
}

export default CheckBoxAbuse;