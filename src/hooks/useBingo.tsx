import { useCallback, useEffect, useReducer } from "react";
import { bingoReducer, initialBingoState } from "../bingo.reducer";
import { BingoAction, BingoHookReturn, BingoLines, BingoState, Cell } from "../types";


const useBingo = (size: number): BingoHookReturn => {
  const [{ cells, isCelebrating, bingoLinesSet }, dispatch] = useReducer<React.Reducer<BingoState, BingoAction>>(
    bingoReducer,
    initialBingoState(size)
  );
  useEffect(() => {
    if (isCelebrating) {

      const timer = setTimeout(() => {
        dispatch({ type: "STOP_CELEBRATION" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isCelebrating, bingoLinesSet]);

  const checkBingo = useCallback(
    ({
      updatedCells,
      clickedPosition,
      previousBingoLines,
    }: {
      updatedCells: Cell[][];
      clickedPosition: [number, number];
      previousBingoLines: Set<BingoLines>;
    }) => {
      const [x, y] = clickedPosition;

      const isRowBingo = updatedCells[x].every((cell) => cell.matched);
      const isColBingo = updatedCells.every((row) => row[y].matched);
      const isDiagonalBingo =
        x === y && updatedCells.every((row, i) => row[i].matched);
      const isReverseDiagonalBingo =
        x === size - y - 1 &&
        updatedCells.every((row, i) => row[size - i - 1].matched);

      const currentBingoLines = new Set<BingoLines>();

      if (isRowBingo) currentBingoLines.add(`r${x}` as BingoLines);
      if (isColBingo) currentBingoLines.add(`c${y}` as BingoLines);
      if (isDiagonalBingo) currentBingoLines.add("d1" as BingoLines);
      if (isReverseDiagonalBingo) currentBingoLines.add("d2" as BingoLines);

      const stillValidBingoLines = new Set(
        [...previousBingoLines].filter((line) => {
          if (line.startsWith("r")) {
            const rowIndex = parseInt(line[1])
            return updatedCells[rowIndex].every((cell) => cell.matched);
          }
          if (line.startsWith("c")) {
            const colIndex = parseInt(line[1]);
            return updatedCells.every((row) => row[colIndex].matched);
          }
          if (line === "d1") {
            return updatedCells.every((row, i) => row[i].matched);
          }
          if (line === "d2") {
            return updatedCells.every((row, i) => row[size - i - 1].matched);
          }
          return false;
        })
      );

      const finalBingoLines = new Set([
        ...currentBingoLines,
        ...stillValidBingoLines,
      ]);

      return {
        shouldCelebrate: isRowBingo || isColBingo || isDiagonalBingo || isReverseDiagonalBingo,
        bingoLines: Array.from(finalBingoLines),
      };
    },
    [size]
  );

  const onClickCell = (x: number, y: number) => {
    const isCurrentlyMatched = cells[x][y].matched;

    const updatedCells = cells.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        if (x === rowIndex && y === colIndex) {
          return {
            ...cell,
            matched: !cell.matched,
          };
        }

        return cell;
      });
    });

    const { shouldCelebrate, bingoLines } = checkBingo({
      updatedCells,
      clickedPosition: [x, y],
      previousBingoLines: bingoLinesSet,
    });

    if (isCurrentlyMatched) {
      dispatch({ type: "REMOVE_BINGO_LINES", payload: new Set(bingoLines) });
    } else {
      dispatch({ type: "ADD_BINGO_LINES", payload: new Set(bingoLines) });
    }

    dispatch({
      type: "UPDATE_CELLS",
      payload: { cells: updatedCells, shouldCelebrate },
    });

    
  };

  return { cells, isCelebrating, bingoLinesSet, onClickCell };
};

export default useBingo;
