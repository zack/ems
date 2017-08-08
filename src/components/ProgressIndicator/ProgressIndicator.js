import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const ProgressIndicator = ({green, yellow, red}) => {
  const total = green + red + yellow;
  const green_string = green ? `${Math.ceil(green/total*100)}%` : '';
  const yellow_string = yellow ? `${Math.ceil(yellow/total*100)}%` : '';

  return(
    <ProgressBar className="stamp">
      <ProgressBar bsStyle="success" max={total} label={green_string} now={green} key={1} />
      <ProgressBar bsStyle="warning" max={total} label={yellow_string} now={yellow} key={2} />
    </ProgressBar>
  );
}

export default ProgressIndicator;
