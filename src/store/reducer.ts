import { BingoAction, BingoState, Cell } from "../types";
import { generateBingoBoard } from "../utils";

export const initialBingoState = (size: number) => ({
  cells: generateBingoBoard(size) as Cell[][],
  isCelebrating: false,
  bingoLinesSet: new Set<string>(),
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
      const updatedSet = new Set(state.bingoLinesSet);
      console.log("있던거: ", updatedSet);
      console.log("받은거: ", action.payload);

      action.payload.forEach((line: string) => {
        updatedSet.delete(line);
      });
      console.log("이걸로 빙고라인셋 업데이트: ", updatedSet);
      return { ...state, bingoLinesSet: new Set(...action.payload) };
    }
    case "STOP_CELEBRATION":
      return { ...state, isCelebrating: false };
    default:
      throw new Error(`Unhandled action type!`);
  }
};
