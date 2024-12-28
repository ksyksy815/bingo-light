"use client";

import BingoCell from "./BingoCell";
import Celebration from "./Celebration";
import CenterCell from "./CenterCell";
import useBingo  from "../hooks/useBingo";
import { useEffect, useState } from "react";
import Modal from "./Modal";

type Props = {
  handleClick: () => void;
}

const BingoBoard = ({ handleClick }: Props) => {
  const size = 5;
  const { cells, isCelebrating, bingoLinesSet, onClickCell } =
    useBingo(size);
   const [bingoCount, setBingoCount] = useState([...bingoLinesSet].length);
  const [animate, setAnimate] = useState(false);
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    const newCount = [...bingoLinesSet].length;
    if (newCount !== bingoCount) {
      setBingoCount(newCount);
      setAnimate(true);
  
      setTimeout(() => setAnimate(false), 3000); 
    }
  }, [bingoLinesSet, bingoCount]);


  return (
    <>
      <div className={'m-3 px-3 flex items-center justify-between text-white'}>
        <span>
           {`Bingo: `}
          <span
            className={`text-bingo-green ${
              animate ? "animate-pulse" : ""
            }`}
          >
            {bingoCount}
          </span>
          </span>
        <button type="button" onClick={() => setOpenModal(true)} className={'hover:underline'}>End this game</button>
      </div>
      <div
      className={
        "relative w-full flex flex-1 border-[3px] border-bingo-lightBlue bg-bingo-foggyBlue rounded-md  max-h-[70svh] md:max-h-full"
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
    <Modal
    isOpen={openModal}
    closeModal={() => setOpenModal(false)}>
      <div className={'flex flex-col gap-5 text-center'}>
        <p className={'text-white text-xl'}>Do you really want to end this game?</p>
        <p className={'text-white text-lg'}>{`You currently have `} <span className={'text-bingo-green'}>{bingoCount}</span>  {`Bingo${bingoCount === 1 ? '' : 's'}!`}</p>
        
        <div className={'w-full flex items-center gap-2'}>
          <button type={'button'} className={'flex-1 bg-bingo-darkBlue hover:bg-bingo-red text-white rounded-lg border-[3px] border-black py-2 px-4 md:max-w-[250px] self-center'}
          onClick={() => setOpenModal(false)}
          >
          CANCEL
        </button>
        <button type={'button'} onClick={handleClick}
          className={'flex-1 bg-bingo-darkBlue hover:bg-bingo-red text-white rounded-lg border-[3px] border-black py-2 px-4 md:max-w-[250px] self-center whitespace-nowrap'}
        >
        END THE GAME
        </button>
        </div>
        
      </div>
      
    </Modal>
    </>
    
  );
};

export default BingoBoard;
