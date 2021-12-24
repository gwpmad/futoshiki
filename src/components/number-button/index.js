import React from 'react';
import { useSelector } from 'react-redux';

import Container from './container';

const NumberButton = ({ number }) => {
  const gameCompleted = useSelector(({ gameCompleted }) => gameCompleted);
  return (
    <Container gameCompleted={gameCompleted}>
      {number}
    </Container>
  );
};

export default NumberButton;
