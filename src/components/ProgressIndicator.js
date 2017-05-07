import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const ProgressIndicator = ({green, yellow, red}) => {
  const total = green + red + yellow;
  return(
    <ProgressBar className="stamp">
      <ProgressBar bsStyle="success" max={total} label={green} now={green} key={1} />
      <ProgressBar bsStyle="warning" max={total} label={yellow} now={yellow} key={2} />
      <ProgressBar bsStyle="danger" max={total} label={red} now={red} key={3} />
    </ProgressBar>
  );
}

export default ProgressIndicator;
