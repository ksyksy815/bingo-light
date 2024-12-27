import NewBingoBoard from "./components/NewBingoBoard";
import Title from "./components/Title";

function App() {
  return (
    <main className="w-screen h-[100svh] overflow-hidden font-pixelify-sans px-3 pb-[60px] md:py-5 md:px-0 bg-bingo-darkBlue">
      <div
        className={"h-full flex flex-col w-full md:max-w-screen-md md:mx-auto"}
      >
        <Title />
        <NewBingoBoard />
      </div>
    </main>
  );
}

export default App;
