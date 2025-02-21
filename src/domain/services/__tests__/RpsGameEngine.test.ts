import { describe, it, expect } from "vitest";
import { RpsGameEngine } from "../RpsGameEngine";
import { Choice } from "../../models/Choice";
import { Bet } from "../../models/Bet";
import { BetStatus } from "../../constants";

const gameEngine = new RpsGameEngine();

describe("RpsGameEngine", () => {
  describe("getOutcome", () => {
    it("returns WIN if the player choice beats the computer choice", () => {
      expect(gameEngine.getOutcome(Choice.ROCK, Choice.SCISSORS)).toBe("WIN");
      expect(gameEngine.getOutcome(Choice.PAPER, Choice.ROCK)).toBe("WIN");
      expect(gameEngine.getOutcome(Choice.SCISSORS, Choice.PAPER)).toBe("WIN");
    });

    it("returns LOSE if the player choice is beaten by the computer choice", () => {
      expect(gameEngine.getOutcome(Choice.ROCK, Choice.PAPER)).toBe("LOSE");
      expect(gameEngine.getOutcome(Choice.PAPER, Choice.SCISSORS)).toBe("LOSE");
      expect(gameEngine.getOutcome(Choice.SCISSORS, Choice.ROCK)).toBe("LOSE");
    });

    it("returns TIE if both choices match", () => {
      expect(gameEngine.getOutcome(Choice.ROCK, Choice.ROCK)).toBe("TIE");
      expect(gameEngine.getOutcome(Choice.PAPER, Choice.PAPER)).toBe("TIE");
      expect(gameEngine.getOutcome(Choice.SCISSORS, Choice.SCISSORS)).toBe("TIE");
    });
  });

  describe("computeResult", () => {
    it("applies the single-bet multiplier (14) for a win when there is only one bet", () => {
      const bets: Bet[] = [{ choice: Choice.ROCK, amount: 500 }];
      const { totalWin, status } = gameEngine.computeResult(bets, Choice.SCISSORS);
      expect(status).toBe(BetStatus.WIN);
      expect(totalWin).toBe(500 * 14);
    });

    it("applies the double-bet multiplier (3) if there are two positions and one wins", () => {
      const bets: Bet[] = [
        { choice: Choice.ROCK, amount: 500 },
        { choice: Choice.PAPER, amount: 500 },
      ];
      // ROCK will win against SCISSORS
      const { totalWin, status } = gameEngine.computeResult(bets, Choice.SCISSORS);
      expect(status).toBe(BetStatus.WIN);
      expect(totalWin).toBe(500 * 3);
    });

    it("returns TIE if no bet is winning but at least one matches the computer choice", () => {
      const bets: Bet[] = [{ choice: Choice.ROCK, amount: 1000 }];
      // Both player and computer choose ROCK
      const { totalWin, status } = gameEngine.computeResult(bets, Choice.ROCK);
      expect(status).toBe(BetStatus.TIE);
      expect(totalWin).toBe(1000);
    });

    it("returns LOSE if there is no winning bet and no tie", () => {
      const bets: Bet[] = [{ choice: Choice.ROCK, amount: 1000 }];
      // Computer chooses PAPER, so player loses
      const { totalWin, status } = gameEngine.computeResult(bets, Choice.PAPER);
      expect(status).toBe(BetStatus.LOSE);
      expect(totalWin).toBe(0);
    });
  });
});
