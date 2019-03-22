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
    }

    componentDidMount() {
        this.setIndicators();
    }

    handleKeyboardEvent(keyPressed){
        if(keyPressed==="enter") {
            this.handleClickButton();
        }else{
            this.handleClickItem(keyPressed - 1)
        }
        return keyPressed;
    }

    handleClickItem(value) {
        let arrayItems;
        if(this.props.disable === false) {
            arrayItems = this.state.items;
            arrayItems.filter((item) => item.value === value).map((item) => item.checked = !item.checked);
            this.setState({items: arrayItems})
        }
        return arrayItems;
    }

    setIndicators(){
        let arrayItems = this.state.items;
        arrayItems.forEach(item => {
            if(this.props.indicators.includes(item.value)){
                item.checked = true;
            }else{
                item.checked = false;
            }
        });
        this.setState({items: arrayItems});
        return arrayItems;
    }

    fillArrayCheckedItems(arrayItems){
        let arrayClicked = [];
        arrayItems.forEach((item) => {
            if (item.checked){
                arrayClicked.push(item.value)
            }
        });
        return arrayClicked;
    }

    async handleClickButton() {
        let arrayItems = this.state.items;
        let arrayClicked = this.fillArrayCheckedItems(arrayItems);
        this.props.handleSubmit(arrayClicked).then(() => this.setIndicators());
        return arrayItems;
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
