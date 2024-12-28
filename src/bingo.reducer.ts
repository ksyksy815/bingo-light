import { BingoAction, BingoState, Cell } from "./types";
import { generateBingoBoard } from "./utils";

export const initialBingoState = (size: number): BingoState => ({
  cells: generateBingoBoard(size) as Cell[][],
  isCelebrating: false,
  bingoLinesSet: new Set(),
});

export const bingoReducer = (state: BingoState, action: BingoAction) => {
  switch (action.type) {
    case "UPDATE_CELLS":
      return {
        ...state,
        cells: action.payload.cells,
        isCelebrating: action.payload.shouldCelebrate,
      };
    case "ADD_BINGO_LINES":
      return {
        ...state,
        bingoLinesSet: new Set([...state.bingoLinesSet, ...action.payload]),
      };
    case "REMOVE_BINGO_LINES": {
      return { ...state, bingoLinesSet: action.payload };
    }
    case "STOP_CELEBRATION":
      return { ...state, isCelebrating: false };
    default:
      throw new Error(`Unhandled action type!`);
  }
};
