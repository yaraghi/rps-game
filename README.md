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


## Development Notes

- **TypeScript:** The project is built with strict typing to minimize runtime errors.
- **Modular Structure:** Code is organized into distinct layers:
  - **Domain Layer:** Contains models, constants, and services. *JSDoc comments have been used to document these files, making the business logic more readable and easier to understand for future maintenance and development.*
  - **Store Layer:** Manages state via React Context and custom hooks.
  - **Presentation Layer:** Consists of modular React components, each with its own SCSS module for styling.
- **SCSS Modules:** Component-specific styling is handled using SCSS modules, while shared variables and global styles are maintained in `global.scss` and `variables.scss`.
- **Error Handling:** The game provides user feedback when invalid actions are performed (e.g., trying to play without selecting a position).
- **Extensibility:** The project is designed for easy scalability and maintenance. Future changes in game specifications or even switching to another framework (e.g., Vue) would require minimal code adjustments.

---

## Quick Start

1. **Clone the repository:**
   git clone https://github.com/yaraghi/rps-game.git
   cd rps-game

2. **Install dependencies:**
   npm install

3. **Run in development mode:**
   npm run dev

4. **Build the project:**
   npm run build

5. **Preview the built app:**
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

## Final Overview

In this project, I developed a React application using TypeScript with strict typing, implementing a Rock-Paper-Scissors game with betting functionality. The game starts with a balance of 5000, and each bet costs 500. A player can place bets on up to two positions per game. The winning multipliers are set to 14x for a single bet and 3x for double bets. The game rules ensure that only one bet wins per round; if there is a tie (i.e., the player's choice matches the computer's choice), the bet amount is returned, and a tie is treated as a loss in terms of winning a multiplier.

The project is structured into distinct layers:
- **Domain Layer:** Contains the business logic, including models (Bet and Choice), constants, and services (GameService and RpsGameEngine) that handle the core game mechanics.
- **Store Layer:** Manages application state through React Context and custom hooks (useBetManager and useGameManager), which handle betting operations, balance updates, and game round management.
- **Presentation Layer:** Comprises modular UI components (Header, BettingBoard, PositionItem, ResultView) that utilize SCSS modules for styling, with shared styles and variables maintained in the global styles folder.

