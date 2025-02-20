import { Bet } from "../models/Bet";
import { Choice } from "../models/Choice";
import { BET_AMOUNT, MAX_BET_POSITIONS } from "../constants";

/**
 * Service for managing bet operations in the game.
 */
export class GameService {
  /**
   * Checks whether a new bet can be placed for the given choice.
   * @param bets - The current array of bets.
   * @param choice - The choice for the new bet.
   * @param balance - The current player balance.
   * @returns An error message if betting is not allowed, otherwise null.
   */
  canPlaceBet(bets: Bet[], choice: Choice, balance: number): string | null {
    const uniquePositions = new Set(bets.map((b) => b.choice));
    if (!uniquePositions.has(choice) && uniquePositions.size === MAX_BET_POSITIONS) {
      return "Cannot bet on more than two positions.";
    }
    if (balance < BET_AMOUNT) {
      return "Insufficient balance to place bet.";
    }
    return null;
  }

  /**
   * Places a new bet for the given choice.
   * If a bet for that choice already exists, the bet amount is increased.
   * @param bets - The current array of bets.
   * @param choice - The choice to bet on.
   * @returns The updated array of bets.
   */
  placeBet(bets: Bet[], choice: Choice): Bet[] {
    const existingBet = bets.find((b) => b.choice === choice);
    if (existingBet) {
      return bets.map((b) =>
        b.choice === choice ? { ...b, amount: b.amount + BET_AMOUNT } : b
      );
    } else {
      return [...bets, { choice, amount: BET_AMOUNT }];
    }
  }

  /**
   * Removes a bet for the given choice and returns the amount to be refunded.
   * If the bet amount is less than or equal to BET_AMOUNT, the bet is removed.
   * Otherwise, the bet amount is decreased and BET_AMOUNT is returned.
   * @param bets - The current array of bets.
   * @param choice - The choice for which the bet should be removed.
   * @returns An object containing the updated bets array and the returned amount.
   * @throws Error if no bet exists for the given choice.
   */
  removeBet(bets: Bet[], choice: Choice): { newBets: Bet[]; returnedAmount: number } {
    const existingBet = bets.find((b) => b.choice === choice);
    if (!existingBet) {
      throw new Error("No bet exists for this choice to remove.");
    }
    if (existingBet.amount <= BET_AMOUNT) {
      return {
        newBets: bets.filter((b) => b.choice !== choice),
        returnedAmount: existingBet.amount,
      };
    } else {
      return {
        newBets: bets.map((b) =>
          b.choice === choice ? { ...b, amount: b.amount - BET_AMOUNT } : b
        ),
        returnedAmount: BET_AMOUNT,
      };
    }
  }
}
