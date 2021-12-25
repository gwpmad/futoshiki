import React from 'react';

import Container from './container';
import { InputButton } from 'components';

const InputControls = ({ handleNumberInput, handleDeletePress }) => {
  return (
    <Container
      className="number-controls"
      onClick={e => e.stopPropagation()}
    >
      {['a', 'b', 'c', 'd', 'e'].map((key, idx) => {
        const number = idx + 1;
        return <InputButton
          inputValue={number}
          key={key}
          clickHandler={handleNumberInput}
        />;
      })
      .concat(<InputButton key="f" inputValue={'⌫'} clickHandler={handleDeletePress} />)
      }
    </Container>
  );
};

export default InputControls;
