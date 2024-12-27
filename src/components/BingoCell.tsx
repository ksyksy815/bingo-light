import { Cell } from "../types";
import TiltedContainer from "./TiltedContainer";

type Props = {
  cell: Cell;
  shouldHighlight: boolean;
  onClick: () => void;
};

const BingoCell = ({ cell, shouldHighlight = false, onClick }: Props) => {
  // // * Subscribing to the observables
  // useEffect(() => {
  //   // * 1. Cell toggled
  //   const handleCellToggle = ({ row, col }: { row: number; col: number }) => {
  //     console.log("빙고셀을 누가 클릭했다고 여기서", row, col);
  //   };

  //   // * 2. Bingo achieved
  //   const handleBingoAchieved = (bingoLines: string[]) => {
  //     console.log("빙고를 완성했다고: ", bingoLines);
  //   };

  //   // * 3. Subscribing
  //   cellToggledObservable.subscribe(handleCellToggle);
  //   bingoAchievedObservable.subscribe(handleBingoAchieved);

  //   // * 4. Cleanup
  //   return () => {
  //     cellToggledObservable.unsubscribe(handleCellToggle);
  //     bingoAchievedObservable.unsubscribe(handleBingoAchieved);
  //   };
  // }, []);

  return (
    <TiltedContainer className="overflow-hidden transition-transform duration-300 ease-out rounded-md">
      <div
        className={`h-full cursor-pointer flex-1 flex items-center justify-center border text-center border-black p-2 text-[9px] md:text-sm ${
          cell.matched
            ? shouldHighlight
              ? "bg-green-300/50 text-white line-through"
              : "bg-bingo-lightBlue/30 text-white line-through"
            : "bg-bingo-darkBlue text-white hover:bg-bingo-darkBlue/80"
        }`}
        onClick={onClick}
      >
        {cell.sentence}
      </div>
    </TiltedContainer>
  );
};

export default BingoCell;
