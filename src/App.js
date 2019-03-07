import React, { Component } from 'react';
import CheckBoxArea from "./components/AbuseArea.jsx"
import './App.css';

class App extends Component {

    constructor(props){
        super(props);
        this.getSentence = this.getSentence.bind(this);
        this.sendSentence = this.sendSentence.bind(this);
    }

    componentDidMount() {
        this.setState( {
            sentenceId: null,
        });
        this.getSentence();
    }

    getSentence(){
        //Cambiare URL per la get request
        fetch('http://localhost:3100/sentence',{
            mode: 'cors',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST',
                'Access-Control-Allow-Headers': 'X-Requested-With'
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                sentenceId: data.id
            });
            document.getElementById("text").innerHTML = data.content;
        })
    }

    sendSentence(array){
        const obj = {
            id: this.state.sentenceId,
            categories:array
        };
        console.log(obj);

        fetch('http://localhost:3100/sentence',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then(response => response.json());

        this.getSentence();
        return obj;
    }

    render() {
        return (
          <div className="container">
              <div className="container-user-context">
                  <div className="user">@Username</div>
                  <div className="show-context">Mostrami il contesto</div>
              </div>
              <div className="container-sentence">
                  <div id="text" className="sentence"/>
              </div>
              <CheckBoxArea sendSentence={this.sendSentence}/>
          </div>
        );
  }
}

export default App;
