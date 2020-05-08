import React, { useCallback, useEffect } from 'react';
import useMousetrap from 'react-hook-mousetrap';
import { useDispatch, useSelector } from 'react-redux';

import Container from './container';
import { getValueAtCoordinates, traverseGrid } from 'game-logic';
import {
  createGrid,
  deselectBlock,
  selectBlock,
  setBlockValue
} from 'reducers';

const AppContainer = ({ children }) => {
  const selectedBlock = useSelector(({ selectedBlock }) => selectedBlock);
  const dispatch = useDispatch();
  const dispatchDeselectBlock = useCallback(() => {
    if (selectedBlock) dispatch(deselectBlock());
  }, [dispatch, selectedBlock]);

  const gameCompleted = useSelector(({ gameCompleted }) => gameCompleted);

  const gameGridExists = useSelector(({ gameGrid }) => !!gameGrid);
  useEffect(() => {
    if (!gameGridExists) dispatch(createGrid());
  }, [dispatch, gameGridExists]);

  const [moveUp, moveDown, moveLeft, moveRight] = [
    'above',
    'below',
    'left',
    'right'
  ].map(direction => () => {
    if (selectedBlock)
      dispatch(selectBlock(traverseGrid(selectedBlock, direction)));
  });
  useMousetrap('up', moveUp);
  useMousetrap('down', moveDown);
  useMousetrap('left', moveLeft);
  useMousetrap('right', moveRight);

  useMousetrap('esc', () => dispatch(deselectBlock()));

  const canEnterValue = useSelector(
    ({ gameGrid }) => {
      if (!selectedBlock || !gameGrid) return false;
      return !getValueAtCoordinates(gameGrid, selectedBlock).value;
    },
    [selectedBlock]
  );
  function enterValue(enteredValue) {
    if (!canEnterValue) return;
    dispatch(setBlockValue(selectedBlock, enteredValue));
  }
  useMousetrap('1', () => enterValue(1));
  useMousetrap('2', () => enterValue(2));
  useMousetrap('3', () => enterValue(3));
  useMousetrap('4', () => enterValue(4));
  useMousetrap('5', () => enterValue(5));
  useMousetrap('backspace', () => enterValue(null));
  useMousetrap('del', () => enterValue(null));

  return (
    <Container
      className="app-container"
      gameCompleted={gameCompleted}
      onClick={dispatchDeselectBlock}
    >
      {children}
    </Container>
  );
};

export default AppContainer;
