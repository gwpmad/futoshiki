import * as actionTypes from './action-types';
import { checkSolution, createFullGrid, getGameGrid } from 'game-logic';

const initialState = {
  fullGrid: null,
  gameGrid: null,
  selectedBlock: null,
  notesMode: false,
  gameCompleted: false
};

function reducer(state = initialState, action) {
  const { selectedBlock } = state;

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
        gameGrid: state.gameGrid.map((row, rowIdx) =>
          row.map((block, colIdx) => {
            if (selectedBlock[0] !== rowIdx || selectedBlock[1] !== colIdx)
              return block;
            return { ...block, enteredValue: action.enteredValue };
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

    case actionTypes.TOGGLE_NOTES_MODE:
      return {
        ...state,
        notesMode: !state.notesMode
      };

    case actionTypes.EDIT_BLOCK_NOTES:
      return {
        ...state,
        gameGrid: state.gameGrid.map((row, rowIdx) =>
          row.map((block, colIdx) => {
            if (selectedBlock[0] !== rowIdx || selectedBlock[1] !== colIdx)
              return block;

            const notes = block.notes.includes(action.note)
              ? block.notes.filter(note => note !== action.note)
              : [...block.notes, action.note];
            return { ...block, notes };
          })
        )
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
