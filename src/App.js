import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import { Button, FormControl, FormGroup, Glyphicon, InputGroup, PageHeader, Panel } from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      phrases: require('./phrases.json').phrases,
    }
  };

  render() {
    // Array.sort modifies argument. Ew.
    let temp_phrases = this.state.phrases.slice();
    const random_phrases = temp_phrases.sort(() => { return 0.5 - Math.random() });

    const phraseboxes = random_phrases.map((phrase) => {
      const initials = getInitials(phrase.words);
      return <Phrasebox
        description={phrase.desc}
        initials={initials}
        key={initials}
        word_arrays={phrase.words}
      />;
    });

    const timer = <Timer />;
    const masonryOptions = {
      fitWidth: true,
      gutter: 15,
      itemSelector: '.phrasebox',
      transitionDuration: 0,
    };

    return (
      <div className="App">
        <div className="text-center">
          <div className="timer-container">
            {timer}
          </div>
          <div className="header-container">
            <h1> EMS Acronyms & Initialisms </h1>
            <h1><small>
                Some words are split up into two. As an example, for
                supraventricular tachycardia, as SVT, you might expect to enter
                "supra," "ventricular," "tachycardia." Some answers require two
                words, in this case the words can be entered in either order
                and no punctuation is necessary. Please direct mistakes,
                suggestions, and comments to zack@youngren.io.
                <a href="https://github.com/zack/ems"> Code here. </a>
            </small></h1>
          </div>
          <hr/>
        </div>
        <div className="phrasebox-container">
          <Masonry
            className={'my-gallery-class'} // default ''
            options={masonryOptions}
            disableImagesLoaded={false} // default false
            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
          >
            {phraseboxes}
          </Masonry>
        </div>
      </div>
    );
  }
}

class Phrasebox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: this.props.word_arrays.map(() => ''),
    }
  }

  changeHandler(index, event) {
    let new_vals = this.state.values.slice();
    new_vals[index] = event.target.value.trim().toLowerCase();

    this.setState((prevState, props) => ({
      values: new_vals,
    }));
  }

  someValuesMatch(values) {
    return this.props.word_arrays.reduce((acc, word_array, index) => {
      return(acc || word_array.includes(values[index]));
    }, false);
  }

  allValuesMatch(values) {
    return this.props.word_arrays.reduce((acc, word_array, index) => {
      return(acc && word_array.includes(values[index]));
    }, true);
  }

  render() {
    let style;

    if (this.allValuesMatch(this.state.values)) {
      style = 'success';
    } else if (this.someValuesMatch(this.state.values)) {
      style = 'warning';
    } else {
      style = 'danger';
    }

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
      <Panel header={header} bsStyle={style} className='phrasebox'>
        {lines}
      </Panel>
    );
  }
}

function WordLine(props) {
  let validationState;

  if (props.words.includes(props.value)) {
    validationState = 'success';
  } else if (props.value) {
    validationState = 'warning';
  } else {
    validationState = 'error';
  }

  return (
    <FormGroup validationState={validationState}>
      <InputGroup>
        <InputGroup.Addon>
          <strong>{props.letter.toUpperCase()}</strong>
        </InputGroup.Addon>
        <FormControl type="text" onChange={props.changeHandler}/>
      </InputGroup>
    </FormGroup>
  );
}

class Timer extends Component {
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

    let toggleButton;

    if (this.state.running) {
      toggleButton =
        <Button bsStyle="warning" bsSize="small" onClick={this.pauseTimer.bind(this)}>
          <Glyphicon glyph="pause" />
        </Button>
    } else {
      toggleButton =
        <Button bsStyle="success" bsSize="small" onClick={this.startTimer.bind(this)}>
          <Glyphicon glyph="play" />
        </Button>
    }

    return(
      <div>
        <div className={`inline-block timer ${timerBgClass} ${timerDispClass}`}>
          <span>{`${minutes}:${seconds}`}</span>
        </div>
        <div className="inline-block controls">
          <Button bsStyle="primary" bsSize="small" onClick={this.toggleTimerDisplay.bind(this)}>
            <Glyphicon glyph={timerDisplayIcon} />
          </Button>
          {toggleButton}
          <Button bsStyle="danger" bsSize="small" onClick={this.resetTimer.bind(this)}>
            <Glyphicon className="flip-h" glyph="repeat" />
          </Button>
        </div>
      </div>
    );
  }
}

function getInitials(words) {
  return words.map((word_array) => word_array[0][0]).join('');
}

export default App;
