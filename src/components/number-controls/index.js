import React from 'react';

import Container from './container';
import { NumberButton } from 'components';

const NumberControls = () => {
  return (
    <Container className="number-controls">
      {[...Array(5)].map((_, idx) => <NumberButton number={idx + 1}/>)}
    </Container>
  );
};

export default NumberControls;
