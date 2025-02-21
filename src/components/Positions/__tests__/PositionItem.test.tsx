import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PositionItem } from "../PositionItem";
import { GameContext } from "../../../store/GameContext";
import { Choice } from "../../../domain/models/Choice";

describe("PositionItem", () => {
  it("shows the choice label", () => {
    const mockContextValue = {
      bets: [],
      placeBet: vi.fn(),
      removeBet: vi.fn(),
      result: null,
      matchup: null,
      balance: 5000,
      error: null,
      lastWin: 0,
      playRound: vi.fn(),
      clearRound: vi.fn(),
      computerChoice: null, 
    };

    render(
      <GameContext.Provider value={mockContextValue}>
        <PositionItem choice={Choice.ROCK} />
      </GameContext.Provider>
    );

    expect(screen.getByText("ROCK")).toBeInTheDocument();
  });

  it("calls placeBet on click when there is no result or matchup", () => {
    const mockContextValue = {
      bets: [],
      placeBet: vi.fn(),
      removeBet: vi.fn(),
      result: null,
      matchup: null,
      balance: 5000,
      error: null,
      lastWin: 0,
      playRound: vi.fn(),
      clearRound: vi.fn(),
      computerChoice: null, 
    };

    render(
      <GameContext.Provider value={mockContextValue}>
        <PositionItem choice={Choice.ROCK} />
      </GameContext.Provider>
    );

    const rockElement = screen.getByText("ROCK");
    fireEvent.click(rockElement);
    expect(mockContextValue.placeBet).toHaveBeenCalledWith(Choice.ROCK);
  });
});
