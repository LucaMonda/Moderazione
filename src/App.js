import React, { Component } from 'react';
import AbuseArea from "./components/AbuseArea.jsx"
import './styles/App.css';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            sentenceId: null,
            author: "",
            content: "",
            indicators: "",
            disable: false,
            filledIndicators : false

        };
        this.getSentence = this.getSentence.bind(this);
        this.sendSentence = this.sendSentence.bind(this);
        this.changeDisable = this.changeDisable.bind(this);
        this.sentenceTransition = this.sentenceTransition.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getSentence();
    }

    changeDisable(){
        this.setState({
            disable : !this.state.disable
        });
        return this.state.disable;
    }

    sentenceTransition(color){
        let sentence = document.getElementById('text');
        sentence.style.backgroundColor = color;
        setTimeout(function() {
            sentence.style.backgroundColor = 'white';
        }, 600);
        return sentence;
    }

    getSentence(){
        fetch('http://localhost:3100/sentence',{
            mode: 'cors',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.length !== 0) {
                this.setState({
                    sentenceId: data.id,
                    author: data.author,
                    content: data.content,
                    indicators : data.indicators,
                });
                this.sentenceTransition("rgba(135,206,235, 0.3)");
            }else{
                this.setState({
                    content:"ATTENZIONE! Non ci sono più frasi da moderare.",
                    disable:true,
                    indicators : []
                });
                this.sentenceTransition("rgba(255,0,0, 0.3)");
            }
        })
    }

    handleSubmit(array) {
        this.sendSentence(array);
        this.getSentence(array);
    }

    sendSentence(array) {
        const obj = {
            id: this.state.sentenceId,
            moderator: "stringa-fissa@da-cambiare.it",
            categories: array
        };

        fetch('http://localhost:8000/sentence',{
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            if(data.result !== "OK"){
                console.log("Problem with the server.");
            }
        });
        return obj;
    }

    render() {
        if (!this.state.indicators) {
            return null
        }

        return (
          <div className="container">
              <div className="container-user-context">
                  <div className="user">{this.state.author}</div>
              </div>
              <div className="container-sentence">
                  <div id="text" className="sentence">{this.state.content}</div>
              </div>
              <AbuseArea handleSubmit={this.handleSubmit} disable={this.state.disable} changeDisable={this.changeDisable}
              indicators = {this.state.indicators}/>
          </div>
        );
  }
}

export default App;
