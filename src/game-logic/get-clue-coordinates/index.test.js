import getClueCoordinates from '.';

const fullGrid = [
  [1, 3, 5, 4, 2],
  [3, 5, 2, 1, 4],
  [2, 4, 1, 5, 3],
  [4, 1, 3, 2, 5],
  [5, 2, 4, 3, 1]
];

describe('getClueCoordinates', () => {
  it('should generate a (potentially empty) list of coordinates whose values should be shown', () => {
    const { valueCoordinates } = getClueCoordinates(fullGrid);
    expect(Array.isArray(valueCoordinates)).toBeTruthy();
    valueCoordinates.forEach(coords =>
      coords.forEach(coord => expect(typeof coord).toEqual('number'))
    );
  });

  it('should generate a list of coordinates where "greater than" inequalities should be shown', () => {
    const { greaterThanCoordinates } = getClueCoordinates(fullGrid);
    expect(Array.isArray(greaterThanCoordinates)).toBeTruthy();
    expect(greaterThanCoordinates.length).toBeGreaterThan(0);
    greaterThanCoordinates.forEach(coords =>
      coords.forEach(coord => expect(typeof coord).toEqual('number'))
    );
  });

  it('should only include indexes between 0 and 4 in all the coordinates', () => {
    const { greaterThanCoordinates, valueCoordinates } = getClueCoordinates(
      fullGrid
    );
    [...greaterThanCoordinates.flat(), ...valueCoordinates.flat()].forEach(
      idx => {
        expect(idx).toBeGreaterThanOrEqual(0);
        expect(idx).toBeLessThanOrEqual(4);
      }
    );
  });

  it('should return a total of between 8 and 10 clue coordinates', () => {
    const { greaterThanCoordinates, valueCoordinates } = getClueCoordinates(
      fullGrid
    );
    const totalClues = greaterThanCoordinates.length + valueCoordinates.length;
    expect(totalClues).toBeGreaterThanOrEqual(8);
    expect(totalClues).toBeLessThanOrEqual(10);
  });

  it('should return a set of clue coordinates with value coordinates representing only a maximum of a fifth of the total', () => {
    const { greaterThanCoordinates, valueCoordinates } = getClueCoordinates(
      fullGrid
    );
    const totalClues = greaterThanCoordinates.length + valueCoordinates.length;
    const fifthOfTotal = totalClues / 5;
    expect(valueCoordinates.length).toBeLessThanOrEqual(fifthOfTotal);
  });

  it('should not include any set of coordinates in the "greater than" array which corresponds to a 1 on the grid passed in', () => {
    const { greaterThanCoordinates } = getClueCoordinates(fullGrid);
    greaterThanCoordinates.forEach(coords => {
      expect(fullGrid[coords[0]][coords[1]]).not.toEqual(1);
    });
  });

  it('should not include any repeated coordinates within the value coordinates array', () => {
    const { valueCoordinates } = getClueCoordinates(fullGrid);
    valueCoordinates.forEach((coords, idx) => {
      const sameCoordsExist = valueCoordinates.some(
        (_coords, _idx) =>
          _idx !== idx && _coords[0] === coords[0] && _coords[1] === coords[1]
      );
      expect(sameCoordsExist).toBeFalsy();
    });
  });

  it('should not include any coordinates more than twice within the "greater than" array', () => {
    const { greaterThanCoordinates } = getClueCoordinates(fullGrid);
    greaterThanCoordinates.forEach((coords, idx) => {
      const occurrences = greaterThanCoordinates.filter(
        _coords => _coords[0] === coords[0] && _coords[1] === coords[1]
      ).length;
      expect(occurrences).toBeLessThanOrEqual(2);
    });
  });

  it('should return randomised results', () => {
    const coords1 = getClueCoordinates(fullGrid);
    const coords2 = getClueCoordinates(fullGrid);
    const flattened1 = [
      ...coords1.valueCoordinates.flat(),
      ...coords1.greaterThanCoordinates.flat()
    ];
    const flattened2 = [
      ...coords2.valueCoordinates.flat(),
      ...coords2.greaterThanCoordinates.flat()
    ];
    expect(flattened1).not.toEqual(flattened2);
  });
});
