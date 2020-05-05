import getGameGrid from '.';
import { getValueAtCoordinates, solveGameGrid } from 'game-logic';

const fullGrid = [
  [1, 3, 5, 4, 2],
  [3, 5, 2, 1, 4],
  [2, 4, 1, 5, 3],
  [4, 1, 3, 2, 5],
  [5, 2, 4, 3, 1]
];

// Use for most of the tests so that they run quicker, real game has a lower minimum
const initialMinClues = 13;

describe('getGameGrid', () => {
  it('should return a game grid the same size as the grid passed in', () => {
    const gameGrid = getGameGrid(fullGrid, initialMinClues);
    expect(gameGrid).toHaveLength(5);
    expect(gameGrid[0]).toHaveLength(5);
  });

  it('should return a game grid of objects', () => {
    const gameGrid = getGameGrid(fullGrid, initialMinClues);
    gameGrid.flat().forEach(block => {
      expect(typeof block).toEqual('object');
    });
  });

  it('should return a minimum of the "minimum" clues passed in ("value" and "greaterThan" together)', () => {
    const gameGrid = getGameGrid(fullGrid, initialMinClues);
    const count = countClues(gameGrid);
    expect(count).toBeGreaterThanOrEqual(initialMinClues);
  });

  it('should return a random number of clues, within the stated bounds', () => {
    const counts = [...new Array(5)]
      .map(() => getGameGrid(fullGrid, initialMinClues))
      .map(countClues);
    const countsAllEqual = counts.every(count => count === counts[0]);
    expect(countsAllEqual).toBeFalsy();
  });

  it('should have an empty array for all blocks without "greater than" clues', () => {
    const gameGrid = getGameGrid(fullGrid, initialMinClues);
    const allAreArrays = gameGrid
      .flat()
      .filter(({ greaterThan }) => !greaterThan.length)
      .every(({ greaterThan }) => Array.isArray(greaterThan));
    expect(allAreArrays).toBeTruthy();
  });

  it('should have a null "enteredValue" prop and no "value" prop for all blocks without "value" clues', () => {
    const gameGrid = getGameGrid(fullGrid, initialMinClues);
    gameGrid
      .flat()
      .filter(({ value }) => !value)
      .forEach(block => {
        expect(block).not.toHaveProperty('value');
        expect(block.enteredValue).toEqual(null);
      });
  });

  it('should include the correct grid number and no "enteredValue" prop where a "value" clue is provided', () => {
    const gameGrid = getGameGrid(fullGrid, initialMinClues);
    gameGrid.forEach((array, rowIndex) => {
      array.forEach((block, colIndex) => {
        if (block.value) {
          const realValue = getValueAtCoordinates(fullGrid, [
            rowIndex,
            colIndex
          ]);
          expect(block.value).toEqual(realValue);
          expect(block).not.toHaveProperty('enteredValue');
        }
      });
    });
  });

  it('should include an array of directions when "greater than" is truthy', () => {
    const gameGrid = getGameGrid(fullGrid, initialMinClues);
    const greaterThans = getGreaterThans(gameGrid);
    greaterThans.forEach(directions => {
      directions.forEach(direction => {
        expect(typeof direction).toEqual('string');
        expect(isDirection(direction)).toBeTruthy();
      });
    });
  });

  it('should include the number of clues necessary for the grid to have a unique solution (adding more clues if necessary)', () => {
    const gameGrid = getGameGrid(fullGrid, 10);
    const solutions = solveGameGrid(gameGrid);
    expect(solutions).toHaveLength(1);
  });
});

function countClues(grid) {
  return grid.flat().reduce((clues, { value, greaterThan }) => {
    return clues + greaterThan.length + (value ? 1 : 0);
  }, 0);
}

function getGreaterThans(grid) {
  return grid
    .flat()
    .filter(({ greaterThan }) => greaterThan.length)
    .map(({ greaterThan }) => greaterThan);
}

function isDirection(value) {
  return ['above', 'below', 'left', 'right'].includes(value);
}
