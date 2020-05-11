import { getCoordinatesInDirection } from '../helpers';
import { SIDE_LENGTH } from 'constant-values';

/**
 * Returns a new set of coordinates within a 2d array based on original coordinates and direction passed in
 * @param {array} coords The coordinates to start from
 * @param {string} direction The direction in which to traverse
 */
function traverseGrid(coords, direction) {
  return getCoordinatesInDirection(coords, direction).map(coord => {
    if (coord < 0) return coord + SIDE_LENGTH;
    return coord % SIDE_LENGTH;
  });
}

export default traverseGrid;
