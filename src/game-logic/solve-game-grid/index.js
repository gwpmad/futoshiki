import { SIDE_LENGTH } from 'constant-values';
import { getValueAtCoordinates } from 'game-logic';
import { arraysMatch, cloneArray, getValueInDirection } from '../helpers';

const oppositeDirections = [
  ['right', 'left'],
  ['left', 'right'],
  ['above', 'below'],
  ['below', 'above']
];

/**
 * Returns an array of 2d arrays, each a potential solution to the gameGrid passed in
 * @param {array} gameGrid A 2d Futoshiki game grid with value and greater than constraints
 * @param {array} solutions An optional array of solved Futoshiki grids - any solutions included will be considered invalid solutions by the algorithm
 */
function solveGameGrid(gameGrid, solutions = []) {
  if (solutions.length < 15) {
    const solvedGrid = findSolution(gameGrid, solutions);
    if (solvedGrid) {
      solutions.push(solvedGrid);
      return solveGameGrid(gameGrid, solutions);
    }
  }
  return solutions;
}

function findSolution(gameGrid, solutions, coords = [0, 0]) {
  const gridCopy = cloneArray(gameGrid);
  const square = getValueAtCoordinates(gridCopy, coords);
  if (gridIterationComplete(coords)) {
    const numericGrid = getNumericGrid(gridCopy);
    if (solutionAlreadyFound(solutions, numericGrid)) return null;
    return numericGrid;
  }

  if (square.value) {
    return findSolution(gridCopy, solutions, getNextCoordinates(coords));
  }

  const potentialValues = getPotentialValues(gridCopy, coords);
  if (!potentialValues.length) return null;

  for (let potentialValue of potentialValues) {
    const gtClash = checkGreaterThans(potentialValue, gridCopy, coords, square);
    if (gtClash) continue;

    square.value = potentialValue;
    const maybeSolvedGameGrid = findSolution(gridCopy, solutions, coords);
    if (maybeSolvedGameGrid) return maybeSolvedGameGrid;
  }
  return null;
}

function gridIterationComplete(coords) {
  return coords[0] === SIDE_LENGTH;
}

function getNumericGrid(grid) {
  return grid.map(row => row.map(({ value }) => value));
}

function solutionAlreadyFound(solutions, grid) {
  return solutions.some(solution => arraysMatch(grid, solution));
}

function getNextCoordinates([coord1, coord2]) {
  if (coord2 === SIDE_LENGTH - 1) return [coord1 + 1, 0];
  return [coord1, coord2 + 1];
}

function getPotentialValues(grid, coordinates) {
  let potentialValues = getRange(SIDE_LENGTH);
  function removePotentialValue(potentialValue) {
    potentialValues = potentialValues.filter(value => value !== potentialValue);
  }

  // check row
  for (let i = 0; i < SIDE_LENGTH; i++) {
    const square = getValueAtCoordinates(grid, [coordinates[0], i]);
    if (square.value) removePotentialValue(square.value);
  }

  // check column
  for (let i = 0; i < SIDE_LENGTH; i++) {
    const square = getValueAtCoordinates(grid, [i, coordinates[1]]);
    if (square.value) removePotentialValue(square.value);
  }

  if (squareCannotBeFive(grid, coordinates)) removePotentialValue(5);
  if (squareCannotBeOne(grid, coordinates)) removePotentialValue(1);

  return potentialValues;
}

function getRange(length) {
  return [...new Array(length)].map((_, idx) => idx + 1);
}

function squareCannotBeFive(grid, coords) {
  return oppositeDirections.some(([direction, opposite]) => {
    const square = getValueInDirection(grid, coords, direction);
    return square && square.greaterThan.includes(opposite);
  });
}

function squareCannotBeOne(grid, coords) {
  const square = getValueAtCoordinates(grid, coords);
  return Boolean(square.greaterThan.length);
}

function checkGreaterThans(...args) {
  const squareGTClash = checkSquareGreaterThans(...args);
  const surroundingGTClash = checkSurroundingGreaterThans(...args);
  return Boolean(squareGTClash || surroundingGTClash);
}

function checkSquareGreaterThans(potentialValue, gridCopy, coords, square) {
  for (const direction of square.greaterThan) {
    const otherSquare = getValueInDirection(gridCopy, coords, direction);
    if (otherSquare && otherSquare.value > potentialValue) {
      return true;
    }
  }
  return false;
}

function checkSurroundingGreaterThans(potentialValue, gridCopy, coords) {
  for (const [direction, opposite] of oppositeDirections) {
    const otherSquare = getValueInDirection(gridCopy, coords, direction);
    const { value, greaterThan } = otherSquare || {};
    if (value && potentialValue > value && greaterThan.includes(opposite)) {
      return true;
    }
  }
  return false;
}

export default solveGameGrid;
