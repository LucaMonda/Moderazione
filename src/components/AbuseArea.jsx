import React, {Component} from 'react';
import AbuseItem from './AbuseItem.jsx';
import '../styles/AbuseArea.css';
import KeyboardEventHandler from 'react-keyboard-event-handler';


class AbuseArea extends Component {

    constructor(props) {
        super(props);
        this.sendCategories = this.sendCategories.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            items: [
                {
                    value: 0,
                    title: 'OSCENO',
                    desc: 'Offese, insulti, attacchi personali, ecc.',
                    imageGrey: "../images/osceno/grey.svg",
                    checked: false
                },
                {
                    value: 1,
                    title: 'MINACCIA',
                    desc: 'Violenza, minacce, provocazioni, ecc.',
                    imageGrey: "../images/minaccia/grey.svg",
                    checked: false
                },
                {
                    value: 2,
                    title: 'INSULTO',
                    desc: 'Parolacce, riferimenti al sesso, ecc.',
                    imageGrey: "../images/insulto/grey.svg",
                    checked: false
                },
                {
                    value: 3,
                    title: 'RAZZIALE',
                    desc: 'Riferimenti ad etnie, luoghi comuni regionali, ecc.',
                    imageGrey: "../images/razziale/grey.svg",
                    checked: false
                }
            ],
        }
    }

    onChange(value) {
        if(this.props.disable === false) {
            let array = this.state.items;
            array.filter((item) => item.value === value).map((item) => item.checked = !item.checked);
            this.setState({items: array})
        }
    }

    sendCategories() {
        this.props.changeDisable();
        let array = this.state.items;
        let arrayClicked = [];
        array.forEach((item) => {
            if (item.checked){
                arrayClicked.push(item.value)
            }
        });
        this.props.sendSentence(arrayClicked);
        array.map((item) => item.checked = false);
        this.setState({items: array});
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
                                onChange={this.onChange}/>
                        )
                    }
                </div>
                <KeyboardEventHandler
                    handleKeys={['1', '2', '3', '4', "enter"]}
                    onKeyEvent={(key) => {
                        if(key==="enter") {
                            this.sendCategories();
                        }else{
                            this.onChange(key - 1)
                        }
                    }}
                    isDisabled={this.props.disable}
                    />
                <div className="button-container">
                    <button className="send-info-button" disabled ={this.props.disable}
                            style={{backgroundColor: this.props.disable? "grey" : "#242EE5"}}
                            onClick={this.sendCategories}>AVANTI
                    </button>
                </div>
            </div>

        )
    }
}

export default AbuseArea;
