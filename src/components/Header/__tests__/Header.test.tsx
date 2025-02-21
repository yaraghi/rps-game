import { render, screen } from "@testing-library/react";
import { Header } from "../Header";
import { GameContext } from "../../../store/GameContext";
import { Choice } from "../../../domain/models/Choice";
import { expect, vi } from "vitest";

describe("Header", () => {
  test("displays the balance, bet, and lastWin from context", () => {
    // Mock context with a single bet of 500
    const mockContextValue = {
      balance: 3000,
      bets: [{ choice: Choice.ROCK, amount: 500 }],
      lastWin: 1500,
      error: null,
      computerChoice: null,
      result: null,
      matchup: null,
      placeBet: vi.fn(), 
      removeBet: vi.fn(),
      playRound: vi.fn(),
      clearRound: vi.fn(),
    };

    render(
      <GameContext.Provider value={mockContextValue}>
        <Header />
      </GameContext.Provider>
    );

    expect(screen.getByText("BALANCE:")).toBeInTheDocument();
    expect(screen.getByText("3,000")).toBeInTheDocument();

    expect(screen.getByText("BET:")).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();

    expect(screen.getByText("WIN:")).toBeInTheDocument();
    expect(screen.getByText("1,500")).toBeInTheDocument();
  });
});
