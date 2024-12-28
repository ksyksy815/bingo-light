import { BINGO_ITEMS } from "./constants";
import { Cell } from "./types";

export const generateBingoBoard = (size: number): Cell[][] => {
  const shuffledItems = [...BINGO_ITEMS].sort(() => Math.random() - 0.5);
  const requiredItems = shuffledItems.slice(0, size * size - 1);
  const bingoBoard: Cell[][] = [];
  
  let index = 0;

  for (let row = 0; row < size; row++) {
    const rowArray: Cell[] = [];

    for (let col = 0; col < size; col++) {
      if (row === Math.floor(size / 2) && col === Math.floor(size / 2)) {
        rowArray.push({ sentence: "", matched: true });
      }
      
      else {
        rowArray.push({ sentence: requiredItems[index], matched: false });
        index++;
      }
    }
    bingoBoard.push(rowArray);
  }

  return bingoBoard;
};
