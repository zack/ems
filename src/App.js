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
      const initials = getInitials(phrase.words);
      return <Phrasograph
        description={phrase.desc}
        initials={initials}
        key={initials}
        word_arrays={phrase.words}
      />;
    });

    const clock = <Clock />;

    return (
      <div className="App">
        <div className="text-center">
          <h1> EMS Acronyms & Initialisms </h1>
        </div>
        {clock}
        {phrasographs}
      </div>
    );
  }
}

class Phrasograph extends Component {
  render() {
    const lines = this.props.word_arrays.map((word_array) => {
      const first_word = word_array[0];
      return <WordLine
        words={word_array}
        letter={first_word[0]}
        key={`${this.props.initials}_${first_word}`}
      />;
    });

    return(
      <div className="phrasograph">
        <div className="phrasograph-title">
          {this.props.description}
        </div>
        {lines}
      </div>
    );
  }
}

class WordLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  changeHandler(e) {
    this.setState({
      value: e.target.value,
    });
  }

  getStatusClass(value) {
    return this.props.words.includes(value) ? 'correct' : '';
  }

  render() {
    const statusClass = this.getStatusClass(this.state.value.toLowerCase());

    return(
      <div className="line">
        <div className="letter uppercase inline-block">
          {this.props.letter}
        </div>
        <input className={`inline-block ${statusClass}`} onChange={this.changeHandler.bind(this)}></input>
      </div>
    );
  }
}

class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      hidden: false,
      running: true,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      this.tick.bind(this),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  pauseTimer() {
    this.setState({
      running: false,
    });
  }

  resetTimer() {
    this.setState({
      counter: 0,
    });
  }

  startTimer() {
    this.setState({
      running: true,
    });
  }

  toggleTimerDisplay() {
    this.setState((prevState, props) => ({
      hidden: !prevState.hidden,
    }));
  }

  tick() {
    if(this.state.running) {
      this.setState((prevState, props) => ({
        counter: prevState.counter + 1,
      }));
    }
  }

  render() {
    const seconds = ('00' + this.state.counter % 60).slice(-2);
    const minutes = ('00' + Math.floor(this.state.counter / 60)).slice(-2);
    const timerBgClass = this.state.running ? 'running' : 'stopped';
    const timerDispClass = this.state.hidden ? 'hidden' : '';
    const timerDispText = this.state.hidden ? 'Show' : 'Hide';

    return(
      <div className="text-center">
        <div className="block">
          <div className={`timer ${timerBgClass} ${timerDispClass}`}>
            {`${minutes}:${seconds}`}
          </div>
        </div>
        <div className="block">
          <div className="block">
            <button onClick={this.pauseTimer.bind(this)}> Pause </button>
            <button onClick={this.resetTimer.bind(this)}> Reset </button>
            <button onClick={this.startTimer.bind(this)}> Start </button>
          </div>
          <div className="block">
            <button onClick={this.toggleTimerDisplay.bind(this)}>
              {timerDispText} Timer
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function getInitials(words) {
  return words.map((word_array) => word_array[0][0]).join('');
}

export default App;
