import React, {Component} from 'react';
import CheckBoxAbuse from './CheckBoxAbuse.jsx';

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
                    desc: 'parolacce, insulti, offese'
                },
                {
                    title: 'Minaccia',
                    desc: 'minacce contro qualcuno'
                },
                {
                    title: 'Odio Raziale',
                    desc: 'razzismo nei confronti di altri'
                },
                {
                    title: 'Altro',
                    desc: 'altri tipi di offese'
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
                        <CheckBoxAbuse key={idx} icon={null} title={checkbox.title} id ={"checkbox"+idx} desc={checkbox.desc} value={idx}
                                       handleCheckBoxSelected={this.handleCheckBoxSelected} handleCheckBoxUnselected={this.handleCheckBoxUnselected}/>
                    )
                }
                <button className="send-categories"
                        onClick={this.sendCategories}>Send
                </button>
            </div>
        )
    }
}

export default CheckBoxArea;
