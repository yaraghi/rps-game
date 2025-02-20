import { useState } from "react";
import { Bet } from "../domain/models/Bet";
import { Choice } from "../domain/models/Choice";
import { GameService } from "../domain/services/GameService";
import { BET_AMOUNT } from "../domain/constants";

const gameService = new GameService();

export const useBetManager = (initialBalance: number) => {
  const [balance, setBalance] = useState<number>(initialBalance);
  const [bets, setBets] = useState<Bet[]>([]);
  const [error, setError] = useState<string | null>(null);

  const placeBet = (choice: Choice) => {
    setError(null);
    const validationError = gameService.canPlaceBet(bets, choice, balance);
    if (validationError) {
      setError(validationError);
      return;
    }
    setBets(gameService.placeBet(bets, choice));
    setBalance((prev) => prev - BET_AMOUNT);
  };

  const removeBet = (choice: Choice) => {
    try {
      setError(null);
      const { newBets, returnedAmount } = gameService.removeBet(bets, choice);
      setBets(newBets);
      setBalance((prev) => prev + returnedAmount);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { balance, bets, error, placeBet, removeBet, setBalance, setBets, setError };
};
