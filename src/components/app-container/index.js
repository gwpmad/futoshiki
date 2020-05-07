import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Container from './container';
import { deselectBlock } from 'reducers';

const AppContainer = ({ children }) => {
  const dispatch = useDispatch();
  const dispatchDeselectBlock = useCallback(() => dispatch(deselectBlock()), [
    dispatch
  ]);

  return <Container onClick={dispatchDeselectBlock}>{children}</Container>;
};

export default AppContainer;
