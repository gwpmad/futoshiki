import getGameGrid from '.';

const fullGrid = [
  [1, 3, 5, 4, 2],
  [3, 5, 2, 1, 4],
  [2, 4, 1, 5, 3],
  [4, 1, 3, 2, 5],
  [5, 2, 4, 3, 1]
];

describe('getGameGrid', () => {
  it('should return a game grid with values at the value coordinates passed in', () => {
    const valueCoordinates = [getRandomCoordinates(), getRandomCoordinates()];
    const gameGrid = getGameGrid(fullGrid, {
      valueCoordinates,
      greaterThanCoordinates: []
    });
    expect(getFromCoordinates(gameGrid, valueCoordinates[0]).value).toEqual(
      getFromCoordinates(fullGrid, valueCoordinates[0])
    );
    expect(getFromCoordinates(gameGrid, valueCoordinates[1]).value).toEqual(
      getFromCoordinates(fullGrid, valueCoordinates[1])
    );
  });

  it('should return a null for value for all squares not included in the value coordinates', () => {
    const gameGrid = getGameGrid(fullGrid, {
      valueCoordinates: [],
      greaterThanCoordinates: []
    });
    const valuesAllNull = gameGrid.flat().every(({ value }) => value === null);
    expect(valuesAllNull).toBeTruthy();
  });

  it('should return an empty array for "greater than" for all squares not included in the "greater than" coordinates', () => {
    const gameGrid = getGameGrid(fullGrid, {
      valueCoordinates: [],
      greaterThanCoordinates: []
    });
    const arraysAllEmpty = gameGrid
      .flat()
      .every(p => Array.isArray(p.greaterThan) && p.greaterThan.length === 0);
    expect(arraysAllEmpty).toBeTruthy();
  });

  it('should return an array of valid "greater than" directions for each "greater than" coordinate passed in', () => {
    const gameGrid = getGameGrid(fullGrid, {
      valueCoordinates: [],
      greaterThanCoordinates: [
        [1, 1],
        [3, 3]
      ]
    });

    expect(gameGrid[1][1].greaterThan).toHaveLength(1);
    expect(isDirection(gameGrid[1][1].greaterThan[0])).toBeTruthy();
    expect(gameGrid[3][3].greaterThan).toHaveLength(1);
    expect(isDirection(gameGrid[3][3].greaterThan[0])).toBeTruthy();
  });

  it('should include two different directions for coordinates that feature twice in the "greater than" array passed in', () => {
    const gameGrid = getGameGrid(fullGrid, {
      valueCoordinates: [],
      greaterThanCoordinates: [
        [3, 3],
        [3, 3]
      ]
    });

    const { greaterThan } = gameGrid[3][3];
    expect(greaterThan).toHaveLength(2);
    expect(greaterThan[0]).not.toEqual(greaterThan[1]);
  });

  // it('should only include ');
});

function getRandomCoordinates(_min = 0, _max = 4) {
  const min = Math.ceil(_min);
  const max = Math.floor(_max);
  return [
    Math.floor(Math.random() * (max - min + 1)) + min,
    Math.floor(Math.random() * (max - min + 1)) + min
  ];
}

function getFromCoordinates(array, coordinates) {
  return array[coordinates[0]][coordinates[1]];
}

function isDirection(value) {
  return ['above', 'below', 'left', 'right'].includes(value);
}
