import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import 'bootstrap-css';
import '../styles/App.css';

import * as Helpers from '../helpers.js';

import FAQModal from './FAQModal';
import PhraseBox from './PhraseBox';
import ProgressIndicator from './ProgressIndicator';

class App extends Component {
  constructor() {
    super();
    const phrases = this.addValuesToPhrases(require('../phrases.json').phrases);
    this.state = {
      phrases: phrases,
      showModal: false,
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
    phrases[phrasebox_idx].values[line_idx] = event.target.value.toLowerCase().trim();
    this.setState({
      phrases: phrases,
    });
  }

  handleModalOpen() {
    this.setState({
      showModal: true,
    });
  }

  handleModalClose() {
    this.setState({
      showModal: false,
    });
  }

  getProgressColors(phrases) {
    var red = 0, yellow = 0, green = 0;

    phrases.forEach((phrase) => {
      const match = Helpers.valueMatches(phrase);
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

  getInitials(words) {
    return words.map((word) => { return(word[0]); }).join('');
  }

  render() {
    const phraseboxes = this.state.phrases.map((phrase, i) => {
      const initials = this.getInitials(phrase.words);
      return <PhraseBox
        changeHandler={(line_idx, e) => this.changeHandler(i, line_idx, e)}
        initials={initials}
        key={initials}
        phrase={phrase}
      />;
    });

    const progressColors = this.getProgressColors(this.state.phrases);
    const progressIndicatorOptions = {
      green: progressColors.green,
      yellow: progressColors.yellow,
      red: progressColors.red,
    };
    const masonryOptions = {
      fitWidth: true,
      gutter: 15,
      itemSelector: '.phrasebox',
      stamp: '.stamp',
      transitionDuration: 0,
    };
    const modal = <FAQModal
      show={this.state.showModal}
      onOpen={this.handleModalOpen.bind(this)}
      onClose={this.handleModalClose.bind(this)}
    />;

    return (
      <div className="App">
        <div className="text-center">
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
          <ProgressIndicator
            green={progressIndicatorOptions.green}
            yellow={progressIndicatorOptions.yellow}
            red={progressIndicatorOptions.red}
          />
          {phraseboxes}
        </Masonry>
      </div>
    );
  }
}

export default App;
