import React from 'react';

import Container from './container';

const NumberButton = ({ number }) => {
  return (
    <Container>
      {number}
    </Container>
  );
};

export default NumberButton;
