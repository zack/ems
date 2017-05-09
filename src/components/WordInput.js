import React from 'react';
import { FormControl, FormGroup, InputGroup } from 'react-bootstrap';

import * as Helpers from '../helpers.js';

const WordInput = ({word, value, letter, changeHandler}) => {
  let validationState;

  if (new RegExp(word).test(value)) {
    validationState = 'success';
  } else if (value) {
    validationState = 'warning';
  } else {
    validationState = 'error';
  }

  return (
    <FormGroup validationState={validationState}>
      <InputGroup>
        <InputGroup.Addon>
          <strong>{letter.toUpperCase()}</strong>
        </InputGroup.Addon>
        <FormControl type="text" onChange={changeHandler}/>
      </InputGroup>
    </FormGroup>
  );
}

export default WordInput;
