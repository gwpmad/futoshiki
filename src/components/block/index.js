import React, { Children } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from './container';
import { selectBlock } from 'reducers';

const Block = ({ rowIndex, colIndex }) => {
  const greaterThan = useSelector(({ gameGrid }) =>
    gameGrid ? gameGrid[rowIndex][colIndex].greaterThan : []
  );
  const isActive = useSelector(({ selectedBlock }) =>
    selectedBlock
      ? selectedBlock[0] === rowIndex && selectedBlock[1] === colIndex
      : false
  );
  const containsValueClue = useSelector(({ gameGrid }) =>
    gameGrid ? Boolean(gameGrid[rowIndex][colIndex].value) : false
  );
  const content = useSelector(({ gameGrid }) => {
    if (!gameGrid) return;
    const { enteredValue, value } = gameGrid[rowIndex][colIndex];
    return containsValueClue ? value : enteredValue;
  });

  const dispatch = useDispatch();
  function handleClick() {
    if (!isActive) dispatch(selectBlock([rowIndex, colIndex]));
  }

  return (
    <Container
      containsValueClue={containsValueClue}
      greaterThan={greaterThan}
      isActive={isActive}
      onClick={handleClick}
    >
      {content || ''}
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
