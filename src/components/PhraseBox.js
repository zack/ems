import React from 'react';
import { Panel } from 'react-bootstrap';

import * as Helpers from '../helpers.js';

import WordInput from './WordInput';

const PhraseBox = props => {
  let style;


  if (Helpers.valueMatches(props.phrase) === 2) {
    style = 'success';
  } else if (Helpers.valueMatches(props.phrase) === 1) {
    style = 'warning';
  } else {
    style = 'danger';
  }

  const header = <h2>{props.phrase.desc}</h2>;
  const lines = props.phrase.words.map((word_array, i) => {
    const first_word = word_array[0];
    const letter = first_word[0]
    return <WordInput
      changeHandler={(e) => props.changeHandler(i, e)}
      key={`${props.initials}_${first_word}`}
      letter={letter}
      value={props.phrase.values[i]}
      words={word_array}
    />;
  });

  return(
    <Panel header={header} bsStyle={style} className='phrasebox'>
      {lines}
    </Panel>
  );
}

export default PhraseBox;
