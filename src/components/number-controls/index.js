import React from 'react';

import Container from './container';
import { NumberButton } from 'components';

const NumberControls = () => {
  return (
    <Container className="number-controls">
      {['a', 'b', 'c', 'd', 'e'].map((key, idx) => <NumberButton number={idx + 1} key={key}/>)}
    </Container>
  );
};

export default NumberControls;
