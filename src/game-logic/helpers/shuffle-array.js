/**
 * Returns a shuffled version of an array using the modern version of the Fisher-Yates algorithm
 * @param array An array to shuffle (can be an array of arrays)
 */
function shuffleArray(array) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let shuffleIdx = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[shuffleIdx]] = [
      shuffledArray[shuffleIdx],
      shuffledArray[i]
    ];
  }
  return shuffledArray;
}

export default shuffleArray;
