import { describe, it, expect } from "vitest";
import { GameService } from "../GameService";
import { Bet } from "../../models/Bet";
import { Choice } from "../../models/Choice";
import { BET_AMOUNT } from "../../constants";

const gameService = new GameService();

describe("GameService", () => {
  describe("canPlaceBet", () => {
    it("returns an error if the balance is below the bet amount", () => {
      const bets: Bet[] = [];
      const error = gameService.canPlaceBet(bets, Choice.ROCK, 400); // insufficient balance
      expect(error).toBe("Insufficient balance to place bet.");
    });

    it("returns an error if trying to place a bet on a third choice", () => {
      const bets: Bet[] = [
        { choice: Choice.ROCK, amount: 500 },
        { choice: Choice.PAPER, amount: 500 },
      ];
      const error = gameService.canPlaceBet(bets, Choice.SCISSORS, 2000);
      expect(error).toBe("Cannot bet on more than two positions.");
    });

    it("returns null if the bet can be placed", () => {
      const bets: Bet[] = [{ choice: Choice.ROCK, amount: 500 }];
      const error = gameService.canPlaceBet(bets, Choice.PAPER, 2000);
      expect(error).toBeNull();
    });
  });

  describe("placeBet", () => {
    it("adds a new bet if the choice does not already exist", () => {
      const bets: Bet[] = [{ choice: Choice.ROCK, amount: 500 }];
      const newBets = gameService.placeBet(bets, Choice.PAPER);
      expect(newBets).toHaveLength(2);
      expect(newBets.find((b) => b.choice === Choice.PAPER)?.amount).toBe(BET_AMOUNT);
    });

    it("increases the bet amount if a bet on the same choice already exists", () => {
      const bets: Bet[] = [{ choice: Choice.ROCK, amount: 500 }];
      const newBets = gameService.placeBet(bets, Choice.ROCK);
      expect(newBets).toHaveLength(1);
      expect(newBets[0].amount).toBe(1000);
    });
  });

  describe("removeBet", () => {
    it("removes the bet entirely if amount is less or equal to BET_AMOUNT", () => {
      const bets: Bet[] = [{ choice: Choice.ROCK, amount: 500 }];
      const { newBets, returnedAmount } = gameService.removeBet(bets, Choice.ROCK);
      expect(newBets).toHaveLength(0);
      expect(returnedAmount).toBe(500);
    });

    it("reduces the bet by BET_AMOUNT if amount is greater than BET_AMOUNT", () => {
      const bets: Bet[] = [{ choice: Choice.ROCK, amount: 1500 }];
      const { newBets, returnedAmount } = gameService.removeBet(bets, Choice.ROCK);
      expect(newBets).toHaveLength(1);
      expect(newBets[0].amount).toBe(1000);
      expect(returnedAmount).toBe(500);
    });

    it("throws an error if the bet does not exist for the given choice", () => {
      const bets: Bet[] = [{ choice: Choice.ROCK, amount: 500 }];
      expect(() => gameService.removeBet(bets, Choice.SCISSORS)).toThrowError(
        "No bet exists for this choice to remove."
      );
    });
  });
});
