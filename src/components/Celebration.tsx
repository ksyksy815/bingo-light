import Confetti from "react-confetti";

const Celebration = () => {
  return (
    <>
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <div className={"absolute bottom-0 right-0 h-[382px] w-[288px]"}>
        <img
          src={"/images/dancing-dobby.gif"}
          className={"w-[288px] object-right"}
        />
      </div>
    </>
  );
};

export default Celebration;
