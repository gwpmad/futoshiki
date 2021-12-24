import React from 'react';

import Container from './container';
import { NumberButton } from 'components';

const NumberControls = ({ handleNumberInput }) => {
  return (
    <Container
      className="number-controls"
      onClick={e => e.stopPropagation()}
    >
      {['a', 'b', 'c', 'd', 'e'].map((key, idx) => {
        const number = idx + 1;
        return <NumberButton
          number={number} key={key}
          handleNumberInput={handleNumberInput}
        />
      })}
    </Container>
  );
};

export default NumberControls;
