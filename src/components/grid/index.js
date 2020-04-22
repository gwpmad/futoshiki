import React, { Children } from 'react';

import Container from './container';
import { Row } from 'components';

const Grid = () => {
  return (
    <Container className="grid">
      {Children.toArray([...Array(5)].map(() => <Row />))}
    </Container>
  );
};

export default Grid;
