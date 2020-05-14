import React from 'react';

import Container from './container';
import { NewGameButton, ToggleNotesButton } from 'components';

const BelowGame = () => {
  return (
    <Container className="below-game">
      <NewGameButton />
      <ToggleNotesButton />
    </Container>
  );
};

export default BelowGame;
