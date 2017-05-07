import React from 'react';
import { FormControl, FormGroup, InputGroup } from 'react-bootstrap';

const WordInput = ({words, value, letter, changeHandler}) => {
  let validationState;

  if (words.includes(value)) {
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
