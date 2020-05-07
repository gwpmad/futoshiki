import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from './container';
import { deselectBlock } from 'reducers';

const AppContainer = ({ children }) => {
  const selectedBlock = useSelector(({ selectedBlock }) => selectedBlock);
  const dispatch = useDispatch();
  const dispatchDeselectBlock = useCallback(() => {
    if (selectedBlock) dispatch(deselectBlock());
  }, [dispatch, selectedBlock]);

  return <Container onClick={dispatchDeselectBlock}>{children}</Container>;
};

export default AppContainer;
