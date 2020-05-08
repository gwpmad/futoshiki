import React, { Children, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from './container';
import { checkSolution, selectBlock } from 'reducers';

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
  const blockValue = useSelector(({ gameGrid }) => {
    if (!gameGrid) return null;
    const { enteredValue, value } = gameGrid[rowIndex][colIndex];
    return containsValueClue ? value : enteredValue;
  });

  const gameCompleted = useSelector(({ gameCompleted }) => gameCompleted);

  const dispatch = useDispatch();
  function handleClick(e) {
    e.stopPropagation();
    if (!isActive && !gameCompleted)
      dispatch(selectBlock([rowIndex, colIndex]));
  }

  useEffect(() => {
    if (gameCompleted || containsValueClue || !blockValue) return;
    dispatch(checkSolution());
  }, [containsValueClue, blockValue, gameCompleted, dispatch]);

  return (
    <Container
      containsValueClue={containsValueClue}
      gameCompleted={gameCompleted}
      greaterThan={greaterThan}
      isActive={isActive}
      onClick={handleClick}
    >
      {blockValue || ''}
      {Children.toArray(
        greaterThan.map(direction => (
          <div className={`chevron chevron--${direction}`}>❯</div>
        ))
      )}
    </Container>
  );
};

export default Block;
