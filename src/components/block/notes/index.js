import React, { Children } from 'react';

import Container from './container';
import Note from './note';

const Notes = ({ notes }) => {
  return (
    <Container>
      {Children.toArray(
        [...new Array(5)].map((_, idx) => {
          const number = idx + 1;
          const isActive = notes.includes(number);
          return <Note isActive={isActive}>{number}</Note>;
        })
      )}
    </Container>
  );
};

export default Notes;
