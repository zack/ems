import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

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

export default Timer;
