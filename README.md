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


---


## Development Notes

- **TypeScript:**  
  The project is built using TypeScript with strict typing enabled to minimize runtime errors.

- **Modular Structure:**  
  The code is organized into distinct layers to separate concerns and make the application easier to maintain and extend:

  - **Domain Layer:**  
    This layer contains the core business logic of the application.  
    - **Models:**  
      - `src/domain/models/Bet.ts` – Defines the structure of a bet (including the bet choice and amount).  
      - `src/domain/models/Choice.ts` – Defines an enum for the available game choices (ROCK, PAPER, SCISSORS).  
    - **Constants:**  
      - `src/domain/constants.ts` – Contains game constants such as the initial balance, bet amount, betting limits, and winning multipliers.
    - **Services:**  
      - `src/domain/services/GameService.ts` – Manages betting operations such as validating, placing, and removing bets.  
      - `src/domain/services/RpsGameEngine.ts` – Handles the game logic by generating a random choice for the computer, determining outcomes (win, tie, or loss), and computing the final result based on the bets.

    *JSDoc comments have been used throughout the domain layer to document models, constants, and services, making the business logic more readable and easier to understand for future maintenance and development.*

  - **Store Layer:**  
    This layer manages the application state using React Context and custom hooks.
    - **Game Context:**  
      - `src/store/GameContext.tsx` – Provides a global context for sharing game state (such as the player's balance, bets, errors, game results, etc.) across the application.
    - **Custom Hooks:**  
      - `src/store/useBetManager.ts` – Handles all betting-related state changes, including placing and removing bets as well as updating the player's balance.
      - `src/store/useGameManager.ts` – Manages the game round by generating the computer's choice, determining the outcome, computing the results, and handling error messages (for example, when no bet is selected).

  - **Presentation Layer:**  
    This layer consists of modular React components responsible for the user interface and interactions.
    - **Header Component:**  
      - `src/components/Header/Header.tsx` – Displays the player's balance, total bet amount, and last win.  
      - `src/components/Header/Header.module.scss` – Contains SCSS styling specific to the Header component.
    - **BettingBoard Component:**  
      - `src/components/BettingBoard/BettingBoard.tsx` – Main component that allows the player to place bets and initiate the game round.  
      - `src/components/BettingBoard/BettingBoard.module.scss` – Provides styling for the BettingBoard component.
    - **Positions Components:**  
      - `src/components/Positions/PositionItem.tsx` – Represents an individual betting position (Rock, Paper, or Scissors).  
      - `src/components/Positions/PositionItem.module.scss` – Contains styles for the PositionItem component.
    - **Result Component:**  
      - `src/components/Result/ResultView.tsx` – Displays the outcome of the game round, such as win, loss, or tie.  
      - `src/components/Result/ResultView.module.scss` – Provides styling for the ResultView component.

- **SCSS Modules:**  
  Component-specific styling is managed using SCSS modules, which ensure that styles are scoped locally. Shared variables and global styles are maintained in:
  - `src/styles/variables.scss` – Contains design tokens like colors, fonts, etc.
  - `src/styles/global.scss` – Contains global styles applied across the entire application.

- **Error Handling:**  
  The application provides user feedback for invalid actions (e.g., attempting to play the game without selecting any betting position) to ensure a smooth user experience.

- **Extensibility:**  
  The project is designed for scalability and maintainability. The modular architecture makes it straightforward to:
  - Extend game features (such as adding new betting options or changing the game rules).
  - Modify or enhance UI components without affecting the underlying business logic.
  - Potentially switch to another framework (e.g., Vue) with minimal code adjustments.

---
