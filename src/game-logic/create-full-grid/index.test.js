import createFullGrid from '.';

describe('createFullGrid', () => {
  it('returns a board with side length 5 and numbers 1 to 5 in all columns and rows', () => {
    const result = createFullGrid();
    for (let i = 0; i < 5; i++) {
      for (let k = 0; k < 5; k++) {
        expect(result[i]).toContain(k + 1);
      }
    }
  });

  it('randomises the order of the numbers in each row', () => {
    const result1 = createFullGrid();
    const result2 = createFullGrid();
    expect(result1).not.toEqual(result2);
  });
});
