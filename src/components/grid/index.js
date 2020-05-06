import React, { Children, useEffect } from 'react';
import useMousetrap from 'react-hook-mousetrap';
import { useDispatch, useSelector } from 'react-redux';

import Container from './container';
import { Row } from 'components';
import { getValueAtCoordinates, traverseGrid } from 'game-logic';
import { createGrid, selectBlock, setBlockValue } from 'reducers';

const Grid = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(createGrid());
  }, [dispatch]);

  const selectedBlock = useSelector(({ selectedBlock }) => selectedBlock);
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

  useMousetrap('esc', () => dispatch(selectBlock(null)));

  const gameGrid = useSelector(({ gameGrid }) => gameGrid);
  function enterValue(enteredValue) {
    if (!selectedBlock) return;
    const clueValue = getValueAtCoordinates(gameGrid, selectedBlock).value;
    if (!clueValue) dispatch(setBlockValue(selectedBlock, enteredValue));
  }
  useMousetrap('1', () => enterValue(1));
  useMousetrap('2', () => enterValue(2));
  useMousetrap('3', () => enterValue(3));
  useMousetrap('4', () => enterValue(4));
  useMousetrap('5', () => enterValue(5));
  useMousetrap('backspace', () => enterValue(null));
  useMousetrap('del', () => enterValue(null));

  return (
    <Container className="grid">
      {Children.toArray(
        [...new Array(5)].map((_, rowIndex) => <Row rowIndex={rowIndex} />)
      )}
    </Container>
  );
};

export default Grid;
