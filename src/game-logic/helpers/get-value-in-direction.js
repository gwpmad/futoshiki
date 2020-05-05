import { getValueAtCoordinates } from 'game-logic';

/**
 * Returns the value in a 2D array one step in a specified direction from the specified coordinates.
 * Returns undefined if the coordinates or those one step away do not exist in the array
 * @param {array} array A 2D array
 * @param {array} coordinates The coordinates to step one index away from
 * @param {string} direction
 */
function getValueInDirection(array, [coord1, coord2], direction) {
  const adjacentCoordsLookup = {
    right: [coord1, coord2 + 1],
    left: [coord1, coord2 - 1],
    above: [coord1 - 1, coord2],
    below: [coord1 + 1, coord2]
  };

  const adjacentCoords = adjacentCoordsLookup[direction];
  return getValueAtCoordinates(array, adjacentCoords);
}

export default getValueInDirection;
