import React, { Children } from 'react';

import Container from './container';
import { Row } from 'components';

const Grid = () => {
  return (
    <Container className="grid">
      {Children.toArray(
        [...new Array(5)].map((_, rowIndex) => <Row rowIndex={rowIndex} />)
      )}
    </Container>
  );
};

export default Grid;
