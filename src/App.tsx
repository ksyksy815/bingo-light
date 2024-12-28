import { useState } from "react";
import BingoBoard from "./components/BingoBoard";
import Title from "./components/Title";
import GameStartButton from "./components/GameStartButton";

function App() {
  const [startGame, setStartGame] = useState(false);

  const handleClick = () => setStartGame(true);

  return (
    <main className="flex flex-col w-screen h-[100svh] overflow-hidden font-pixelify-sans px-3 pb-[60px] md:py-5 md:px-0 bg-bingo-darkBlue">
      <div
        className={"h-full flex flex-col w-full md:max-w-screen-md md:mx-auto"}
      >
        <Title />
        {
          startGame ? <BingoBoard /> : <GameStartButton handleClick={handleClick} />
        }
        
      </div>
    </main>
  );
}

export default App;
