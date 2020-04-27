import getValueCoordinates from '.';
import { count2dArrayOccurrences } from '../helpers';

describe('getValueCoordinates', () => {
  it('should generate a (potentially empty) list of coordinates whose values should be shown', () => {
    const valueCoordinates = getValueCoordinates(1);
    expect(Array.isArray(valueCoordinates)).toBeTruthy();
    valueCoordinates.forEach(coords =>
      coords.forEach(coord => expect(typeof coord).toEqual('number'))
    );
  });

  it('should only include indexes between 0 and 4 in all the coordinates', () => {
    const valueCoordinates = getValueCoordinates(8);
    [...valueCoordinates.flat()].forEach(idx => {
      expect(idx).toBeGreaterThanOrEqual(0);
      expect(idx).toBeLessThanOrEqual(4);
    });
  });

  it('should return the number of coordinates specified in the argument', () => {
    const valueCoordinates = getValueCoordinates(2);
    expect(valueCoordinates).toHaveLength(2);
  });

  it('should not include any repeated coordinates within the value coordinates array', () => {
    const valueCoordinates = getValueCoordinates(25);
    valueCoordinates.forEach(coords => {
      const sameCoordsExist =
        count2dArrayOccurrences(valueCoordinates, coords) > 1;
      expect(sameCoordsExist).toBeFalsy();
    });
  });

  it('should return randomised results', () => {
    const coords1 = getValueCoordinates(25);
    const coords2 = getValueCoordinates(25);
    expect(coords1.flat()).not.toEqual(coords2.flat());
  });
});
