import {
  count2dArrayOccurrences,
  generateCoordinates,
  getCoordinatesInDirection
} from '../helpers';

function createValueCoordinates(quota, greaterThanCoordinates) {
  const greaterThanPairs = getGreaterThanPairs(greaterThanCoordinates);

  const coordinatesList = [];
  for (let i = 0; i < quota; i++) {
    let newCoordinates;
    do {
      newCoordinates = generateCoordinates();
    } while (!canUseCoordinates(newCoordinates));

    coordinatesList.push(newCoordinates);
  }
  return coordinatesList;

  function getGreaterThanPairs(greaterThanCoordinates) {
    return Object.entries(greaterThanCoordinates).reduce(
      (pairs, [direction, greaterThans]) => {
        const directionPairs = greaterThans.map(gtCoords => [
          gtCoords,
          getCoordinatesInDirection(gtCoords, direction)
        ]);
        return [...pairs, ...directionPairs];
      },
      []
    );
  }

  function canUseCoordinates(newCoords) {
    const alreadyUsed = count2dArrayOccurrences(coordinatesList, newCoords) > 0;
    if (alreadyUsed) return false;
    return !negatesGTClue(newCoords);
  }

  function negatesGTClue(newCoords) {
    return greaterThanPairs.some(pair => {
      const pairWithoutNewCoords = pair.filter(
        coords => coords[0] !== newCoords[0] || coords[1] !== newCoords[1]
      );
      if (pairWithoutNewCoords.length > 1) return false;

      const [otherCoords] = pairWithoutNewCoords;
      return count2dArrayOccurrences(coordinatesList, otherCoords) > 0;
    });
  }
}

export default createValueCoordinates;
