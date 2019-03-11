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
            disable: false
        };
        this.getSentence = this.getSentence.bind(this);
        this.sendSentence = this.sendSentence.bind(this);
    }

    componentDidMount() {
        this.getSentence();
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
                    content: data.content
                });
            }else{
                this.setState({
                    content:"ATTENZIONE! Non ci sono più frasi da moderare.",
                    disable:true
                })
            }
        })
    }

    sendSentence(array){
        const obj = {
            id: this.state.sentenceId,
            moderator: "stringa-fissa@da-cambiare.it",
            categories:array
        };

        fetch('http://localhost:3100/sentence',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(data => {
                if(data.result !== "OK"){
                    console.log("Problem with the server.");
                }
            });


    }

    render() {
        return (
          <div className="container">
              <div className="container-user-context">
                  <div className="user">{this.state.author}</div>
                  <div className="show-context">Mostrami il contesto</div>
              </div>
              <div className="container-sentence">
                  <div id="text" className="sentence">{this.state.content}</div>
              </div>
              <AbuseArea sendSentence={this.sendSentence} disable = {this.state.disable}/>
          </div>
        );
  }
}

export default App;
