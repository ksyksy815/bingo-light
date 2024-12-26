import { useCallback, useEffect, useState } from "react";
import { BingoHookReturn, Cell } from "../types";
import { generateBingoBoard } from "../utils";

const useBingo = (size: number): BingoHookReturn => {
  const [cells, setCells] = useState<Cell[][]>(generateBingoBoard(5));

  const [isCelebrating, setIsCelebrating] = useState(false);

  const [bingoLinesSet, setBingoLinesSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isCelebrating) {
      setTimeout(() => {
        setIsCelebrating(false);
      }, 3000);
    }
  }, [isCelebrating]);

  const checkBingo = useCallback(
    ({
      updatedCells,
      clickedPosition,
    }: {
      updatedCells: Cell[][];
      clickedPosition: [number, number];
    }) => {
      const [x, y] = clickedPosition;

      // * 1. Check the row
      const currentRow = updatedCells[x];
      const isCurrentRowBingo = currentRow!.every((cell) => cell.matched);

      // * 2. Check the column
      const isCurrentColBingo = updatedCells.every((row) => row[y]!.matched);

      // * 3. Check the diagonal
      let isDiagonalBingo = false;
      let isReverseDiagonalBingo = false;

      if (x === y) {
        isDiagonalBingo = updatedCells.every(
          (row, rowIndex) => row[rowIndex]?.matched
        );
      }

      // * 4. Check the reverse-diagonal
      else if (y === size - 1 - x) {
        isReverseDiagonalBingo = updatedCells.every(
          (row, rowIndex) => row[size - 1 - rowIndex]?.matched
        );
      }

      const getBingoLines = () => {
        const result: string[] = [];
        if (isCurrentRowBingo) result.push(`row-${x}`);
        if (isCurrentColBingo) result.push(`col-${y}`);
        if (isDiagonalBingo) result.push(`diagonal-1`);
        if (isReverseDiagonalBingo) result.push("diagonal-2");
        return result;
      };

      return {
        shouldCelebrate:
          isCurrentRowBingo ||
          isCurrentColBingo ||
          isDiagonalBingo ||
          isReverseDiagonalBingo,
        bingoLines: getBingoLines(),
      };
    },
    [size]
  );

  const updateCells = (row: number, col: number) => {
    setCells((prevCells) => {
      const updatedCells = prevCells.map((r, i) =>
        r.map((cell, j) =>
          i === row && j === col ? { ...cell, matched: !cell.matched } : cell
        )
      );

      const { shouldCelebrate, bingoLines: newBingoLines } = checkBingo({
        updatedCells,
        clickedPosition: [row, col],
      });

      setIsCelebrating(shouldCelebrate);

      // * Case: Checking a cell
      if (updatedCells[row][col].matched) {
        if (shouldCelebrate) {
          setBingoLinesSet((prev) => new Set([...prev, ...newBingoLines]));
        }
      }
      // * Caee: Unchecking a cell
      else {
        setBingoLinesSet((prev) => {
          if (prev.has(`row-${row}`)) {
            prev.delete(`row-${row}`);
          }

          if (prev.has(`col-${col}`)) {
            prev.delete(`col-${col}`);
          }

          if (prev.has("diagonal-1") && row === col) {
            prev.delete("diagonal-1");
          }

          if (prev.has("diagonal-2") && row === size - col - 1) {
            prev.delete("diagonal-2");
          }

          return new Set([...prev, ...newBingoLines]);
        });
      }

      return updatedCells;
    });
  };

  const removeBingoOnUnmatch = (row: number, col: number) => {
    const shouldUpdate =
      (row === col && bingoLinesSet.has("diagonal-1")) ||
      (row === size - col - 1 && bingoLinesSet.has("diagonal-2"));
    if (
      bingoLinesSet.has(`row-${row}`) ||
      bingoLinesSet.has(`col-${col}`) ||
      shouldUpdate
    ) {
      updateCells(row, col);
      return;
    } else {
      setCells((prevCells) =>
        prevCells.map((r, i) =>
          r.map((cell, j) =>
            i === row && j === col ? { ...cell, matched: false } : cell
          )
        )
      );
    }
  };

  // Handle cell click
  const onClickCell = (row: number, col: number) => {
    const shouldRemove = cells[row][col].matched;

    if (shouldRemove) {
      removeBingoOnUnmatch(row, col);
      return;
    }

    updateCells(row, col);
  };

  return { cells, isCelebrating, bingoLinesSet, onClickCell };
};

export default useBingo;
