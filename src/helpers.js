export function matches_regex_in_array(word_array, value) {
  return word_array.reduce((acc, regex) => {
    return acc || new RegExp(regex).test(value);
  }, false)
}

export function valueMatches(phrase) {
  // returns 0 for no matches, 1 for some match, 2 for full match
  const arr = phrase.words.map((word_array, index) => {
    return matches_regex_in_array(word_array, phrase.values[index]);
  });

  if (!arr.includes(false)) {
    return 2;
  } else if (arr.includes(true)) {
    return 1;
  } else {
    return 0;
  }
}
