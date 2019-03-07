import React, {Component} from 'react';
import AbuseItem from './AbuseItem.jsx';
import '../styles/AbuseArea.css';


class CheckBoxArea extends Component {

    constructor(props) {
        super(props);
        this.sendCategories = this.sendCategories.bind(this);
        this.handleButtonBehavior = this.handleButtonBehavior.bind(this);
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
            let checkboxes = this.state.items;
            checkboxes.filter((checkbox) => checkbox.value === value).map((checkbox) => checkbox.checked = !checkbox.checked);
            this.setState({items: checkboxes})
        }
    }

    sendCategories() {
        let checkboxes = this.state.items;
        let checkboxClicked = [];

        checkboxes.forEach((checkbox) => {
            if (!checkbox.checked) {
                return
            }

            checkboxClicked.push(checkbox.value)
        });

        this.props.sendSentence(checkboxClicked);

        checkboxes.map((checkbox) => checkbox.checked = false);
        this.setState({items: checkboxes});
        return checkboxes;
    }

    handleButtonBehavior(){
        return this.props.disable? "grey" : "#242EE5";
    }

    render() {
        return (
            <div className="container-checkbox-area">
                <div className="checkboxes-container">
                    {
                        this.state.items.map((checkbox) =>
                            <AbuseItem
                                key={checkbox.value}
                                value={checkbox.value}
                                title={checkbox.title}
                                desc={checkbox.desc}
                                checked={checkbox.checked}
                                onChange={this.onChange}/>
                        )
                    }
                </div>
                <div className="button-container">
                    <button className="send-info-button" disabled ={this.props.disable}
                            style={{backgroundColor: this.handleButtonBehavior()}}
                            onClick={this.sendCategories}>AVANTI
                    </button>
                </div>
            </div>

        )
    }
}

export default CheckBoxArea;
