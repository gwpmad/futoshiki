function getValueAtCoordinates(arrayOfArrays, coordinates) {
  const row = arrayOfArrays[coordinates[0]] || [];
  return row[coordinates[1]];
}

export default getValueAtCoordinates;
