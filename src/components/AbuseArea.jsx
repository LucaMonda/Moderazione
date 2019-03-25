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
        this.disableItems = this.disableItems.bind(this);
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
        let items;
        if(this.props.disable === false) {
            items = this.state.items;
            items.filter((item) => item.value === value).map((item) => item.checked = !item.checked);
            this.setState({items: items})
        }
        return items;
    }

    disableItems(){
        let items = this.state.items;
        items.forEach((item) => {
            item.checked = false;
        });
        this.setState({items: items})
    }

    setIndicators(){
        let items = this.state.items;
        items.forEach(item => {
            if(this.props.indicators.includes(item.value)){
                item.checked = true;
            }else{
                item.checked = false;
            }
        });
        this.setState({items: items});
        return items;
    }

    fillArrayCheckedItems(items){
        let clickedItems = [];
        items.forEach((item) => {
            if (item.checked){
                clickedItems.push(item.value)
            }
        });
        return clickedItems;
    }

    async handleClickButton() {
        let items = this.state.items;
        let clickedItems = this.fillArrayCheckedItems(items);
        this.props.changeDisable();
        this.disableItems();
        await this.props.handleSubmit(clickedItems).then(() => this.setIndicators());
        return items;
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
