import React, { Children, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Chevron from './chevron';
import Container from './container';
import Notes from './notes';
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
  const notes = useSelector(({ gameGrid }) => {
    if (!gameGrid || containsValueClue) return null;
    return gameGrid[rowIndex][colIndex].notes;
  });
  const showNotes = useSelector(({ notesMode }) =>
    !blockValue && notes ? notesMode : false
  );

  const dispatch = useDispatch();
  const handleClick = useCallback(
    e => {
      e.stopPropagation();
      if (!isActive && !gameCompleted)
        dispatch(selectBlock([rowIndex, colIndex]));
    },
    [isActive, gameCompleted, rowIndex, colIndex, dispatch]
  );

  useEffect(() => {
    if (gameCompleted || containsValueClue || !blockValue || showNotes) return;
    dispatch(checkSolution());
  }, [containsValueClue, blockValue, gameCompleted, showNotes, dispatch]);


  return (
    <Container
      containsValueClue={containsValueClue}
      gameCompleted={gameCompleted}
      greaterThan={greaterThan}
      isActive={isActive}
      onClick={handleClick}
      showNotes={showNotes}
    >
      {showNotes ? <Notes notes={notes} /> : blockValue || ''}
      {Children.toArray(
        greaterThan.map(direction => <Chevron direction={direction} />)
      )}
    </Container>
  );
};

export default Block;
