import React, { Children } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import Container from './container';

const Block = ({ rowIndex, colIndex }) => {
  const { value, greaterThan } = useSelector(
    ({ gameGrid }) => ({
      value: gameGrid ? gameGrid[rowIndex][colIndex].value : null,
      greaterThan: gameGrid ? gameGrid[rowIndex][colIndex].greaterThan : []
    }),
    shallowEqual
  );

  return (
    <Container greaterThan={greaterThan}>
      {value || ''}
      {Children.toArray(
        greaterThan.map(direction => (
          <div className={`chevron chevron--${direction}`}>❯</div>
        ))
      )}
    </Container>
  );
};

export default Block;

// solve(gameGrid) function (reused in future via button in UI) - equivalent to run()
// takes an optional array of existing solutions to compare against - will look for another solution if the one it finds matches one in the array

// if another solution is returned, calls addExtraClue(grid) then tries again

// addExtraClue(grid) function, adds another clue, perhaps a random 50/50 between greaterThan or value
