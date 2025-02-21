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
    setBets(prevBets => {
      const validationError = gameService.canPlaceBet(prevBets, choice, balance);
      if (validationError) {
        setError(validationError);
        return prevBets;
      }
      setBalance(prevBalance => prevBalance - BET_AMOUNT);
      return gameService.placeBet(prevBets, choice);
    });
  };

  const removeBet = (choice: Choice) => {
    try {
      setError(null);
      setBets(prevBets => {
        const { newBets, returnedAmount } = gameService.removeBet(prevBets, choice);
        setBalance(prevBalance => prevBalance + returnedAmount);
        return newBets;
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { balance, bets, error, placeBet, removeBet, setBalance, setBets, setError };
};
