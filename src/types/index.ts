export type Cell = {
  sentence: string;
  matched: boolean;
};

export type BingoHookReturn = {
  cells: Cell[][];
  isCelebrating: boolean;
  bingoLinesSet: Set<string>;
  onClickCell: (row: number, col: number) => void;
};
