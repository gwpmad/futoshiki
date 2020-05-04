import { SIDE_LENGTH } from 'constant-values';
import {
  arraysMatch,
  cloneArray,
  getValueAtCoordinates,
  getValueInDirection
} from '../helpers';

const oppositeDirections = [
  ['right', 'left'],
  ['left', 'right'],
  ['above', 'below'],
  ['below', 'above']
];

function solveGameGrid(gameGrid) {
  const solutions = [];
  return collectSolutions(gameGrid, solutions);
}

function collectSolutions(gameGrid, solutions) {
  if (solutions.length < 25) {
    const solvedGrid = findSolution(gameGrid, solutions);
    if (solvedGrid) {
      solutions.push(solvedGrid);
      return collectSolutions(gameGrid, solutions);
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

  // check row
  for (let i = 0; i < SIDE_LENGTH; i++) {
    const square = getValueAtCoordinates(grid, [coordinates[0], i]);
    if (square.value) {
      potentialValues = potentialValues.filter(value => value !== square.value);
    }
  }

  // check column
  for (let i = 0; i < SIDE_LENGTH; i++) {
    const square = getValueAtCoordinates(grid, [i, coordinates[1]]);
    if (square.value) {
      potentialValues = potentialValues.filter(value => value !== square.value);
    }
  }

  if (squareCannotBeFive(grid, coordinates)) {
    potentialValues = potentialValues.filter(value => value !== 5);
  }
  if (squareCannotBeOne(grid, coordinates)) {
    potentialValues = potentialValues.filter(value => value !== 1);
  }

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
