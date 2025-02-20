import { Choice } from "../models/Choice";
import { Bet } from "../models/Bet";
import { WIN_MULTIPLIERS, BetStatus } from "../constants";

/**
 * Service responsible for handling the game logic for Rock-Paper-Scissors.
 */
export class RpsGameEngine {
  /**
   * A fixed array of all possible choices.
   * This avoids issues when using const enums with Object.values.
   */
  private readonly ALL_CHOICES: Choice[] = [Choice.ROCK, Choice.PAPER, Choice.SCISSORS];

  /**
   * Returns a random choice from all available choices.
   * @returns A random Choice.
   */
  getRandomChoice(): Choice {
    const randomIndex = Math.floor(Math.random() * this.ALL_CHOICES.length);
    return this.ALL_CHOICES[randomIndex];
  }

  /**
   * Determines the outcome between the player's and the computer's choice.
   * @param player - The player's choice.
   * @param computer - The computer's choice.
   * @returns "WIN" if the player wins, "TIE" for a tie, and "LOSE" otherwise.
   */
  getOutcome(player: Choice, computer: Choice): "WIN" | "TIE" | "LOSE" {
    if (player === computer) return "TIE";
    if (
      (player === Choice.ROCK && computer === Choice.SCISSORS) ||
      (player === Choice.SCISSORS && computer === Choice.PAPER) ||
      (player === Choice.PAPER && computer === Choice.ROCK)
    ) {
      return "WIN";
    }
    return "LOSE";
  }

  /**
   * Computes the final result of a game round based on the player's bets and the computer's choice.
   * Only one bet can win; ties refund the bet.
   * @param bets - The player's bets.
   * @param computerChoice - The computer's randomly chosen option.
   * @returns An object containing the total win amount and the bet status (WIN, TIE, or LOSE).
   */
  computeResult(bets: Bet[], computerChoice: Choice): { totalWin: number; status: BetStatus } {
    const outcomes = bets.map((bet) => ({
      bet,
      outcome: this.getOutcome(bet.choice, computerChoice),
    }));

    // Consider only the first winning bet if any win exists
    const winningOutcome = outcomes.find((o) => o.outcome === "WIN");
    if (winningOutcome) {
      const multiplier = bets.length === 1 ? WIN_MULTIPLIERS.SINGLE_BET : WIN_MULTIPLIERS.DOUBLE_BET;
      return { totalWin: winningOutcome.bet.amount * multiplier, status: BetStatus.WIN };
    }

    // If no win but there is a tie, refund the total bet amount
    const tieOutcome = outcomes.find((o) => o.outcome === "TIE");
    if (tieOutcome) {
      const totalBet = bets.reduce((sum, b) => sum + b.amount, 0);
      return { totalWin: totalBet, status: BetStatus.TIE };
    }

    // Otherwise, the player loses
    return { totalWin: 0, status: BetStatus.LOSE };
  }
}
