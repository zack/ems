import React from 'react';
import { FormControl, FormGroup, InputGroup } from 'react-bootstrap';

var getValidationState = (word, value) => {
  if (new RegExp(word).test(value)) {
    return('success');
  } else if (value) {
    return('warning');
  } else {
    return(null);
  }
}

const WordInput = ({word, value, letter, changeHandler}) => {
  return (
    <FormGroup validationState={getValidationState(word, value)}>
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
