import { arraysMatch } from '../helpers';

/**
 * Takes a Futoshiki game grid and a full Futoshiki grid and compares the two.
 * Returns true if the game grid and the full grid match, and false if not
 * @param {array} gameGrid A Futoshiki game grid (with clues and player-supplied answers)
 * @param {array} fullGrid A full Futoshiki grid with numbers only
 */
function checkSolution(gameGrid, fullGrid) {
  const numbersOnlyGameGrid = gameGrid.map(row =>
    row.map(({ enteredValue, value }) => enteredValue || value)
  );
  return arraysMatch(numbersOnlyGameGrid, fullGrid);
}

export default checkSolution;
