import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from './container';
import { toggleNotesMode } from 'reducers';

const ToggleNotesButton = () => {
  const dispatch = useDispatch();
  const dispatchToggleNotesMode = useCallback(
    e => {
      e.stopPropagation();
      dispatch(toggleNotesMode());
    },
    [dispatch]
  );

  const notesAction = useSelector(({ notesMode }) =>
    notesMode ? 'Hide' : 'Show'
  );
  const gameCompleted = useSelector(({ gameCompleted }) => gameCompleted);

  return (
    <Container gameCompleted={gameCompleted} onClick={dispatchToggleNotesMode} className="toggle-notes-button">
      {notesAction} Notes
      <p className="keyboard-shortcut">(Shift ⇧)</p>
    </Container>
  );
};

export default ToggleNotesButton;
