import { render, screen } from "@testing-library/react";
import { ResultView } from "../ResultView";
import { GameContext } from "../../../store/GameContext";
import { BetStatus } from "../../../domain/constants";
import { expect } from "vitest";

describe("ResultView", () => {
  test("returns null if there is no result", () => {
    const mockContextValue = {
      result: null, 
      matchup: null,
    };

    const { container } = render(
      <GameContext.Provider value={mockContextValue as any}>
        <ResultView />
      </GameContext.Provider>
    );

    // If there's no result, the component should render nothing
    expect(container.firstChild).toBeNull();
  });

  test("displays a WIN message and amount if status is WIN", () => {
    // userChoice = PAPER, computerChoice = ROCK => PAPER WON
    const mockContextValue = {
      result: { status: BetStatus.WIN, amount: 2000, message: "You Win!" },
      matchup: ["ROCK", "PAPER"], // [computer, user]
    };

    render(
      <GameContext.Provider value={mockContextValue as any}>
        <ResultView />
      </GameContext.Provider>
    );

    // "PAPER WON"
    expect(screen.getByText(/PAPER\s*WON/i)).toBeInTheDocument();
    // "You Win"
    expect(screen.getByText("You Win")).toBeInTheDocument();
    // "2000"
    expect(screen.getByText("2000")).toBeInTheDocument();
  });

  test("displays a LOST message if status is LOSE", () => {
    // userChoice = SCISSORS, computerChoice = ROCK => SCISSORS LOST
    const mockContextValue = {
      result: { status: BetStatus.LOSE, amount: 0, message: "You Lose!" },
      matchup: ["ROCK", "SCISSORS"], // computer = ROCK, user = SCISSORS => SCISSORS LOST
    };

    render(
      <GameContext.Provider value={mockContextValue as any}>
        <ResultView />
      </GameContext.Provider>
    );

    expect(screen.getByText(/SCISSORS\s*LOST/i)).toBeInTheDocument();
    expect(screen.getByText("You Lost")).toBeInTheDocument();
  });

  test("displays a tie message if status is TIE", () => {
    const mockContextValue = {
      result: { status: BetStatus.TIE, amount: 500, message: "Tie" },
      matchup: ["SCISSORS", "SCISSORS"],
    };

    render(
      <GameContext.Provider value={mockContextValue as any}>
        <ResultView />
      </GameContext.Provider>
    );

    // The component shows "loss on tie."
    expect(screen.getByText(/loss on tie\./i)).toBeInTheDocument();
  });
});
