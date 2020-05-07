import * as actionTypes from './action-types';

export const createGrid = () => ({ type: actionTypes.CREATE_GRID });
export const deselectBlock = () => ({ type: actionTypes.DESELECT_BLOCK });
export const setBlockValue = (coords, enteredValue) => ({
  coords,
  enteredValue,
  type: actionTypes.SET_BLOCK_VALUE
});
export const selectBlock = coords => ({
  coords,
  type: actionTypes.SELECT_BLOCK
});
