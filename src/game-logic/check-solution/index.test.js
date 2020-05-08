import checkSolution from '.';

describe('checkSolution', () => {
  const fullGrid = [
    [2, 5, 3, 1, 4],
    [1, 4, 2, 5, 3],
    [3, 1, 4, 2, 5],
    [4, 2, 5, 3, 1],
    [5, 3, 1, 4, 2]
  ];

  const gameGridWithCorrectSolution = [[{"greaterThan":[],"enteredValue":2},{"greaterThan":[],"value":5},{"greaterThan":["below","right"],"enteredValue":3},{"greaterThan":[],"value":1},{"greaterThan":[],"enteredValue":4}],[{"greaterThan":[],"enteredValue":1},{"greaterThan":["right"],"enteredValue":4},{"greaterThan":[],"value":2},{"greaterThan":[],"enteredValue":5},{"greaterThan":[],"value":3}],[{"greaterThan":["above"],"enteredValue":3},{"greaterThan":[],"enteredValue":1},{"greaterThan":[],"enteredValue":4},{"greaterThan":[],"value":2},{"greaterThan":[],"enteredValue":5}],[{"greaterThan":[],"enteredValue":4},{"greaterThan":["above"],"enteredValue":2},{"greaterThan":[],"enteredValue":5},{"greaterThan":[],"enteredValue":3},{"greaterThan":[],"enteredValue":1}],[{"greaterThan":["above"],"enteredValue":5},{"greaterThan":[],"enteredValue":3},{"greaterThan":[],"enteredValue":1},{"greaterThan":["above"],"value":4},{"greaterThan":[],"enteredValue":2}]]; //prettier-ignore
  const gameGridWithInCorrectSolution = [[{"greaterThan":[],"enteredValue":5},{"greaterThan":[],"value":5},{"greaterThan":["below","right"],"enteredValue":3},{"greaterThan":[],"value":1},{"greaterThan":[],"enteredValue":4}],[{"greaterThan":[],"enteredValue":1},{"greaterThan":["right"],"enteredValue":4},{"greaterThan":[],"value":2},{"greaterThan":[],"enteredValue":5},{"greaterThan":[],"value":3}],[{"greaterThan":["above"],"enteredValue":3},{"greaterThan":[],"enteredValue":1},{"greaterThan":[],"enteredValue":4},{"greaterThan":[],"value":2},{"greaterThan":[],"enteredValue":5}],[{"greaterThan":[],"enteredValue":4},{"greaterThan":["above"],"enteredValue":2},{"greaterThan":[],"enteredValue":5},{"greaterThan":[],"enteredValue":3},{"greaterThan":[],"enteredValue":1}],[{"greaterThan":["above"],"enteredValue":5},{"greaterThan":[],"enteredValue":3},{"greaterThan":[],"enteredValue":1},{"greaterThan":["above"],"value":4},{"greaterThan":[],"enteredValue":2}]]; //prettier-ignore

  it('should return true if the game grid passed in matches the full numbers grid passed in', () => {
    const result = checkSolution(gameGridWithCorrectSolution, fullGrid);
    expect(result).toEqual(true);
  });

  it('should return false if the game grid passed does not match the full numbers grid passed in', () => {
    const result = checkSolution(gameGridWithInCorrectSolution, fullGrid);
    expect(result).toEqual(false);
  });
});
