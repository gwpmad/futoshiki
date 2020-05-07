import { SIDE_LENGTH } from 'constant-values';
import { getRandomIntInclusive } from '.';

/**
 * Generates a set of coordinates in array form
 */
function generateCoordinates() {
  return [
    getRandomIntInclusive(0, SIDE_LENGTH - 1),
    getRandomIntInclusive(0, SIDE_LENGTH - 1)
  ];
}

export default generateCoordinates;
