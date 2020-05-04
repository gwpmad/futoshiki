import React, { Children } from 'react';

import { Block } from 'components';
import Container from './container';

const Row = ({ rowIndex }) => {
  return (
    <Container className="row">
      {Children.toArray(
        [...Array(5)].map((_, colIndex) => (
          <Block rowIndex={rowIndex} colIndex={colIndex} />
        ))
      )}
    </Container>
  );
};

export default Row;
