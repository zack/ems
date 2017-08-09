const helpers = require('./helpers.js');

describe('valueMatches', () => {
  let values = ['one', 'two'];

  it('Returns 0 for no values', () => {
    const phrase = {
      values: values,
      words: [null, null],
    };

    expect(helpers.valueMatches(phrase)).toEqual(0);
  });

  it('Returns 0 for no matches', () => {
    const phrase = {
      values: values,
      words: ['x', 'x'],
    };

    expect(helpers.valueMatches(phrase)).toEqual(0);
  });

  it('Returns 1 for some matches', () => {
    const phrase = {
      values: values,
      words: ['one', 'x'],
    };

    expect(helpers.valueMatches(phrase)).toEqual(1);
  });

  it('Returns 2 for all matches', () => {
    const phrase = {
      values: values,
      words: ['one', 'two'],
    };

    expect(helpers.valueMatches(phrase)).toEqual(2);
  });
});
