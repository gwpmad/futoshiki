import React, { Children } from 'react';

import { Block } from 'components';
import Container from './container';

const Row = () => {
  return (
    <Container className="row">
      {Children.toArray([...Array(5)].map(() => <Block />))}
    </Container>
  );
};

export default Row;
