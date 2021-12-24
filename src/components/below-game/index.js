import React from 'react';

import Container from './container';
import { NewGameButton, ToggleNotesButton } from 'components';

const BelowGame = () => {
  return (
    <Container className="below-game">
      <div className="invisible-left" style={{ width: '96px', marginLeft: '15px' }} />
      <NewGameButton />
      <ToggleNotesButton />
    </Container>
  );
};

export default BelowGame;
