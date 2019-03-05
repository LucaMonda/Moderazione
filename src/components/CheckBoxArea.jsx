import React, {Component} from 'react';
import CheckBoxAbuse from './CheckBoxAbuse.jsx';
import '../styles/CheckBoxArea.css';

class CheckBoxArea extends Component {

    constructor(props) {
        super(props)
        this.handleCheckBoxSelected = this.handleCheckBoxSelected.bind(this);
        this.handleCheckBoxUnselected = this.handleCheckBoxUnselected.bind(this);
        this.sendCategories = this.sendCategories.bind(this);

        this.state = {
            checkboxes: [
                {
                    title: 'Insulto',
                    desc: 'Parolacce, riferimenti al sesso, ecc.',
                    icon: "/src/images/icons/insulto/grey.svg"
                },
                {
                    title: 'Minaccia',
                    desc: 'Violenza, minacce, provocazioni, ecc.',
                    icon: "/src/images/icons/minaccia/grey.svg"
                },
                {
                    title: 'Osceno',
                    desc: 'Offese, insulti, attacchi personali, ecc.',
                    icon: "/src/images/icons/osceno/grey.svg"
                },
                {
                    title: 'Odio Raziale',
                    desc: 'Riferimenti ad etnie, luoghi comuni regionali, ecc.',
                    icon: "/src/images/icons/raziale/grey.svg"

                }
            ],
            checkBoxClicked: [],

        }
    }

    sendCategories() {
        for (let i =0;i< this.state.checkboxes.length;i++){
            document.getElementById("checkbox"+i).checked = false;
        }
        this.props.sendSentence(this.state.checkBoxClicked);
        this.setState({checkBoxClicked: []});
    }

    handleCheckBoxSelected(id){
        this.setState(prevState => ({
            checkBoxClicked: [...prevState.checkBoxClicked, id]
        }))

    }

    handleCheckBoxUnselected(id){
        const array = [...this.state.checkBoxClicked];
        const index = array.indexOf(id);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({checkBoxClicked: array});
        }
    }

    render() {
        return (
            <div className="checkbox-area">
                {
                    this.state.checkboxes.map((checkbox, idx) =>
                        <CheckBoxAbuse key={idx} icon={checkbox.icon} title={checkbox.title} id ={"checkbox"+idx} desc={checkbox.desc} value={idx}
                                       handleCheckBoxSelected={this.handleCheckBoxSelected} handleCheckBoxUnselected={this.handleCheckBoxUnselected}/>
                    )
                }
                <button className="send-categories"
                        onClick={this.sendCategories}>AVANTI
                </button>
            </div>
        )
    }
}

export default CheckBoxArea;
