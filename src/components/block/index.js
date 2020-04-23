import React from 'react';

import Container from './container';

const Block = () => {
  const greaterThan = ['left', 'right', 'above', 'below'][
    Math.floor(Math.random() * 8)
  ];
  return <Container greaterThan={greaterThan}>5</Container>;
};

export default Block;
