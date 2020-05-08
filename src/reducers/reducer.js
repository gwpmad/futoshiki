import * as actionTypes from './action-types';
import { checkSolution, createFullGrid, getGameGrid } from 'game-logic';

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
        selectedBlock: null,
        gameCompleted: false
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
    case actionTypes.CHECK_SOLUTION:
      const correctSolution = checkSolution(state.gameGrid, state.fullGrid);
      if (!correctSolution) return state;
      return {
        ...state,
        gameCompleted: true,
        selectedBlock: null
      };
    case 'CHEAT':
      return {
        ...state,
        gameCompleted: true,
        selectedBlock: null
      };
    default:
      return state;
  }
}

export default reducer;
