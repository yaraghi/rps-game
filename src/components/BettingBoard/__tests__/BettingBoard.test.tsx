import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BettingBoard } from "../BettingBoard";
import { GameContext } from "../../../store/GameContext";
import { BetStatus } from "../../../domain/constants"; 
describe("BettingBoard", () => {
  it("displays 'PICK YOUR POSITIONS' when no result and no matchup", () => {
    const mockContextValue = {
      playRound: vi.fn(),
      clearRound: vi.fn(),
      result: null,
      error: null,
      matchup: null,
      bets: [],
      balance: 5000,
      lastWin: 0,
      placeBet: vi.fn(),
      removeBet: vi.fn(),
      computerChoice: null, 
    };

    render(
      <GameContext.Provider value={mockContextValue}>
        <BettingBoard />
      </GameContext.Provider>
    );

    expect(screen.getByText("PICK YOUR POSITIONS")).toBeInTheDocument();
    const playButton = screen.getByRole("button", { name: /play/i });
    expect(playButton).toBeInTheDocument();
  });

  it("calls playRound when the Play button is clicked", () => {
    const mockContextValue = {
      playRound: vi.fn(),
      clearRound: vi.fn(),
      result: null,
      error: null,
      matchup: null,
      bets: [],
      balance: 5000,
      lastWin: 0,
      placeBet: vi.fn(),
      removeBet: vi.fn(),
      computerChoice: null,
    };

    render(
      <GameContext.Provider value={mockContextValue}>
        <BettingBoard />
      </GameContext.Provider>
    );

    const playButton = screen.getByRole("button", { name: /play/i });
    fireEvent.click(playButton);
    expect(mockContextValue.playRound).toHaveBeenCalled();
  });

  it("shows the Clear button instead of Play when there is a result", () => {
    const mockContextValue = {
      playRound: vi.fn(),
      clearRound: vi.fn(),
      result: { status: BetStatus.WIN, amount: 1000, message: "You Win!" },
      error: null,
      matchup: null,
      bets: [],
      balance: 5000,
      lastWin: 0,
      placeBet: vi.fn(),
      removeBet: vi.fn(),
      computerChoice: null,
    };
  
    render(
      <GameContext.Provider value={mockContextValue}>
        <BettingBoard />
      </GameContext.Provider>
    );
  
    expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
  });

});
