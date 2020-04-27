import { count2dArrayOccurrences, generateCoordinates } from '../helpers';

function getValueCoordinates(quota) {
  const coordinatesList = [];
  for (let i = 0; i < quota; i++) {
    let newCoordinates;
    do {
      newCoordinates = generateCoordinates();
    } while (!canUseCoordinates(coordinatesList, newCoordinates));

    coordinatesList.push(newCoordinates);
  }
  return coordinatesList;
}

function canUseCoordinates(array, newCoords) {
  return count2dArrayOccurrences(array, newCoords) === 0;
}

export default getValueCoordinates;
