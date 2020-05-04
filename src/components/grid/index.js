import React, { Children, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Container from './container';
import { Row } from 'components';
import { createGrid } from 'reducers';

const Grid = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(createGrid());
  }, [dispatch]);

  return (
    <Container className="grid">
      {Children.toArray(
        [...new Array(5)].map((_, rowIndex) => <Row rowIndex={rowIndex} />)
      )}
    </Container>
  );
};

export default Grid;
