# RPS Game

This project is a React application built using TypeScript with strict typing. It implements a Rock-Paper-Scissors game with the ability to bet on the winning position.

## Game Specifications

- **Initial Balance:** The player starts with a balance of 5000.
- **Bet Amount:** Each bet is 500 (the player can place multiple bets on a position, e.g., 500, 1000, 1500, etc.).
- **Betting Limit:** The player cannot bet on more than 2 positions in a single game.
- **Winning Rates:**
  - If the player bets on 1 position and wins, the return is 14 times the bet.
  - If the player bets on 2 positions and wins, the return is 3 times the bet.
- **Game Rules:**
  - There are three betting positions: rock, paper, and scissors.
  - The player can bet on rock, paper, or scissors, but not on all three simultaneously.
  - The bet amount is deducted from the balance when a bet is placed.
  - When the "betting done" button is clicked, the computer runs a random Rock-Paper-Scissors match.
  - The player's choice is compared to the computer's choice. Only one bet can win; every tie is considered a loss (though the bet amount is returned in case of a tie).
  - If the player wins, the return is added to the balance based on the respective multiplier.
  - If the player loses, the bet is not returned.
  - The player cannot bet if their balance is less than the available bet amount.

## Project Structure

rps-game/
├── node_modules/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── index.html
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── domain/
    │   ├── constants.ts
    │   ├── models/
    │   │   ├── Bet.ts
    │   │   └── Choice.ts
    │   └── services/
    │       ├── GameService.ts
    │       └── RpsGameEngine.ts
    ├── store/
    │   ├── GameContext.tsx
    │   ├── useBetManager.ts
    │   └── useGameManager.ts
    ├── components/
    │   ├── Header/
    │   │   ├── Header.tsx
    │   │   └── Header.module.scss
    │   ├── BettingBoard/
    │   │   ├── BettingBoard.tsx
    │   │   └── BettingBoard.module.scss
    │   ├── Positions/
    │   │   ├── PositionItem.tsx
    │   │   └── PositionItem.module.scss
    │   └── Result/
    │       ├── ResultView.tsx
    │       └── ResultView.module.scss
    └── styles/
        ├── global.scss
        └── variables.scss



## Installation and Running the App

1. **Install dependencies:**
npm install

2. **Run in development mode:**
npm run dev

3. **Build the project:**
npm run build

4. **Preview the built app:**
npm run preview


## Development Notes

- **TypeScript:** The project is built with strict typing to minimize runtime errors.
- **Modular Structure:** Code is organized into domain (models and services), store (state management), and components (UI) directories.
- **SCSS Modules:** Component-specific styling is handled using SCSS modules, while shared variables and global styles are managed in `global.scss` and `variables.scss`.
- **Extensibility:** The project is designed to be flexible and maintainable. Changes in game specifications or even a switch to another framework (e.g., Vue) should require minimal code adjustments.

## Future Enhancements

- Add unit and integration tests for core functionalities (game logic, betting management, and state management).
- Improve the UI based on provided mockups.
- Extend betting features or add new functionality based on user feedback.