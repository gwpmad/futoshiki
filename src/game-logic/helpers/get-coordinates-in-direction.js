/**
 * Gets the coordinates in a specified direction on a 2d array. Array length is not considered,
 * and negative numbers can be returned
 * @param {array} coordinates An array with the row and column indexes for a 2d array
 * @param {*} direction The direction to return coordinates for
 */
function getCoordinatesInDirection([coord1, coord2], direction) {
  const adjacentCoordsLookup = {
    right: [coord1, coord2 + 1],
    left: [coord1, coord2 - 1],
    above: [coord1 - 1, coord2],
    below: [coord1 + 1, coord2]
  };

  return adjacentCoordsLookup[direction];
}

export default getCoordinatesInDirection;
