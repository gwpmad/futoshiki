/**
 * Returns a deep copy of an array (the array cannot include any functions or methods)
 * @param {array} array The array to copy
 */
function cloneArray(array) {
  return JSON.parse(JSON.stringify(array));
}

export default cloneArray;
