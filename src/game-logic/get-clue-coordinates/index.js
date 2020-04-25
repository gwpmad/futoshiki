import { MAX_CLUES, MIN_CLUES } from 'constant-values';

/**
 * Decides upon the grid coordinates where grid values and inequalities should be shown in the final puzzle
 * @param {array} grid A full 5*5 Futoshiki grid
 */
function getClueCoordinates(grid) {
  const { greaterThansQuota, valuesQuota } = getQuotas();

  return {
    greaterThanCoordinates: getListOfCoordinates(greaterThansQuota, okForGThan),
    valueCoordinates: getListOfCoordinates(valuesQuota, okForValue)
  };

  function getQuotas() {
    const cluesQuota = randomIntInclusive(MIN_CLUES, MAX_CLUES);
    const minimumGreaterThans = fourFifths(cluesQuota);
    const greaterThansQuota = randomIntInclusive(
      minimumGreaterThans,
      cluesQuota
    );
    return {
      greaterThansQuota,
      valuesQuota: cluesQuota - greaterThansQuota
    };
  }

  function randomIntInclusive(_min, _max) {
    const min = Math.ceil(_min);
    const max = Math.floor(_max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function fourFifths(number) {
    return number * 0.8;
  }

  function getListOfCoordinates(number, canUseCoordinates) {
    const coordinatesList = [];
    for (let i = 0; i < number; i++) {
      let newCoordinates;
      do {
        newCoordinates = [randomIntInclusive(0, 4), randomIntInclusive(0, 4)];
      } while (!canUseCoordinates(coordinatesList, newCoordinates));

      coordinatesList.push(newCoordinates);
    }
    return coordinatesList;
  }

  function okForValue(array, newCoords) {
    return countOccurrences(array, newCoords) === 0;
  }

  function okForGThan(array, newCoords) {
    return (
      !coordsValueIsOne(newCoords) && countOccurrences(array, newCoords) < 2
    );
  }

  function countOccurrences(array, newCoords) {
    return array.filter(
      coords => coords[0] === newCoords[0] && coords[1] === newCoords[1]
    ).length;
  }

  function coordsValueIsOne(coords) {
    return grid[coords[0]][coords[1]] === 1;
  }
}

export default getClueCoordinates;
