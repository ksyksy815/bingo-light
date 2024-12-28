import Title from "./Title";

type Props = {  
  handleClick: () => void 
}

const GameStartButton = ( {handleClick}: Props) => {
  return (
    <div  className={'w-full flex flex-col items-center my-auto'}>
      <Title />
    <button type={'button'} onClick={handleClick}
    className={'bg-bingo-foggyBlue hover:bg-bingo-red text-white text-xl rounded-lg border-[3px] border-black py-2 px-4 md:max-w-[250px] self-center'}
    >
      GAME START
    </button>
    </div>
    
  )
}

export default GameStartButton