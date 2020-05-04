import {
  count2dArrayOccurrences,
  generateCoordinates,
  getTwoThirds,
  getRandomIntInclusive,
  getValueAtCoordinates,
  getValueInDirection,
  shuffleArray
} from '../helpers';

/**
 * Returns coordinates for blocks where 'greater than' chevrons should be shown, ensuring that the choices of blocks make logical sense
 * @param {array} grid A full 5*5 Futoshiki grid
 * @param {number} number The number of individual coordinates to generate
 */
function getGreaterThanCoordinates(grid, cluesQuota) {
  const quota = getCoordinatesQuota();
  const greaterThanCoordinates = createCoordinatesMap(quota);

  return greaterThanCoordinates;

  function getCoordinatesQuota() {
    return getRandomIntInclusive(cluesQuota / 2, getTwoThirds(cluesQuota));
  }

  function createCoordinatesMap(quota) {
    const map = {
      above: [],
      below: [],
      left: [],
      right: []
    };

    for (let i = 0; i < quota; i++) {
      let newCoordinates;
      let direction;
      do {
        newCoordinates = generateCoordinates();
        direction = getValidDirection(map, newCoordinates);
      } while (!canUseCoordinates(newCoordinates, direction, map));

      map[direction].push(newCoordinates);
    }

    return map;
  }

  function getValidDirection(map, newCoords) {
    const shuffledDirections = shuffleArray(Object.keys(map));

    for (let i = 0; i < shuffledDirections.length; i++) {
      const direction = shuffledDirections[i];
      const valid =
        !coordsAlreadyUsedWithDirection(newCoords, direction, map) &&
        isGreaterThanNeighbour(newCoords, direction);
      if (valid) return direction;
    }
  }

  function coordsAlreadyUsedWithDirection(newCoords, direction, map) {
    const coordOccurrences = count2dArrayOccurrences(map[direction], newCoords);
    return coordOccurrences > 0;
  }

  function isGreaterThanNeighbour(newCoords, direction) {
    const value = getValueAtCoordinates(grid, newCoords);
    const adjacentValue = getValueInDirection(grid, newCoords, direction);
    return Boolean(adjacentValue) && value > adjacentValue;
  }

  function canUseCoordinates(newCoords, direction, map) {
    return Boolean(direction) && !coordinatesUsedMaxTimes(newCoords, map);
  }

  function coordinatesUsedMaxTimes(newCoords, map) {
    const allCoords = getAllCoordinates(map);
    const occurrences = count2dArrayOccurrences(allCoords, newCoords);
    return occurrences === 2;
  }

  function getAllCoordinates(map) {
    return Object.values(map).flat();
  }
}

export default getGreaterThanCoordinates;
