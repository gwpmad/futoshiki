import React, { Children } from 'react';

import Container from './container';

const Block = () => {
  const greaterThan =
    [['left', 'right'], ['right'], ['above'], ['above', 'below']][
      Math.floor(Math.random() * 8)
    ] || [];
  return (
    <Container greaterThan={greaterThan}>
      5
      {Children.toArray(
        greaterThan.map(direction => (
          <div className={`chevron chevron--${direction}`}>❯</div>
        ))
      )}
    </Container>
  );
};

Block.defaultProps = {
  greaterThan: []
};
export default Block;
