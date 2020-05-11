import createValueCoordinates from '.';
import { count2dArrayOccurrences, getCoordinatesInDirection } from '../helpers';

describe.only('createValueCoordinates', () => {
  const greaterThanCoordinates = {
    above: [[4, 1]],
    below: [
      [1, 1],
      [2, 3],
      [1, 2]
    ],
    left: [
      [3, 4],
      [0, 1]
    ],
    right: [
      [4, 2],
      [1, 2],
      [4, 3],
      [0, 2],
      [4, 0]
    ]
  };

  it('should generate a (potentially empty) list of coordinates whose values should be shown', () => {
    const valueCoordinates = createValueCoordinates(1, greaterThanCoordinates);
    expect(Array.isArray(valueCoordinates)).toBeTruthy();
    valueCoordinates.forEach(coords =>
      coords.forEach(coord => expect(typeof coord).toEqual('number'))
    );
  });

  it('should only include indexes between 0 and 4 in all the coordinates', () => {
    const valueCoordinates = createValueCoordinates(8, greaterThanCoordinates);
    [...valueCoordinates.flat()].forEach(idx => {
      expect(idx).toBeGreaterThanOrEqual(0);
      expect(idx).toBeLessThanOrEqual(4);
    });
  });

  it('should return the number of coordinates specified in the argument', () => {
    const valueCoordinates = createValueCoordinates(2, greaterThanCoordinates);
    expect(valueCoordinates).toHaveLength(2);
  });

  it('should not include any repeated coordinates within the value coordinates array', () => {
    const valueCoordinates = createValueCoordinates(10, greaterThanCoordinates);
    valueCoordinates.forEach(coords => {
      const sameCoordsExist =
        count2dArrayOccurrences(valueCoordinates, coords) > 1;
      expect(sameCoordsExist).toBeFalsy();
    });
  });

  it('should not include any neighbouring values that have a greater than between them on the grid', () => {
    const valueCoordinates = createValueCoordinates(7, greaterThanCoordinates);
    Object.entries(greaterThanCoordinates).forEach(([direction, coordsList]) =>
      coordsList.forEach(coords => {
        const coordsValueClues = count2dArrayOccurrences(
          valueCoordinates,
          coords
        );
        const coordsInDirection = getCoordinatesInDirection(coords, direction);
        const coordsInDirectionValueClues = count2dArrayOccurrences(
          valueCoordinates,
          coordsInDirection
        );
        expect(coordsValueClues + coordsInDirectionValueClues).toBeLessThan(2);
      })
    );
  });

  it('should return randomised results', () => {
    const coords1 = createValueCoordinates(10, greaterThanCoordinates);
    const coords2 = createValueCoordinates(10, greaterThanCoordinates);
    expect(coords1.flat()).not.toEqual(coords2.flat());
  });
});
