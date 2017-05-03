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
  constructor(props) {
    super(props);
    this.state = {
      values: this.props.word_arrays.map(() => ''),
    }
  }

  changeHandler(index, event) {
    const current_vals = this.state.values;
    let new_vals = current_vals.slice();
    new_vals[index] = event.target.value;

    this.setState((prevState, props) => ({
      values: new_vals,
    }));
  }

  allValuesMatch(values) {
    return this.props.word_arrays.reduce((acc, word_array, index) => {
      return(acc && word_array.includes(values[index]));
    }, true);
  }

  render() {
    const successClass = this.allValuesMatch(this.state.values) ? 'success' : '';

    const lines = this.props.word_arrays.map((word_array, i) => {
      const first_word = word_array[0];
      return <WordLine
        changeHandler={(e) => this.changeHandler(i, e)}
        key={`${this.props.initials}_${first_word}`}
        letter={first_word[0]}
        value={this.state.values[i]}
        words={word_array}
      />;
    });

    return(
      <div className={`phrasograph ${successClass}`}>
        <div className="phrasograph-title">
          {this.props.description}
        </div>
        {lines}
      </div>
    );
  }
}

function WordLine(props) {
  const statusClass = props.words.includes(props.value) ? 'correct' : '';

  return (
    <div className="line">
      <div className="letter uppercase inline-block">
        {props.letter}
      </div>
      <input className={`inline-block ${statusClass}`} onChange={props.changeHandler}></input>
    </div>
  );
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
