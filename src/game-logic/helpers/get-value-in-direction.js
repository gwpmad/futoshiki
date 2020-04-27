import { getValueAtCoordinates } from '.';

function getValueInDirection(grid, [coord1, coord2], direction) {
  const adjacentCoordsLookup = {
    right: [coord1, coord2 + 1],
    left: [coord1, coord2 - 1],
    above: [coord1 - 1, coord2],
    below: [coord1 + 1, coord2]
  };

  const adjacentCoords = adjacentCoordsLookup[direction];
  return getValueAtCoordinates(grid, adjacentCoords);
}

export default getValueInDirection;
