export function valueMatches(phrase) {
  // returns 0 for no mwatches, 1 for some match, 2 for full match
  const arr = phrase.words.map((word_array, index) => {
    return word_array.includes(phrase.values[index]);
  });

  if (!arr.includes(false)) {
    return 2;
  } else if (arr.includes(true)) {
    return 1;
  } else {
    return 0;
  }
}
