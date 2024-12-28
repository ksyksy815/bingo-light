# Welcome to Conference Bingo Blast! 💠
Thanks for giving me the opportunity to participate in this fun coding project! In this readme, I have briefly summarized what I have done with the project. Please feel free to read it and enjoy the game!
The web app is deployed [here](https://conference-bingo-blast.vercel.app/).

## Technologies Used
### 1. React
- React was used as the core library for building the interactive and dynamic UI.
- Features like ```useState``` and ```useReducer``` were utilized for efficient state management, while custom hooks like useBingo were created for encapsulating game logic.

### 2. Vite
- Vite served as the build tool, offering lightning-fast development and HMR (Hot Module Replacement).

### 3. Tailwind CSS
- Tailwind CSS was used for styling the application, providing a utility-first approach for quickly iterating on design.
- Custom utility classes were created, like ```.text-shadow```, to handle specific design requirements.


### 4. TypeScript
- TypeScript was adopted to bring static typing and improve code reliability.
- Types like ```Cell``` and ```BingoState``` enhance maintainability and provide strong guarantees about the app’s behavior.

### 5. Vercel
- The application is deployed on Vercel, leveraging its powerful platform for hosting modern web applications.

<br/>

## How to Play

1. Open the web app using this [link 🔗](https://conference-bingo-blast.vercel.app/).
2. If you click "Game Start", you'll see a 5x5 bingo board filled with phrases related to common conference call situations.
3. Click on a cell when the corresponding event occurs during your meeting.
4. Try to achieve a bingo by completing a row, column, or diagonal.
5. Celebrate with Dobby when you get a bingo! 🎉


## Directory Structure
The project is organized into the following directories for maintainability and scalability:

```
src/
├── components/       # Reusable React components
│   ├── BingoBoard.tsx     # Main bingo board component
│   ├── BingoCell.tsx     # Individual bingo cell component
│   ├── Celebration.tsx   # Celebration effects for bingo
│   ├── CenterCell.tsx    # Special center cell component
│   ├── GameStart.tsx    # The initial component to show before starting a game
│   ├── Modal.tsx    # A simple modal
│   ├── TiltedContainer.tsx    # A reusable container component with hover effect
│   └── Title.tsx # Bingo title component
│
├── hooks/            # Custom React hooks
│   └── useBingo.ts       # Core hook for bingo logic
│
├── bingo.reducer.ts            # useReducer reducer for bingo state management
├── constants/        # Static values used throughout the app
├── types/            # TypeScript type definitions
├── utils.ts            # Utility functions
```


## Core Concepts
### 1. Bingo Logic
State Management: Uses useReducer for efficient state updates.

### 2. Modular Design
Each component is independent and reusable.
Utility functions like generateBingoBoard and checkBingo are kept separate for easy testing and debugging.

### 3. Styling
Built with Tailwind CSS for rapid styling and consistent design.
Custom utility classes like .text-shadow and .title-stroke.
