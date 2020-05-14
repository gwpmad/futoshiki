import * as actionTypes from './action-types';

export const checkSolution = () => ({
  type: actionTypes.CHECK_SOLUTION
});
export const createGrid = () => ({ type: actionTypes.CREATE_GRID });
export const deselectBlock = () => ({ type: actionTypes.DESELECT_BLOCK });
export const editBlockNotes = note => ({
  note,
  type: actionTypes.EDIT_BLOCK_NOTES
});
export const selectBlock = coords => ({
  coords,
  type: actionTypes.SELECT_BLOCK
});
export const setBlockValue = enteredValue => ({
  enteredValue,
  type: actionTypes.SET_BLOCK_VALUE
});
export const toggleNotesMode = () => ({ type: actionTypes.TOGGLE_NOTES_MODE });
