import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import { Button, FormControl, FormGroup, Glyphicon, InputGroup, Modal, Panel, ProgressBar } from 'react-bootstrap';
import 'bootstrap-css';
import './App.css';

class App extends Component {
  constructor() {
    super();
    const phrases = this.addValuesToPhrases(require('./phrases.json').phrases);
    this.state = {
      phrases: phrases,
    }
  };

  addValuesToPhrases(phrases) {
    let phrases_with_values = phrases.slice()
    phrases_with_values.forEach((phrase) =>
      phrase.values = phrase.words.map(() => '')
    )
    phrases_with_values.sort(() => { return 0.5 - Math.random() })
    return phrases_with_values;
  }

  changeHandler(phrasebox_idx, line_idx, event) {
    let phrases = this.state.phrases;
    phrases[phrasebox_idx].values[line_idx] = event.target.value;
    this.setState({
      phrases: phrases,
    });
  }

  getProgressColors(phrases) {
    var red = 0, yellow = 0, green = 0;

    phrases.forEach((phrase) => {
      const match = valueMatches(phrase);
      if (match === 2) {
        green += 1;
      } else if (match === 1) {
        yellow += 1;
      } else {
        red += 1;
      }
    });

    return {
      red: red,
      yellow: yellow,
      green: green,
    };
  }

  render() {
    const phraseboxes = this.state.phrases.map((phrase, i) => {
      const initials = getInitials(phrase.words);
      return <Phrasebox
        changeHandler={(line_idx, e) => this.changeHandler(i, line_idx, e)}
        initials={initials}
        key={initials}
        phrase={phrase}
      />;
    });

    const progressColors = this.getProgressColors(this.state.phrases);
    const progressBarOptions = {
      red: progressColors.red,
      yellow: progressColors.yellow,
      green: progressColors.green,
      total: this.state.phrases.length,
    };
    const masonryOptions = {
      fitWidth: true,
      gutter: 15,
      itemSelector: '.phrasebox',
      stamp: '.stamp',
      transitionDuration: 0,
    };
    const modal = <FAQModal/>;
    const timer = <Timer/>;

    return (
      <div className="App">
        <div className="text-center">
          <div className="timer-container">
            {timer}
          </div>
          <div className="header-container">
            <h1> EMS Acronyms & Initialisms </h1>
            <hr/>
            {modal}
          </div>
          <hr/>
        </div>
        <Masonry
          className={'phrasebox-container'}
          options={masonryOptions}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false}
        >
          {ProgressBars(progressBarOptions)}
          {phraseboxes}
        </Masonry>
      </div>
    );
  }
}

function ProgressBars(props) {
  return(
    <ProgressBar className="stamp">
      <ProgressBar bsStyle="success" max={props.total} label={props.green} now={props.green} key={1} />
      <ProgressBar bsStyle="warning" max={props.total} label={props.yellow} now={props.yellow} key={2} />
      <ProgressBar bsStyle="danger" max={props.total} label={props.red} now={props.red} key={3} />
    </ProgressBar>
  );
}

class Phrasebox extends Component {
  changeHandler(index, event) {
    this.props.changeHandler(index, event);
  }

  render() {
    let style;


    if (valueMatches(this.props.phrase) === 2) {
      style = 'success';
    } else if (valueMatches(this.props.phrase) === 3) {
      style = 'warning';
    } else {
      style = 'danger';
    }

    const header = <h2>{this.props.phrase.desc}</h2>;
    const lines = this.props.phrase.words.map((word_array, i) => {
      const first_word = word_array[0];
      const letter = first_word[0]
      return <WordLine
        changeHandler={(e) => this.changeHandler(i, e)}
        key={`${this.props.initials}_${first_word}`}
        letter={letter}
        value={this.props.phrase.values[i]}
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

class FAQModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  close() {
    this.setState({
      show: false
    });
  }

  open() {
    this.setState({
      show: true
    });
  }

  render() {
    return (
      <div>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open.bind(this)}
        >
          Questions & Answers
        </Button>

        <Modal show={this.state.show} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <h3> Questions & Answers </h3>
          </Modal.Header>

          <Modal.Body>
            <h4> What do I do? </h4>
            <p>
              Type the words into the input boxes that correspond with the
              letter for the specified initialism or acronym.
            </p>

            <h4> What if there are multiple answers? </h4>
            <p>
              For letters that stand for multiple words (like "P" in OPQRST),
              you should type in both words, separated by a space, in any order.
              Others, like "P" in "DCAPBLSTIC," where the answers are synonyms,
              will turn green when either word is entered.
            </p>

            <h4> What if the answer is multiple words long? </h4>
            <p>
              I did my best to use the most reasonable combination of words,
              which usually means I just took it directly out of the notes or
              off of the slides, but I also tried to include reasonable
              alternatives. "Prior medical history," "Pertinent medical
              history," etc.
            </p>

            <h4> What about something like the five Ps?</h4>
            <p>
              Every input box will turn green for any correct "P" word. It will
              turn green if you enter "pain" five times. Just... pick five
              different words. :)
            </p>

            <h4>
              Code?
            </h4>
            <p>
              <a href="https://github.com/zack/ems" target="_blank"> Yep! </a>
            </p>

            <h4>
              What's an initialism?
            </h4>
            <p>
              Another word for an acronym that isn't pronounced as a word, like
              "CHF" or "ABC."
            </p>

            <h4>
              What if I have questions, concerns, suggestions, or comments?
            </h4>
            <p>
              Drop me a line; I'd love to hear from you! I can be reached at
              <a href="mailto:zack@youngren.io"> zack@youngren.io </a>.
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close.bind(this)}> Close this thing </Button>
          </Modal.Footer>
        </Modal>
      </div>
);
}
}

function getInitials(words) {
  return words.map((word_array) => word_array[0][0]).join('');
}

// returns 0 for no mwatches, 1 for some match, 2 for full match
function valueMatches(phrase) {
  const arr = phrase.words.map((word_array, index) => {
    return word_array.includes(phrase.values[index]);
  });

  if (!arr.includes(false)) {
    return 2;
  } else if (arr.includes(true)) {
    return 1;
  } else {
    return 0;
  }
}

export default App;
