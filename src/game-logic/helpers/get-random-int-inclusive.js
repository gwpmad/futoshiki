/**
 * Returns a random integer between two numbers, inclusive
 * @param {number} _min
 * @param {number} _max
 */
function getRandomIntInclusive(_min, _max) {
  const min = Math.ceil(_min);
  const max = Math.floor(_max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default getRandomIntInclusive;
