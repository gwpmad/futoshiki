import { count2dArrayOccurrences } from '.';

describe('count2dArrayOccurrences', () => {
  const arrayOfArrays = [
    [0, 0],
    [3, 5]
  ];

  it('returns the number of occurrences of the specified array in within a 2D array', () => {
    const result = count2dArrayOccurrences(arrayOfArrays, [3, 5]);
    expect(result).toEqual(1);
  });

  it('returns 0 when there are no occurrences of the specified array', () => {
    const result = count2dArrayOccurrences(arrayOfArrays, [4, 5]);
    expect(result).toEqual(0);
  });
});
