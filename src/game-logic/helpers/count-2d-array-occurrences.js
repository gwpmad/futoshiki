function count2dArrayOccurrences(arrayOfArrays, array) {
  return arrayOfArrays.filter(
    ([value1, value2]) => value1 === array[0] && value2 === array[1]
  ).length;
}

export default count2dArrayOccurrences;
