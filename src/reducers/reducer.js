import * as actionTypes from './action-types';
import { createFullGrid, getGameGrid } from 'game-logic';

const initialState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CREATE_GRID:
      const fullGrid = createFullGrid();
      const gameGrid = getGameGrid(fullGrid);
      return {
        ...state,
        fullGrid,
        gameGrid,
        selectedBlock: null
      };
    case actionTypes.DESELECT_BLOCK:
      return { ...state, selectedBlock: null };
    case actionTypes.SELECT_BLOCK:
      return {
        ...state,
        selectedBlock: action.coords
      };
    case actionTypes.SET_BLOCK_VALUE:
      return {
        ...state,
        gameGrid: state.gameGrid.map((row, rowIndex) =>
          row.map((block, colIndex) => {
            if (
              state.selectedBlock[0] === rowIndex &&
              state.selectedBlock[1] === colIndex
            ) {
              return { ...block, enteredValue: action.enteredValue };
            }
            return block;
          })
        )
      };
    default:
      return state;
  }
}

export default reducer;
