import React, {Component} from 'react';
import AbuseItem from './AbuseItem.jsx';
import '../styles/AbuseArea.css';
import KeyboardEventHandler from 'react-keyboard-event-handler';

class AbuseArea extends Component {

    constructor(props) {
        super(props);
        this.handleClickButton = this.handleClickButton.bind(this);
        this.handleClickItem = this.handleClickItem.bind(this);
        this.setIndicators = this.setIndicators.bind(this);
        this.disableItems = this.disableItems.bind(this);
        this.state = {
            items: [
                {
                    value: 1,
                    title: 'OSCENO',
                    desc: 'Offese, insulti, attacchi personali, ecc.',
                    imageGrey: "../images/osceno/grey.svg",
                    checked: false
                },
                {
                    value: 2,
                    title: 'MINACCIA',
                    desc: 'Violenza, minacce, provocazioni, ecc.',
                    imageGrey: "../images/minaccia/grey.svg",
                    checked: false
                },
                {
                    value: 3,
                    title: 'INSULTO',
                    desc: 'Parolacce, riferimenti al sesso, ecc.',
                    imageGrey: "../images/insulto/grey.svg",
                    checked: false
                },
                {
                    value: 4,
                    title: 'RAZZIALE',
                    desc: 'Riferimenti ad etnie, luoghi comuni regionali, ecc.',
                    imageGrey: "../images/razziale/grey.svg",
                    checked: false
                }
            ]
        };
    }

    componentDidMount() {
        this.setIndicators();
    }

    handleKeyboardEvent(keyPressed){
        if(keyPressed==="enter") {
            this.handleClickButton();
        }else{
            this.handleClickItem(parseInt(keyPressed))
        }
    }

    handleClickItem(value) {
        let items  = this.state.items;
        if(!this.props.disable) {
            items.filter((item) => item.value === value).map((item) => item.checked = !item.checked);
            this.setState({items: items})
        }
    }

    disableItems(){
        let items = this.state.items;
        items.forEach((item) => item.checked = false);
        this.setState({items: items})
    }

    setIndicators(){
        let items = this.state.items;
        items.forEach(item => item.checked = this.props.indicators.includes(item.value));
        this.setState({items: items});
    }

    findCheckedItems(items){
        let clickedItems = [];
        items.filter(item => item.checked).map(item => clickedItems.push(item.value));
        return clickedItems;
    }

    async handleClickButton() {
        let items = this.state.items;
        let clickedItems = this.findCheckedItems(items);
        this.props.toggleDisableButton();
        this.disableItems();
        await this.props.handleSubmit(clickedItems).then(() => this.setIndicators());
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
