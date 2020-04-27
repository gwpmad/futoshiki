import { count2dArrayOccurrences } from '../helpers';

function getGameGrid(fullGrid, { greaterThanCoordinates, valueCoordinates }) {
  return fullGrid.map((row, colIndex) =>
    row.map((value, rowIndex) => {
      const greaterThansCount = count2dArrayOccurrences(
        greaterThanCoordinates,
        [colIndex, rowIndex]
      );
      const showValue =
        count2dArrayOccurrences(valueCoordinates, [colIndex, rowIndex]) > 0;
      if (showValue) {
        return { value };
      }
      if (greaterThansCount > 0) {
        return {
          value: null,
          greaterThan: [...new Array(greaterThansCount)].map((_, idx) =>
            idx ? 'above' : 'below'
          )
        };
      }
      return { value: null, greaterThan: [] };
    })
  );
}

export default getGameGrid;
