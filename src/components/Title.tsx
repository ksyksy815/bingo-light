const Title = () => {
  return (
    <header className={"py-5 relative w-full md:max-w-[360px] self-center"}>
      <div className={"blue-gradient"}>
        <div className={"absolute -top-3 left-0 scale-50 -rotate-12"}>
          <img src={"/images/diamond-80.svg"} />
        </div>

        <div className={"w-full flex items-center justify-between px-2"}>
          <img
            src={"/images/lights.svg"}
            className={"h-full w-[5px] object-cover"}
          />
          <h1 className={"uppercase text-6xl text-white text-shadow"}>BINGO</h1>
          <img
            src={"/images/lights.svg"}
            className={"h-full w-[5px] object-cover"}
          />
        </div>

        <div className={"absolute -bottom-3 right-1 scale-[0.4] rotate-12"}>
          <img src={"/images/diamond-80.svg"} />
        </div>
      </div>
    </header>
  );
};

export default Title;
