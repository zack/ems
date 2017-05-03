import React, { Component } from 'react';
import { Button, FormControl, FormGroup, Glyphicon, InputGroup, Panel } from 'react-bootstrap';
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
    const style = this.allValuesMatch(this.state.values) ? 'success' : 'info';
    const header = <h2>{this.props.description}</h2>;
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
      <Panel header={header} bsStyle={style} className='phrasograph'>
        {lines}
      </Panel>
    );
  }
}

function WordLine(props) {
  const validationState = props.words.includes(props.value) ? 'success' : '';

  return (
    <FormGroup validationState={validationState}>
      <InputGroup>
        <InputGroup.Addon>{props.letter.toUpperCase()}</InputGroup.Addon>
        <FormControl type="text" onChange={props.changeHandler}/>
      </InputGroup>
    </FormGroup>
  );
}

class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      visible: true,
      running: false,
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
      running: false,
    });
  }

  startTimer() {
    this.setState({
      running: true,
    });
  }

  toggleTimerDisplay() {
    this.setState((prevState, props) => ({
      visible: !prevState.visible,
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
    const timerDispClass = this.state.visible ? 'visible' : 'secret';
    const timerDisplayIcon = this.state.visible ? 'eye-close' : 'eye-open';

    return(
      <div className="text-center">
        <div className="block">
          <div className={`timer ${timerBgClass} ${timerDispClass}`}>
            {`${minutes}:${seconds}`}
          </div>
        </div>
        <div className="block timer-controls">
          <div className="block">
            <Button bsStyle="danger" bsSize="small" onClick={this.resetTimer.bind(this)}>
              <Glyphicon glyph="stop" />
            </Button>
            <Button bsStyle="warning" bsSize="small" onClick={this.pauseTimer.bind(this)}>
              <Glyphicon glyph="pause" />
            </Button>
            <Button bsStyle="success" bsSize="small" onClick={this.startTimer.bind(this)}>
              <Glyphicon glyph="play" />
            </Button>
            <Button bsStyle="primary" bsSize="small" onClick={this.toggleTimerDisplay.bind(this)}>
              <Glyphicon glyph={timerDisplayIcon} />
            </Button>
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
