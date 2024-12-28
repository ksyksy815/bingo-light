import { Cell } from "../types";
import TiltedContainer from "./TiltedContainer";

type Props = {
  cell: Cell;
  shouldHighlight: boolean;
  onClick: () => void;
};

const BingoCell = ({ cell, shouldHighlight = false, onClick }: Props) => {
  return (
    <TiltedContainer className="overflow-hidden transition-transform duration-300 ease-out rounded-md">
      <div
        className={`h-full cursor-pointer flex-1 flex items-center justify-center text-center p-2 text-[9px] md:text-sm ${
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
