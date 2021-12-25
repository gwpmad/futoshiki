import React, { useCallback, useEffect } from 'react';
import useMousetrap from 'react-hook-mousetrap';
import { useDispatch, useSelector } from 'react-redux';

import { Content, Grid, BelowGame, Title, InputControls } from 'components';
import Container from './container';
import { getValueAtCoordinates, traverseGrid } from 'game-logic';
import {
  createGrid,
  deselectBlock,
  editBlockNotes,
  selectBlock,
  setBlockValue,
  toggleNotesMode
} from 'reducers';

const AppContainer = () => {
  const selectedBlock = useSelector(({ selectedBlock }) => selectedBlock);
  const dispatch = useDispatch();
  const dispatchDeselectBlock = useCallback(() => {
    if (selectedBlock) dispatch(deselectBlock());
  }, [dispatch, selectedBlock]);

  const noGameGrid = useSelector(({ gameGrid }) => !gameGrid);
  useEffect(() => {
    if (noGameGrid) dispatch(createGrid());
  }, [dispatch, noGameGrid]);

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

  const canSetBlockValue = useSelector(({ gameGrid, notesMode }) => {
    if (!gameGrid || !selectedBlock || notesMode) return false;
    return !getValueAtCoordinates(gameGrid, selectedBlock).value;
  });

  const canEditBlockNotes = useSelector(({ gameGrid, notesMode }) => {
    if (!gameGrid || !selectedBlock || !notesMode) return false;
    const { enteredValue, value } = getValueAtCoordinates(
      gameGrid,
      selectedBlock
    );
    return !value && !enteredValue;
  });

  const handleNumberInput = useCallback(number => {
    if (canSetBlockValue) return dispatch(setBlockValue(number));
    if (canEditBlockNotes) return dispatch(editBlockNotes(number));
  }, [canSetBlockValue, canEditBlockNotes, dispatch]);
  useMousetrap('1', () => handleNumberInput(1));
  useMousetrap('2', () => handleNumberInput(2));
  useMousetrap('3', () => handleNumberInput(3));
  useMousetrap('4', () => handleNumberInput(4));
  useMousetrap('5', () => handleNumberInput(5));

  const handleDeletePress = useCallback(() => {
    if (canSetBlockValue) dispatch(setBlockValue(null));
  }, [canSetBlockValue, dispatch]);;

  useMousetrap('backspace', handleDeletePress);
  useMousetrap('del', handleDeletePress);

  useMousetrap('shift', () => dispatch(toggleNotesMode()));

  const gameCompleted = useSelector(({ gameCompleted }) => gameCompleted);
  const title = gameCompleted ? 'Correct!' : 'Futoshiki';

  return (
    <Container
      className="app-container"
      gameCompleted={gameCompleted}
      onClick={dispatchDeselectBlock}
    >
      <Content className="content">
        <Title className="title">{title}</Title>
        <Grid />
        <BelowGame />
        <InputControls handleNumberInput={handleNumberInput} handleDeletePress={handleDeletePress} />
      </Content>
    </Container>
  );
};

export default AppContainer;
