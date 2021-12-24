import React from 'react';
import { useSelector } from 'react-redux';

import Container from './container';

const NumberButton = ({ number, handleNumberInput }) => {
  const gameCompleted = useSelector(({ gameCompleted }) => gameCompleted);
  return (
    <Container
      gameCompleted={gameCompleted}
      onClick={(e) => {
        e.stopPropagation();
        handleNumberInput(number)
      }}
    >
      {number}
    </Container>
  );
};

export default NumberButton;
