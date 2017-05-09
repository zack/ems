export function valueMatches(phrase) {
  // returns 0 for no matches, 1 for some match, 2 for full match
  const arr = phrase.words.map((word, index) => {
    return(new RegExp(word).test(phrase.values[index]));
  });

  if (!arr.includes(false)) {
    return 2;
  } else if (arr.includes(true)) {
    return 1;
  } else {
    return 0;
  }
}
