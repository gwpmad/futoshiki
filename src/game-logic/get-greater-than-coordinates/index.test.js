import getGreaterThanCoordinates from '.';
import {
  count2dArrayOccurrences,
  getFourFifths,
  getRandomIntInclusive,
  getValueAtCoordinates,
  getValueInDirection
} from '../helpers';

const fullGrid = [
  [1, 3, 5, 4, 2],
  [3, 5, 2, 1, 4],
  [2, 4, 1, 5, 3],
  [4, 1, 3, 2, 5],
  [5, 2, 4, 3, 1]
];

describe('getGreaterThanCoordinates', () => {
  it('should generate a map of direction arrays, with coordinates where "greater than" inequalities should be shown', () => {
    const greaterThanCoordinates = getGreaterThanCoordinates(fullGrid, 10);
    ['above', 'below', 'left', 'right'].forEach(prop => {
      expect(greaterThanCoordinates).toHaveProperty(prop);
      greaterThanCoordinates[prop].forEach(([coord1, coord2]) => {
        expect(typeof coord1).toEqual('number');
        expect(typeof coord2).toEqual('number');
      });
    });
  });

  it('should return randomised results', () => {
    const coords1 = getGreaterThanCoordinates(fullGrid, 10);
    const coords2 = getGreaterThanCoordinates(fullGrid, 10);
    expect(coords1).not.toEqual(coords2);
  });

  it('should only include indexes between 0 and 4 in all the coordinates', () => {
    const greaterThanCoordinates = getGreaterThanCoordinates(fullGrid, 10);
    Object.values(greaterThanCoordinates)
      .flat(2)
      .forEach(idx => {
        expect(idx).toBeGreaterThanOrEqual(0);
        expect(idx).toBeLessThanOrEqual(4);
      });
  });

  it('should return a total number of coordinates representing between four and five fifths of the number passed in', () => {
    const totalClues = getRandomIntInclusive(8, 10);
    const greaterThanCoordinates = getGreaterThanCoordinates(
      fullGrid,
      totalClues
    );
    const totalCoordinates = countTotalCoordinates(greaterThanCoordinates);
    const fourFifthsOfTotal = getFourFifths(totalClues);
    expect(totalCoordinates).toBeGreaterThanOrEqual(fourFifthsOfTotal);
  });

  it('should return a random number of coordinates (within the accepted bounds)', () => {
    const counts = [...new Array(5)]
      .map(() => getGreaterThanCoordinates(fullGrid, 10))
      .map(result => countTotalCoordinates(result));
    const countsAllEqual = counts.every(count => count === counts[0]);
    expect(countsAllEqual).toBeFalsy();
  });

  it('should not include any set of coordinates more than twice overall', () => {
    const greaterThanCoordinates = getGreaterThanCoordinates(fullGrid, 10);
    const allCoordinates = getAllCoordinates(greaterThanCoordinates);
    allCoordinates.forEach(coords => {
      const numberOfOccurrences = count2dArrayOccurrences(
        allCoordinates,
        coords
      );
      expect(numberOfOccurrences).toBeLessThanOrEqual(2);
    });
  });

  it('should not include any set of coordinates which corresponds to a 1 on the grid passed in', () => {
    const greaterThanCoordinates = getGreaterThanCoordinates(fullGrid, 10);
    const allCoordinates = getAllCoordinates(greaterThanCoordinates);
    allCoordinates.forEach(coords => {
      expect(getValueAtCoordinates(fullGrid, coords)).not.toEqual(1);
    });
  });

  it('should not include a particular set of coordinates more times than the number of lesser values around it on the grid', () => {
    const greaterThanCoordinates = getGreaterThanCoordinates(fullGrid, 10);
    const allCoordinates = getAllCoordinates(greaterThanCoordinates);
    allCoordinates.forEach(coords => {
      const lesserValuesCount = countLesserSurroundingValues(fullGrid, coords);
      expect(
        count2dArrayOccurrences(allCoordinates, coords)
      ).toBeLessThanOrEqual(lesserValuesCount);
    });
  });

  it('should use a valid "greater than" direction for each coordinate', () => {
    const greaterThanCoordinates = getGreaterThanCoordinates(fullGrid, 10);
    Object.keys(greaterThanCoordinates).forEach(direction => {
      greaterThanCoordinates[direction].forEach(coords => {
        const currentValue = getValueAtCoordinates(fullGrid, coords);
        const adjacentValue = getValueInDirection(fullGrid, coords, direction);
        expect(currentValue).toBeGreaterThan(adjacentValue);
      });
    });
  });

  it('should not include the same coordinates twice within the same direction array', () => {
    const greaterThanCoordinates = getGreaterThanCoordinates(fullGrid, 10);
    Object.values(greaterThanCoordinates).forEach(directionArray => {
      directionArray.forEach(coords =>
        expect(
          count2dArrayOccurrences(directionArray, coords)
        ).toBeLessThanOrEqual(1)
      );
    });
  });
});

function getAllCoordinates(map) {
  return Object.values(map).flat();
}

function countTotalCoordinates(map) {
  return getAllCoordinates(map).length;
}

function countLesserSurroundingValues(array, coords) {
  const valueAtCoordinates = getValueAtCoordinates(array, coords);
  const lesserSurroundingValues = [
    getValueInDirection(array, coords, 'right'),
    getValueInDirection(array, coords, 'left'),
    getValueInDirection(array, coords, 'above'),
    getValueInDirection(array, coords, 'below')
  ].filter(value => Boolean(value) && value < valueAtCoordinates);

  return lesserSurroundingValues.length;
}
