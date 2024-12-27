export class Observable<T> {
  private observers: ((data: T) => void)[] = [];

  subscribe(observer: (data: T) => void) {
    this.observers.push(observer);
  }

  unsubscribe(observer: (data: T) => void) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data: T) {
    this.observers.forEach((observer) => observer(data));
  }
}

export type Cell = {
  sentence: string;
  matched: boolean;
};

export type BingoState = {
  cells: Cell[][];
  isCelebrating: boolean;
  bingoLinesSet: Set<string>;
};

export type BingoAction =
  | {
      type: "UPDATE_CELLS";
      payload: { cells: Cell[][]; shouldCelebrate: boolean };
    }
  | { type: "ADD_BINGO_LINES"; payload: string[] }
  | { type: "REMOVE_BINGO_LINES"; payload: string[] }
  | { type: "STOP_CELEBRATION" };

export type BingoHookReturn = {
  cells: Cell[][];
  isCelebrating: boolean;
  bingoLinesSet: Set<string>;
  onClickCell: (row: number, col: number) => void;
};
