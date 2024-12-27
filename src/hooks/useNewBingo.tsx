import { useCallback, useEffect, useReducer } from "react";
import { bingoReducer, initialBingoState } from "../store/reducer";
import { BingoHookReturn, Cell, Observable } from "../types";

const cellToggledObservable = new Observable<{ row: number; col: number }>();
const bingoAchievedObservable = new Observable<string[]>();

const useNewBingo = (size: number): BingoHookReturn => {
  const [{ cells, isCelebrating, bingoLinesSet }, dispatch] = useReducer(
    bingoReducer,
    initialBingoState(size)
  );
  useEffect(() => {
    if (isCelebrating) {
      bingoAchievedObservable.notify([...bingoLinesSet]);

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
    }: //      previousBingoLines,
    {
      updatedCells: Cell[][];
      clickedPosition: [number, number];
      //previousBingoLines: Set<string>;
    }) => {
      const [x, y] = clickedPosition;

      // Determine if the row, column, or diagonals are still a bingo
      const isRowBingo = updatedCells[x].every((cell) => cell.matched);
      const isColBingo = updatedCells.every((row) => row[y].matched);
      const isDiagonalBingo =
        x === y && updatedCells.every((row, i) => row[i].matched);
      const isReverseDiagonalBingo =
        x === size - y - 1 &&
        updatedCells.every((row, i) => row[size - i - 1].matched);

      const currentBingoLines = new Set<string>();

      if (isRowBingo) currentBingoLines.add(`row-${x}`);
      if (isColBingo) currentBingoLines.add(`col-${y}`);
      if (isDiagonalBingo) currentBingoLines.add("diagonal-1");
      if (isReverseDiagonalBingo) currentBingoLines.add("diagonal-2");

      // Check for bingo lines that are still valid based on the previous state
      const stillValidBingoLines = new Set(
        [...bingoLinesSet].filter((line) => {
          if (line.startsWith("row-")) {
            const rowIndex = parseInt(line.split("-")[1], 10);
            return updatedCells[rowIndex].every((cell) => cell.matched);
          }
          if (line.startsWith("col-")) {
            const colIndex = parseInt(line.split("-")[1], 10);
            return updatedCells.every((row) => row[colIndex].matched);
          }
          if (line === "diagonal-1") {
            return updatedCells.every((row, i) => row[i].matched);
          }
          if (line === "diagonal-2") {
            return updatedCells.every((row, i) => row[size - i - 1].matched);
          }
          return false;
        })
      );

      // Merge the current valid lines with the previously still-valid ones
      const finalBingoLines = new Set([
        ...currentBingoLines,
        ...stillValidBingoLines,
      ]);

      // Find lines that are no longer valid
      const invalidatedBingoLines = [...bingoLinesSet].filter(
        (line) => !finalBingoLines.has(line)
      );

      // Return the result
      return {
        shouldCelebrate: finalBingoLines.size > 0,
        bingoLines: Array.from(finalBingoLines),
        invalidatedBingoLines,
      };
    },
    [size]
  );

  // const updateCells = (row: number, col: number) => {
  //   setCells((prevCells) => {
  //     const updatedCells = prevCells.map((r, i) =>
  //       r.map((cell, j) =>
  //         i === row && j === col ? { ...cell, matched: !cell.matched } : cell
  //       )
  //     );

  //     const { shouldCelebrate, bingoLines: newBingoLines } = checkBingo({
  //       updatedCells,
  //       clickedPosition: [row, col],
  //     });

  //     setIsCelebrating(shouldCelebrate);

  //     // * Case: Checking a cell
  //     if (updatedCells[row][col].matched) {
  //       if (shouldCelebrate) {
  //         setBingoLinesSet((prev) => new Set([...prev, ...newBingoLines]));
  //       }
  //     }
  //     // * Caee: Unchecking a cell
  //     else {
  //       setBingoLinesSet((prev) => {
  //         if (prev.has(`row-${row}`)) {
  //           prev.delete(`row-${row}`);
  //         }

  //         if (prev.has(`col-${col}`)) {
  //           prev.delete(`col-${col}`);
  //         }

  //         if (prev.has("diagonal-1") && row === col) {
  //           prev.delete("diagonal-1");
  //         }

  //         if (prev.has("diagonal-2") && row === size - col - 1) {
  //           prev.delete("diagonal-2");
  //         }

  //         return new Set([...prev, ...newBingoLines]);
  //       });
  //     }

  //     return updatedCells;
  //   });
  // };

  // const removeBingoOnUnmatch = (row: number, col: number) => {
  //   const shouldUpdate =
  //     (row === col && bingoLinesSet.has("diagonal-1")) ||
  //     (row === size - col - 1 && bingoLinesSet.has("diagonal-2"));
  //   if (
  //     bingoLinesSet.has(`row-${row}`) ||
  //     bingoLinesSet.has(`col-${col}`) ||
  //     shouldUpdate
  //   ) {
  //     updateCells(row, col);
  //     return;
  //   } else {
  //     setCells((prevCells) =>
  //       prevCells.map((r, i) =>
  //         r.map((cell, j) =>
  //           i === row && j === col ? { ...cell, matched: false } : cell
  //         )
  //       )
  //     );
  //   }
  // };

  // Handle cell click
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
    });

    if (isCurrentlyMatched) {
      console.log("111");
      dispatch({ type: "REMOVE_BINGO_LINES", payload: bingoLines });
    } else {
      console.log("222");
      dispatch({ type: "ADD_BINGO_LINES", payload: bingoLines });
    }

    dispatch({
      type: "UPDATE_CELLS",
      payload: { cells: updatedCells, shouldCelebrate },
    });

    // * Notifying observers about the toggle
    cellToggledObservable.notify({ row: x, col: y });
  };

  return { cells, isCelebrating, bingoLinesSet, onClickCell };
};

export { bingoAchievedObservable, cellToggledObservable, useNewBingo };
