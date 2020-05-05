/**
 * Returns the value at specified coordinates of a 2D array. Returns undefined if the coordinates do not exist in the array
 * @param {array} arrayOfArrays he 2D array to search in
 * @param {array} coordinates
 */
function getValueAtCoordinates(arrayOfArrays, coordinates) {
  const row = arrayOfArrays[coordinates[0]] || [];
  return row[coordinates[1]];
}

export default getValueAtCoordinates;
