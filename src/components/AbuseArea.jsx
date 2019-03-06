import React, {Component} from 'react';
import AbuseItem from './AbuseItem.jsx';
import '../styles/AbuseArea.css';


class CheckBoxArea extends Component {

    constructor(props) {
        super(props);
        this.handleDivSelected = this.handleDivSelected.bind(this);
        this.handleDivUnselected = this.handleDivUnselected.bind(this);
        this.sendCategories = this.sendCategories.bind(this);
        //this.uncheckAllDiv = this.uncheckAllDiv.bind(this);

        this.state = {
            checkboxes: [
                {
                    title: 'OSCENO',
                    desc: 'Offese, insulti, attacchi personali, ecc.',
                    imageGrey :  "../images/osceno/grey.svg"
                },
                {
                    title: 'MINACCIA',
                    desc: 'Violenza, minacce, provocazioni, ecc.',
                    imageGrey :  "../images/minaccia/grey.svg"
                },
                {
                    title: 'INSULTO',
                    desc: 'Parolacce, riferimenti al sesso, ecc.',
                    imageGrey :  "../images/insulto/grey.svg"
                },
                {
                    title: 'RAZZIALE',
                    desc: 'Riferimenti ad etnie, luoghi comuni regionali, ecc.',
                    imageGrey :  "../images/razziale/grey.svg"
                }
            ],
            checkBoxClicked: [],
        }


    }

    sendCategories() {
        //this.uncheckAllDiv();
        this.props.sendSentence(this.state.checkBoxClicked);
        this.setState({checkBoxClicked: []});
        return this.state.checkBoxClicked;
    }

    /*
    uncheckAllDiv(){
        for (let i =0;i< this.state.checkboxes.length;i++){
            document.getElementById("checkbox"+i).src = require(this.state.checkboxes[i].imageGrey);
        }
    }
    */

    handleDivSelected(value){
        this.setState(prevState => ({
            checkBoxClicked: [...prevState.checkBoxClicked, value]
        }));
        return this.state.checkBoxClicked
    }

    handleDivUnselected(value){
        const array = [...this.state.checkBoxClicked];
        const index = array.indexOf(value);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({checkBoxClicked: array});
        }
        return this.state.checkBoxClicked
    }

    render() {
        return (
            <div className="container-checkbox-area">
                <div className="checkboxes-container">
                {
                    this.state.checkboxes.map((checkbox, idx) =>
                        <AbuseItem
                            key={idx}
                            title={checkbox.title}
                            id ={"checkbox"+idx}
                            desc={checkbox.desc}
                            value={idx}
                            handleDivSelected={this.handleDivSelected}
                            handleDivUnselected={this.handleDivUnselected}
                        />
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
