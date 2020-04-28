import { MIN_CLUES, MAX_CLUES } from 'constant-values';
import { getGreaterThanCoordinates, getValueCoordinates } from 'game-logic';
import { getRandomIntInclusive } from '../helpers';

function getGameGrid(fullGrid) {
  const gameGrid = getEmptyGameGrid(fullGrid);
  addClues(gameGrid, fullGrid);
  return gameGrid;
}

function addClues(gameGrid, fullGrid) {
  const { greaterThanCoordinates, valueCoordinates } = getClues(fullGrid);
  valueCoordinates.forEach(([coord1, coord2]) => {
    gameGrid[coord1][coord2].value = fullGrid[coord1][coord2];
  });
  addGreaterThanClues(gameGrid, greaterThanCoordinates);
  addValueClues(gameGrid, fullGrid, valueCoordinates);
}

function getClues(grid) {
  const cluesQuota = getRandomIntInclusive(MIN_CLUES, MAX_CLUES);
  const greaterThanCoordinates = getGreaterThanCoordinates(grid, cluesQuota);

  const valuesQuota = cluesQuota - countGreaterThans(greaterThanCoordinates);
  const valueCoordinates = getValueCoordinates(valuesQuota);
  return { greaterThanCoordinates, valueCoordinates };
}

function countGreaterThans(map) {
  return Object.values(map).flat().length;
}

function getEmptyGameGrid(fullGrid) {
  return fullGrid.map(row => row.map(() => ({ value: null, greaterThan: [] })));
}

function addGreaterThanClues(gameGrid, greaterThanCoordinates) {
  Object.entries(greaterThanCoordinates).forEach(([direction, coordsList]) => {
    coordsList.forEach(([coord1, coord2]) => {
      gameGrid[coord1][coord2].greaterThan.push(direction);
    });
  });
}

function addValueClues(gameGrid, fullGrid, valueCoordinates) {
  valueCoordinates.forEach(([coord1, coord2]) => {
    gameGrid[coord1][coord2].value = fullGrid[coord1][coord2];
  });
}

export default getGameGrid;
