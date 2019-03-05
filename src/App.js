import React, { Component } from 'react';
import CheckBoxArea from "./components/CheckBoxArea.jsx"
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
        fetch(`./sentence.json`,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
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
        }
        console.log(obj);

        //POST REQUEST
        /*
        fetch("",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then(response => response.json());
        */

        this.getSentence();
    }

    render() {
        return (
          <div className="container">
              <div className="container-user-context">
                  <p className="username-name">@Username</p>
              </div>
              <p id="text" className="sentence-text">Se parli così è perchè non capisci un cazzo come tutti i napoletani!</p>
                  <CheckBoxArea sendSentence={this.sendSentence}/>
          </div>
        );
  }
}

export default App;
