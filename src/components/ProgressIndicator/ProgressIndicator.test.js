import React from 'react';
import ProgressIndicator from './ProgressIndicator.js';
import renderer from 'react-test-renderer';

describe('<ProgressIndicator />', () => {
  it('Reflects the green, yellow, and red bars', () => {
    [[0,0,0], [0,0,1], [0,1,0], [0,1,1], [1,0,0], [1,0,1], [1,1,0], [1,1,1]]
    .forEach((numbers) => {
      const [green, yellow, red] = numbers;
      const component = renderer.create(
        <ProgressIndicator green={green} yellow={yellow} red={red} />
      );
      expect(component).toMatchSnapshot();
    });
  });
});
