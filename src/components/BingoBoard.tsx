"use client";

import BingoCell from "./BingoCell";
import Celebration from "./Celebration";
import CenterCell from "./CenterCell";
import useBingo  from "../hooks/useBingo";

const BingoBoard = () => {
  const size = 5;
  const { cells, isCelebrating, bingoLinesSet, onClickCell } =
    useBingo(size);
console.log('bingoLinesSet:',bingoLinesSet)
  return (
    <div
      className={
        "relative w-full flex flex-1 border-[3px] border-bingo-lightBlue bg-bingo-foggyBlue rounded-md"
      }
    >
      <div
        className={`flex-1 w-full grid grid-cols-5 grid-rows-5 gap-[3px] border-[3px] border-bingo-foggyBlue rounded-md`}
      >
        {cells.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const rowName = `r${rowIndex}`;
            const colName = `c${colIndex}`;
            const shouldCheckDiagonal = rowIndex === colIndex;
            const shouldCheckReverseDiagonal =
              shouldCheckDiagonal || rowIndex === size - colIndex - 1;
            const diagonalName = shouldCheckDiagonal
              ? "d1"
              : shouldCheckReverseDiagonal
              ? "d2"
              : "";

            const shouldHighlight =
              bingoLinesSet.has(rowName) ||
              bingoLinesSet.has(colName) ||
              bingoLinesSet.has(diagonalName);

            if (rowIndex === 2 && colIndex === 2) {
              return (
                <CenterCell
                  key={"center-diamond"}
                  isCelebrating={isCelebrating}
                />
              );
            }

            return (
              <BingoCell
                key={cell.sentence}
                cell={cell}
                shouldHighlight={shouldHighlight}
                onClick={() => onClickCell(rowIndex, colIndex)}
              />
            );
          })
        )}
      </div>

      {isCelebrating && <Celebration />}
    </div>
  );
};

export default BingoBoard;
