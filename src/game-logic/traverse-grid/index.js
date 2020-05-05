import { SIDE_LENGTH } from 'constant-values';

/**
 * Returns a new set of coordinates within a 2d array based on original coordinates and direction passed in
 * @param {array} coords The coordinates to start from
 * @param {string} direction The direction in which to traverse
 */
function traverseGrid([coord1, coord2], direction) {
  const adjacentCoordsLookup = {
    right: [coord1, coord2 + 1],
    left: [coord1, coord2 - 1],
    above: [coord1 - 1, coord2],
    below: [coord1 + 1, coord2]
  };

  return adjacentCoordsLookup[direction].map(coord => {
    if (coord < 0) return coord + SIDE_LENGTH;
    return coord % SIDE_LENGTH;
  });
}

export default traverseGrid;
