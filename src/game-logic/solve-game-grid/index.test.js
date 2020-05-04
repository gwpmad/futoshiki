import { arraysMatch } from 'game-logic/helpers';
import solveGameGrid from '.';

describe('solveGameGrid', () => {
  const fullGrid = [
    [1, 3, 5, 4, 2],
    [3, 5, 2, 1, 4],
    [2, 4, 1, 5, 3],
    [4, 1, 3, 2, 5],
    [5, 2, 4, 3, 1]
  ];

  const gameGridWithUniqueSolution = [[{"value":null,"greaterThan":[]},{"value":null,"greaterThan":["left"]},{"value":null,"greaterThan":["right"]},{"value":4,"greaterThan":[]},{"value":null,"greaterThan":[]}],[{"value":null,"greaterThan":["above","below"]},{"value":null,"greaterThan":["below","right"]},{"value":null,"greaterThan":["below","right"]},{"value":1,"greaterThan":[]},{"value":null,"greaterThan":[]}],[{"value":null,"greaterThan":[]},{"value":null,"greaterThan":[]},{"value":null,"greaterThan":[]},{"value":5,"greaterThan":["left"]},{"value":null,"greaterThan":[]}],[{"value":null,"greaterThan":["above"]},{"value":null,"greaterThan":[]},{"value":null,"greaterThan":["left","right"]},{"value":null,"greaterThan":[]},{"value":null,"greaterThan":["above"]}],[{"value":5,"greaterThan":["above","right"]},{"value":null,"greaterThan":["above"]},{"value":null,"greaterThan":["above","right"]},{"value":null,"greaterThan":["right"]},{"value":null,"greaterThan":[]}]]; // prettier-ignore
  const gameGridWithNoSolution = [[{"value":null,"greaterThan":["right"]},{"value":null,"greaterThan":["left"]},{"value":null,"greaterThan":["right"]},{"value":4,"greaterThan":[]},{"value":null,"greaterThan":[]}],[{"value":null,"greaterThan":["above","below"]},{"value":null,"greaterThan":["below","right"]},{"value":null,"greaterThan":["below","right"]},{"value":1,"greaterThan":[]},{"value":null,"greaterThan":[]}],[{"value":null,"greaterThan":[]},{"value":null,"greaterThan":[]},{"value":null,"greaterThan":[]},{"value":5,"greaterThan":["left"]},{"value":null,"greaterThan":[]}],[{"value":null,"greaterThan":["above"]},{"value":null,"greaterThan":[]},{"value":null,"greaterThan":["left","right"]},{"value":null,"greaterThan":[]},{"value":null,"greaterThan":["above"]}],[{"value":5,"greaterThan":["above","right"]},{"value":null,"greaterThan":["above"]},{"value":null,"greaterThan":["above","right"]},{"value":null,"greaterThan":["right"]},{"value":null,"greaterThan":[]}]]; // prettier-ignore
  const gameGridWith12Solutions = [[{"value":null,"greaterThan":[]},{"value":null,"greaterThan":["left"]},{"value":null,"greaterThan":[]},{"value":null,"greaterThan":[]},{"value":null,"greaterThan":[]}],[{"value":null,"greaterThan":[]},{"value":null,"greaterThan":["above"]},{"value":null,"greaterThan":["left"]},{"value":null,"greaterThan":[]},{"value":null,"greaterThan":[]}],[{"value":null,"greaterThan":[]},{"value":null,"greaterThan":[]},{"value":null,"greaterThan":["above"]},{"value":null,"greaterThan":[]},{"value":null,"greaterThan":[]}],[{"value":null,"greaterThan":[]},{"value":null,"greaterThan":[]},{"value":null,"greaterThan":[]},{"value":null,"greaterThan":[]},{"value":null,"greaterThan":[]}],[{"value":null,"greaterThan":[]},{"value":null,"greaterThan":[]},{"value":null,"greaterThan":["left"]},{"value":null,"greaterThan":[]},{"value":null,"greaterThan":[]}]] // prettier-ignore
  const gameGridWithManySolutions = [[{"value":null,"greaterThan":[]},{"value":null,"greaterThan":[]},{"value":null,"greaterThan":["right"]},{"value":null,"greaterThan":[]},{"value":null,"greaterThan":[]}],[{"value":null,"greaterThan":[]},{"value":null,"greaterThan":["below"]},{"value":null,"greaterThan":[]},{"value":null,"greaterThan":[]},{"value":null,"greaterThan":[]}],[{"value":null,"greaterThan":[]},{"value":null,"greaterThan":[]},{"value":1,"greaterThan":[]},{"value":null,"greaterThan":[]},{"value":null,"greaterThan":[]}],[{"value":null,"greaterThan":[]},{"value":null,"greaterThan":[]},{"value":null,"greaterThan":["right"]},{"value":null,"greaterThan":[]},{"value":null,"greaterThan":["above","below"]}],[{"value":null,"greaterThan":["right"]},{"value":null,"greaterThan":["above"]},{"value":null,"greaterThan":["right"]},{"value":null,"greaterThan":[]},{"value":null,"greaterThan":[]}]] //prettier-ignore

  it('should return an array the one correct solution (a 2d grid of numbers) for a grid with only one solution', () => {
    const [solvedGrid] = solveGameGrid(gameGridWithUniqueSolution);
    expect(arraysMatch(solvedGrid, fullGrid)).toBeTruthy();
  });

  it('should return an empty array if the grid has no solution', () => {
    const result = solveGameGrid(gameGridWithNoSolution);
    expect(result).toHaveLength(0);
  });

  it('should return an array of grids if there are multiple solutions', () => {
    const solution1 = [
      [1, 2, 3, 4, 5],
      [2, 3, 4, 5, 1],
      [3, 4, 5, 1, 2],
      [4, 5, 1, 2, 3],
      [5, 1, 2, 3, 4]
    ];
    const solution2 = [
      [1, 2, 3, 4, 5],
      [5, 3, 4, 1, 2],
      [2, 4, 5, 3, 1],
      [3, 5, 1, 2, 4],
      [4, 1, 2, 5, 3]
    ];
    const result = solveGameGrid(gameGridWith12Solutions);
    expect(result).toHaveLength(12);
    expect(result.some(grid => arraysMatch(grid, solution1))).toBeTruthy();
    expect(result.some(grid => arraysMatch(grid, solution2))).toBeTruthy();
  });

  it('should stop searching for solutions after finding 25 (to avoid infinite loops)', () => {
    const result = solveGameGrid(gameGridWithManySolutions);
    expect(result).toHaveLength(25);
  });
});
