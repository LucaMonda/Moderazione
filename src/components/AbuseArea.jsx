import React, {Component} from 'react';
import AbuseItem from './AbuseItem.jsx';
import '../styles/AbuseArea.css';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import {Items} from "../configuration/item-configuration";


class AbuseArea extends Component {

    constructor(props) {
        super(props);
        this.handleClickButton = this.handleClickButton.bind(this);
        this.handleClickItem = this.handleClickItem.bind(this);
        this.setIndicators = this.setIndicators.bind(this);
        this.state = {
            items: Items
        };
        this.setIndicators();
    }

    handleKeyboardEvent(key){
        if(key==="enter") {
            this.handleClickButton();
        }else{
            this.handleClickItem(key - 1)
        }
        return key;
    }

    handleClickItem(value) {
        let array;
        if(this.props.disable === false) {
            array = this.state.items;
            array.filter((item) => item.value === value).map((item) => item.checked = !item.checked);
            this.setState({items: array})
        }
        return array;
    }

    setIndicators(){
        this.state.items.forEach(item => {
            if(this.props.indicators.includes(item.value)){
                item.checked = true;
            }
        });
    }

    fillArrayCheckedItems(array){
        let arrayClicked = [];
        array.forEach((item) => {
            if (item.checked){
                arrayClicked.push(item.value)
            }
        });
        return arrayClicked;
    }

    handleClickButton() {
        let array = this.state.items;
        let arrayClicked = this.fillArrayCheckedItems(array)
        this.props.handleSubmit(arrayClicked);
        array.map((item) => item.checked = false);
        this.setState({items: array});
        this.setIndicators();
        return array;
    }

    render() {
        return (
            <div className="container-area">
                <div className="container-item">
                    {
                        this.state.items.map((item) =>
                            <AbuseItem
                                key={item.value}
                                value={item.value}
                                title={item.title}
                                desc={item.desc}
                                checked={item.checked}
                                handleClickItem={this.handleClickItem}/>
                        )
                    }
                </div>
                <KeyboardEventHandler
                    handleKeys={['1', '2', '3', '4', "enter"]}
                    onKeyEvent={(key) => this.handleKeyboardEvent(key)}
                    isDisabled={this.props.disable}
                    />
                <div className="button-container">
                    <button className="send-info-button" disabled ={this.props.disable}
                            style={{backgroundColor: this.props.disable? "grey" : "#242EE5"}}
                            onClick={this.handleClickButton}>AVANTI
                    </button>
                </div>
            </div>

        )
    }
}

export default AbuseArea;
