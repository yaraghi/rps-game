# RPS Game

This project is a **React + TypeScript** application implementing a Rock-Paper-Scissors (RPS) game with betting functionality.

---

## Game Specifications

- **Initial Balance**: The player starts with **5000**.
- **Bet Amount**: Each bet is **500**. A player can stack multiple bets on the same option (e.g., 500, 1000, 1500, etc.).
- **Betting Limit**: The player **cannot bet on more than 2 positions** in a single round.
- **Winning Rates**:
  - **Single position**: If the player places a bet on exactly one option and wins, the return is **14×** the bet.
  - **Two positions**: If the player places bets on two options in the same round and wins, the return is **3×** each winning bet.
- **Game Rules**:
  - Three betting positions: **Rock**, **Paper**, **Scissors**.
  - A player can **bet on one or two** of these positions but not all three simultaneously.
  - The bet amount is **deducted** from the balance immediately upon placing the bet.
  - When the user is done betting, they click a button to have the computer randomly pick Rock, Paper, or Scissors.
  - The player's choice(s) are compared against the computer's choice.
  - **Only one bet can win** per round; a tie generally counts as a loss (though the bet is returned for a tie, no additional profit is gained).
  - If the player loses, the bet(s) are not returned.
  - If the player's balance is **less than 500**, they cannot place any new bets.

---

## Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yaraghi/rps-game.git
   cd rps-game
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run in development mode**:
   ```bash
   npm run dev
   ```

4. **Build the project**:
   ```bash
   npm run build
   ```

5. **Preview the built app**:
   ```bash
   npm run preview
   ```

---

## Running Tests

This project uses [**Vitest**](https://vitest.dev/) for both **unit** and **integration** tests.

- **Run all tests**:
  ```bash
  npm run test
  ```

- **Watch mode** (re-run tests on file changes):
  ```bash
  npm run test:watch
  ```

- **Coverage report**:
  ```bash
  npm run test:coverage
  ```

### Testing Guidelines

- Tests are located alongside the relevant modules in `__tests__` folders.
- Components are tested with [**@testing-library/react**](https://testing-library.com/docs/react-testing-library/intro/).
- **`vi.mock()`** is used to mock dependencies such as game services, enabling deterministic test outcomes.

---

## Development Notes

### TypeScript
- The entire project is built with **TypeScript** in **strict** mode to minimize runtime errors and improve code reliability.

### Modular Architecture

#### **Domain Layer**
- **Models**  
  - `src/domain/models/Bet.ts`: Defines the structure of a bet (choice + amount).  
  - `src/domain/models/Choice.ts`: Enum for valid RPS choices: ROCK, PAPER, SCISSORS.
- **Constants**  
  - `src/domain/constants.ts`: Holds constants such as the initial balance, bet amount, and winning multipliers.
- **Services**  
  - `src/domain/services/GameService.ts`: Manages betting logic (validation, adding, removing bets).  
  - `src/domain/services/RpsGameEngine.ts`: Handles game mechanics such as randomizing the computer’s choice and computing the final result (win, lose, or tie).

#### **Store Layer**
- **Context & Custom Hooks**  
  - `src/store/GameContext.tsx`: A React Context that provides global game state (balance, bets, errors, game results, etc.).  
  - `src/store/useBetManager.ts`: Custom hook that handles placing and removing bets, updating balance accordingly.  
  - `src/store/useGameManager.ts`: Custom hook to manage the game round, including running the computer’s choice, computing outcomes, and clearing the round.

#### **Presentation Layer**
- **Header**  
  - `src/components/Header/Header.tsx`: Displays the balance, total bet amount, and last win.  
  - `src/components/Header/Header.module.scss`: SCSS module for the Header component.
- **BettingBoard**  
  - `src/components/BettingBoard/BettingBoard.tsx`: Main section for placing bets and starting the RPS round.  
  - `src/components/BettingBoard/BettingBoard.module.scss`: SCSS module for the BettingBoard component.
- **Positions**  
  - `src/components/Positions/PositionItem.tsx`: Individual bet positions (Rock, Paper, Scissors).  
  - `src/components/Positions/PositionItem.module.scss`: SCSS module for the PositionItem component.
- **Result**  
  - `src/components/Result/ResultView.tsx`: Shows the outcome (win, lose, tie) after the round.  
  - `src/components/Result/ResultView.module.scss`: SCSS module for the ResultView component.

### SCSS Modules
- Styles are scoped per component, preventing global style conflicts.
- Shared variables are in:
  - `src/styles/variables.scss`  
  - `src/styles/global.scss`

### Error Handling
- The app provides user feedback for invalid actions (like trying to play with no bets).

### Extensibility
- The clear separation of **domain**, **store**, and **UI** allows for painless refactoring.
- **Easily switch** to a different state management solution or even a different front-end framework by adjusting only the relevant layers.
- Adding new game features or updating bet rules requires minimal changes in the domain layer.

