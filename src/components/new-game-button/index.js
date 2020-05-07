import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Container from './container';
import { createGrid } from 'reducers';

const NewGameButton = () => {
  const dispatch = useDispatch();
  const startNewGame = useCallback(() => {
    dispatch(createGrid());
  }, [dispatch]);

  return (
    <Container className="new-game-button" onClick={startNewGame}>
      New Game
    </Container>
  );
};

export default NewGameButton;
