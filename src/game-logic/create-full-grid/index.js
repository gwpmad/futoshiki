import { SIDE_LENGTH } from 'constant-values';

/**
 * Returns a 5*5 grid with the numbers 1 to 5 randomly distributed in each row and column
 */
function createFullGrid() {
  let grid = getUnshuffledGrid();

  grid = shuffleOneAxis(grid);
  grid = switchAxes(grid);
  grid = shuffleOneAxis(grid);

  return grid;
}

/**
 * Returns a 5*5 with the numbers 1 to 5 numerically ordered (but starting at different indexes) in each row and column
 */
function getUnshuffledGrid() {
  const numbers = [...new Array(5)].map((_, idx) => idx + 1);
  const grid = [];
  for (let i = 0; i < SIDE_LENGTH; i++) {
    grid[i] = [...numbers.slice(i, numbers.length), ...numbers.slice(0, i)];
  }
  return grid;
}

/**
 * Switches the axes of the array of the array, allowing for the opposite axis to be shuffled later while keeping the sets together
 * @param {*} array in this case an array of arrays
 */
function switchAxes(array) {
  return array.map((_, idx) => {
    return array.map(thing => thing[idx]);
  });
}

/**
 * Returns a shuffled version of an array using the modern version of the Fisher-Yates algorithm
 * @param {*} array in this case a 2D array - the function shuffles it on one axis,
 */
function shuffleOneAxis(array) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let shuffleIdx = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[shuffleIdx]] = [
      shuffledArray[shuffleIdx],
      shuffledArray[i]
    ];
  }
  return shuffledArray;
}

export default createFullGrid;
