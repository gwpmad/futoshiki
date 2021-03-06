import { INITIAL_MIN_CLUES } from 'constant-values';
import {
  createGreaterThanCoordinates,
  createValueCoordinates,
  solveGameGrid
} from 'game-logic';
import { getRandomIntInclusive } from '../helpers';

function getGameGrid(fullGrid, minClues = INITIAL_MIN_CLUES) {
  let gameGrid;
  do {
    const cluesQuota = getRandomIntInclusive(minClues, minClues + 2);
    gameGrid = getEmptyGameGrid(fullGrid);
    decorateBlocks(gameGrid, fullGrid, cluesQuota);
    minClues++;
  } while (noUniqueSolution(gameGrid));
  return gameGrid;
}

function getEmptyGameGrid(fullGrid) {
  return fullGrid.map(row => row.map(() => ({ greaterThan: [] })));
}

function decorateBlocks(gameGrid, fullGrid, cluesQuota) {
  const clues = getClues(fullGrid, cluesQuota);
  addGreaterThanClues(gameGrid, clues.greaterThanCoordinates);
  addValueClues(gameGrid, fullGrid, clues.valueCoordinates);
  addPropertiesToEmptyBlocks(gameGrid);
}

function getClues(grid, cluesQuota) {
  const greaterThanCoordinates = createGreaterThanCoordinates(grid, cluesQuota);

  const valuesQuota = cluesQuota - countGreaterThans(greaterThanCoordinates);
  const valueCoordinates = createValueCoordinates(
    valuesQuota,
    greaterThanCoordinates
  );
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

function addPropertiesToEmptyBlocks(gameGrid) {
  gameGrid.forEach(row =>
    row.forEach(block => {
      if (!block.value) {
        block.enteredValue = null;
        block.notes = [];
      }
    })
  );
}

function noUniqueSolution(gameGrid) {
  const solutions = solveGameGrid(gameGrid);
  return solutions.length !== 1;
}

export default getGameGrid;
