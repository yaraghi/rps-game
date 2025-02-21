import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { useGameManager } from "../useGameManager";
import { Bet } from "../../domain/models/Bet";
import { Choice } from "../../domain/models/Choice";
import { BetStatus } from "../../domain/constants";

// Mock RpsGameEngine
vi.mock("../../domain/services/RpsGameEngine", () => ({
  RpsGameEngine: class {
    getRandomChoice = vi.fn(() => Choice.SCISSORS);
    getOutcome = vi.fn((userChoice: Choice) => (userChoice === Choice.ROCK ? "WIN" : "LOSE"));
    computeResult = vi.fn((bets: Bet[]) => ({
      totalWin: bets.reduce((sum, b) => sum + b.amount * 2, 0),
      status: bets.some((b) => b.choice === Choice.ROCK) ? BetStatus.WIN : BetStatus.LOSE,
    }));
  }
}));

describe("useGameManager", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("handles a winning scenario and updates balance", () => {
    const setBalance = vi.fn();
    const setBets = vi.fn();
    const setError = vi.fn();

    const initialBets: Bet[] = [{ choice: Choice.ROCK, amount: 500 }];

    const { result } = renderHook(() =>
      useGameManager(initialBets, setBalance, setBets, setError)
    );

    act(() => {
      result.current.playRound();
    });

    act(() => {
      vi.runAllTimers();
    });

    expect(setBalance).toHaveBeenCalled();
    expect(setBalance).toHaveBeenCalledWith(expect.any(Function));

    const balanceUpdater = setBalance.mock.calls[0][0];
    expect(typeof balanceUpdater).toBe("function");

    const prevBalance = 5000;
    const newBalance = balanceUpdater(prevBalance);
    expect(newBalance).toBeGreaterThan(prevBalance);
  });
});
