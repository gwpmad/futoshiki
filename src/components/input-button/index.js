import React from 'react';
import { useSelector } from 'react-redux';

import Container from './container';

const InputButton = ({ inputValue, clickHandler }) => {
  const gameCompleted = useSelector(({ gameCompleted }) => gameCompleted);
  return (
    <Container
      gameCompleted={gameCompleted}
      onClick={(e) => {
        e.stopPropagation();
        clickHandler(inputValue)
      }}
    >
      {inputValue}
    </Container>
  );
};

export default InputButton;
