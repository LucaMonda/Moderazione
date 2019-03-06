import React, {Component} from 'react';
import AbuseItem from './AbuseItem.jsx';
import '../styles/AbuseArea.css';


class CheckBoxArea extends Component {

    constructor(props) {
        super(props);
        this.sendCategories = this.sendCategories.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            checkboxes: [
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
        let checkboxes = this.state.checkboxes;
        checkboxes.filter((checkbox) => checkbox.value === value).map((checkbox) => checkbox.checked = !checkbox.checked)
        this.setState({checkboxes: checkboxes})
    }

    sendCategories() {
        let checkboxes = this.state.checkboxes;
        let checkboxClicked = [];

        checkboxes.forEach((checkbox) => {
            if (!checkbox.checked) {
                return
            }

            checkboxClicked.push(checkbox.value)
        });

        this.props.sendSentence(checkboxClicked);


        checkboxes.map((checkbox) => checkbox.checked = false)
        this.setState({checkboxes: checkboxes})
    }

    render() {
        return (
            <div className="container-checkbox-area">
                <div className="checkboxes-container">
                    {
                        this.state.checkboxes.map((checkbox) =>
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
                    <button className="send-info-button"
                            onClick={this.sendCategories}>AVANTI
                    </button>
                </div>
            </div>

        )
    }
}

export default CheckBoxArea;
