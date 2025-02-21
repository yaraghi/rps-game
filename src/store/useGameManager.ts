import { useState } from "react";
import { Bet } from "../domain/models/Bet";
import { Choice } from "../domain/models/Choice";
import { RpsGameEngine } from "../domain/services/RpsGameEngine";
import { BetStatus } from "../domain/constants";

const gameEngine = new RpsGameEngine();

export const useGameManager = (
  bets: Bet[],
  setBalance: React.Dispatch<React.SetStateAction<number>>,
  setBets: React.Dispatch<React.SetStateAction<Bet[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<{ status: BetStatus; amount: number; message: string } | null>(null);
  const [matchup, setMatchup] = useState<[Choice, Choice] | null>(null);

  const playRound = () => {
    setError(null);
    if (bets.length === 0) {
      setError("Please select at least one position.");
      return;
    }
    const generatedChoice = gameEngine.getRandomChoice();
    setComputerChoice(generatedChoice);

    const outcomes = bets.map((bet) => ({
      bet,
      outcome: gameEngine.getOutcome(bet.choice, generatedChoice),
    }));

    const winningOutcome = outcomes.find((o) => o.outcome === "WIN");
    const tieOutcome = outcomes.find((o) => o.outcome === "TIE");

    let userMatch: Choice;
    if (winningOutcome) {
      userMatch = winningOutcome.bet.choice;
    } else if (tieOutcome) {
      userMatch = tieOutcome.bet.choice;
    } else {
      userMatch = bets[0].choice;
    }

    setMatchup([generatedChoice, userMatch]);

    setTimeout(() => {
      const { totalWin, status } = gameEngine.computeResult(bets, generatedChoice);
      let message =
        status === BetStatus.WIN
          ? "You Win!"
          : status === BetStatus.LOSE
          ? "You Lose!"
          : "It's a Tie!";

      if (status === BetStatus.WIN) {
        setBalance(prev => prev + totalWin);
      } else if (status === BetStatus.TIE) {
        setBalance(prev => prev + bets.reduce((sum, b) => sum + b.amount, 0));
      }

      setResult({ status, amount: totalWin, message });
    }, 2000);
  };

  const clearRound = () => {
    setComputerChoice(null);
    setResult(null);
    setMatchup(null);
    setBets([]);
    setError(null);
  };

  return { computerChoice, result, matchup, playRound, clearRound };
};
