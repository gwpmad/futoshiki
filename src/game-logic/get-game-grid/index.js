import { INITIAL_MIN_CLUES } from 'constant-values';
import {
  getGreaterThanCoordinates,
  getValueCoordinates,
  solveGameGrid
} from 'game-logic';
import { getRandomIntInclusive } from '../helpers';

function getGameGrid(fullGrid, minClues = INITIAL_MIN_CLUES) {
  let gameGrid;
  do {
    const cluesQuota = getRandomIntInclusive(minClues, minClues + 2);
    gameGrid = getEmptyGameGrid(fullGrid);
    addClues(gameGrid, fullGrid, cluesQuota);
    minClues++;
  } while (noUniqueSolution(gameGrid));
  return gameGrid;
}

function getEmptyGameGrid(fullGrid) {
  return fullGrid.map(row => row.map(() => ({ value: null, greaterThan: [] })));
}

function addClues(gameGrid, fullGrid, cluesQuota) {
  const { greaterThanCoordinates, valueCoordinates } = getClues(
    fullGrid,
    cluesQuota
  );
  valueCoordinates.forEach(([coord1, coord2]) => {
    gameGrid[coord1][coord2].value = fullGrid[coord1][coord2];
  });
  addGreaterThanClues(gameGrid, greaterThanCoordinates);
  addValueClues(gameGrid, fullGrid, valueCoordinates);
}

function getClues(grid, cluesQuota) {
  const greaterThanCoordinates = getGreaterThanCoordinates(grid, cluesQuota);

  const valuesQuota = cluesQuota - countGreaterThans(greaterThanCoordinates);
  const valueCoordinates = getValueCoordinates(valuesQuota);
  return { greaterThanCoordinates, valueCoordinates };
}

function countGreaterThans(map) {
  return Object.values(map).flat().length;
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

function noUniqueSolution(gameGrid) {
  const solutions = solveGameGrid(gameGrid);
  return solutions.length > 1;
}

export default getGameGrid;
