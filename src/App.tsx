import { useState } from "react";
import BingoBoard from "./components/BingoBoard";
import GameStart from "./components/GameStart";

function App() {
  const [hasClicked, setHasClicked] = useState(false);

  const handleClick = () => setHasClicked(prev => !prev);

  return (
    <main className="flex flex-col w-screen h-[100svh] overflow-hidden font-pixelify-sans px-3 pb-[60px] md:py-5 md:px-0 bg-bingo-darkBlue">
      <div
        className={"h-full flex flex-col w-full md:max-w-screen-md md:mx-auto justify-center"}
      >
        {
          hasClicked ? (<BingoBoard handleClick={handleClick} /> ) 
          : (<GameStart handleClick={handleClick} />)
        }  
      </div>
    </main>
  );
}

export default App;
