import React from 'react';
import WordInput from './WordInput.js';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

describe('<WordInput />', () => {
  it('Reflects the input in its style', () => {
    ['', 't', 'test'].forEach((value) => {
      const component = renderer.create(
        <WordInput word='test' value={value} letter='t' />
      );
      expect(component).toMatchSnapshot();
    });
  });

  it('Calls its changeHandler onChange of the inner FormControl', () => {
    const onChange = jest.fn();
    const component = mount(
      <WordInput word='test' value='' letter='t' changeHandler={onChange} />
    );

    const input = component.find('input').first();
    input.simulate('change');
    expect(onChange).toBeCalled();
  });
});
