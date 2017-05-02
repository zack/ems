import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      phrases: require('./phrases.json').phrases,
    }
  };

  render() {
    const phrasographs = this.state.phrases.map((phrase) => {
      return <Phrasograph phrase={phrase}
                          key={getInitials(phrase.words)}
             />;
    });

    return (
      <div className="App">
        {phrasographs}
      </div>
    );
  }
}

class Phrasograph extends Component {
  render() {
    const lines = this.props.phrase.words.map((word) => {
      return <WordLine word={word}
                       key={`${getInitials(this.props.phrase.words)}_${word}`}
        />;
    });

    return(
      <div className="phrasograph">
        <div className="title"> {this.props.phrase.desc} </div>
        {lines}
      </div>
    );
  }
}

class WordLine extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
  }

  changeHandler(e) {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    const statusClass = this.state.value.toLowerCase() === this.props.word ? 'correct' : '';
    console.log(statusClass);

    return(
      <div className="line">
        <div className="letter inline-block"> {this.props.word.slice(0,1).toUpperCase()} </div>
        <input className={`inline-block ${statusClass}`} onChange={this.changeHandler.bind(this)}></input>
      </div>
    );
  }
}

function getInitials(words) {
  return words.map((word) => word.slice(0,1)).join('');
}

export default App;
