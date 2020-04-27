/**
 * Counts the number of times an array of arrays includes a certain array (the check is for identical contents, not the same object in memory)
 * @param {array} arrayOfArrays A 2D array
 * @param {array} array The array the function checks for
 */
function count2dArrayOccurrences(arrayOfArrays, array) {
  return arrayOfArrays.filter(
    ([value1, value2]) => value1 === array[0] && value2 === array[1]
  ).length;
}

export default count2dArrayOccurrences;
