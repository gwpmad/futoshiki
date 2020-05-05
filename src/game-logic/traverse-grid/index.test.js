import traverseGrid from '.';

describe('traverseGrid', () => {
  it('returns the grid coordinates to the right of those passed in if asked', () => {
    const newCoords = traverseGrid([0, 0], 'right');
    expect(newCoords).toEqual([0, 1]);
  });

  it('returns the grid coordinates to the left of those passed in if asked', () => {
    const newCoords = traverseGrid([0, 1], 'left');
    expect(newCoords).toEqual([0, 0]);
  });

  it('returns the grid coordinates below those passed in if asked', () => {
    const newCoords = traverseGrid([0, 0], 'below');
    expect(newCoords).toEqual([1, 0]);
  });

  it('returns the grid coordinates above those passed in if asked', () => {
    const newCoords = traverseGrid([1, 0], 'above');
    expect(newCoords).toEqual([0, 0]);
  });

  it('traverses to the other end of the grid horizontally if asked for left at the leftmost part of the grid', () => {
    const newCoords = traverseGrid([0, 0], 'left');
    expect(newCoords).toEqual([0, 4]);
  });

  it('traverses to the other end of the grid horizontally if asked for right at the rightmost part of the grid', () => {
    const newCoords = traverseGrid([0, 4], 'right');
    expect(newCoords).toEqual([0, 0]);
  });

  it('traverses to the other end of the grid vertically if asked for above at the topmost part of the grid', () => {
    const newCoords = traverseGrid([0, 0], 'above');
    expect(newCoords).toEqual([4, 0]);
  });

  it('traverses to the other end of the grid vertically if asked for below at the bottommost part of the grid', () => {
    const newCoords = traverseGrid([4, 0], 'below');
    expect(newCoords).toEqual([0, 0]);
  });

  it('should handle traversing multiple times', () => {
    const newCoords = [
      'left',
      'below',
      'below',
      'left',
      'above',
      'right'
    ].reduce((coords, direction) => traverseGrid(coords, direction), [0, 0]);
    expect(newCoords).toEqual([1, 4]);
  });
});
