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
        gameGrid
      };
    default:
      return state;
  }
}

export default reducer;
