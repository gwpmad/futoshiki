import { getRandomIntInclusive } from '.';

/**
 * Generates a set of coordinates in array form
 */
function generateCoordinates() {
  return [getRandomIntInclusive(0, 4), getRandomIntInclusive(0, 4)];
}

export default generateCoordinates;
