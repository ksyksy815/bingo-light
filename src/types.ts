export type BingoLines = 'r1' | 'r2' | 'r3' | 'r4' | 'r5' | 'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'd1' | 'd2';

export type Cell = {
  sentence: string;
  matched: boolean;
};

export type BingoState = {
  cells: Cell[][];
  isCelebrating: boolean;
  bingoLinesSet: Set<BingoLines>;
};

export type BingoAction =
  | {
      type: "UPDATE_CELLS";
      payload: { cells: Cell[][]; shouldCelebrate: boolean };
    }
  | { type: "ADD_BINGO_LINES"; payload: Set<BingoLines> }
  | { type: "REMOVE_BINGO_LINES"; payload: Set<BingoLines> }
  | { type: "STOP_CELEBRATION" };

export type BingoHookReturn = {
  cells: Cell[][];
  isCelebrating: boolean;
  bingoLinesSet: Set<string>;
  onClickCell: (row: number, col: number) => void;
};
