import React, {Component} from 'react';
import AbuseArea from "./components/AbuseArea.jsx"
import './styles/App.css';
import Sentence from "./model/sentence";

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            sentence : new Sentence(),
            id : null,
            author : "",
            content : "",
            indicators : "",
            disable: false,
        };

        this.updateStateAfterGetSentence = this.updateStateAfterGetSentence.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleDisableButton = this.toggleDisableButton.bind(this);
    }

    componentDidMount() {
        this.state.sentence.getSentence(this.updateStateAfterGetSentence);
    }

    updateStateAfterGetSentence(disable){
        this.setState({
            id : this.state.sentence.getId(),
            author : this.state.sentence.getAuthor(),
            content : this.state.sentence.getContent(),
            indicators : this.state.sentence.getIndicators(),
            disable: disable
        });
    }

    toggleDisableButton(){
        this.setState({
            disable:!this.state.disable
        });
    }

    async handleSubmit(clickedItems) {
        await this.state.sentence.sendSentence(clickedItems);
        return await this.state.sentence.getSentence(this.updateStateAfterGetSentence);
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
              <AbuseArea handleSubmit={this.handleSubmit} disable={this.state.disable}
              indicators = {this.state.indicators} toggleDisableButton={this.toggleDisableButton}
              sentence = {this.state.sentence}/>
          </div>
        );
  }
}

export default App;
