import { getRandomIntInclusive } from '.';

function generateCoordinates() {
  return [getRandomIntInclusive(0, 4), getRandomIntInclusive(0, 4)];
}

export default generateCoordinates;
