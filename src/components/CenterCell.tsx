import { useState } from "react";

type Props = {
  isCelebrating: boolean;
};

const CenterCell = ({ isCelebrating = false }: Props) => {
  const [animate, setAnimate] = useState(false);
  const [showLight, setShowLight] = useState(false);

  return (
    <div
      className={"relative w-full h-full flex justify-center items-center"}
      onMouseEnter={() => {
        setShowLight(true);
        setAnimate(true);
      }}
      onMouseLeave={() => {
        setShowLight(false);
        setAnimate(false);
      }}
    >
      {showLight && (
        <div
          className={
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-white/50 rounded-full blur"
          }
        />
      )}
      <img
        src={"/images/diamond-80.svg"}
        className={`scale-75 md:scale-100 ${animate ? "animate-spin" : ""}`}
      />

      {isCelebrating && (
        <>
          <div className={"absolute top-2 left-4 animate-pulse"}>
            <div
              className={
                "absolute top-3 right-1 h-5 w-5 min-w-5 bg-white/50 rounded-full blur-md"
              }
            />
            <img
              src={"/images/sparkle.svg"}
              className={"scale-75 md:scale-100"}
            />
          </div>

          <div className={"absolute bottom-5 right-3 animate-pulse"}>
            <div
              className={
                "absolute top-3 right-1 h-3 w-3 min-w-3 bg-white/50 rounded-full blur-md"
              }
            />
            <img
              src={"/images/sparkle.svg"}
              className={"scale-50 md:scale-25 "}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CenterCell;
