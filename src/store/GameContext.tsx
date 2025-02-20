import { createContext, useContext, ReactNode } from "react";
import { useBetManager } from "./useBetManager";
import { useGameManager } from "./useGameManager";
import { INITIAL_BALANCE } from "../domain/constants";
import { Bet } from "../domain/models/Bet";
import { Choice } from "../domain/models/Choice";
import { BetStatus } from "../domain/constants";

interface GameResult {
  status: BetStatus;
  amount: number;
  message: string;
}

interface GameState {
  balance: number;
  bets: Bet[];
  error: string | null;
  computerChoice: Choice | null;
  result: GameResult | null;
  matchup: [Choice, Choice] | null;
  lastWin: number;
  placeBet: (choice: Choice) => void;
  removeBet: (choice: Choice) => void;
  playRound: () => void;
  clearRound: () => void;
}

const GameContext = createContext<GameState | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const { balance, bets, error, placeBet, removeBet, setBalance, setBets, setError } = useBetManager(INITIAL_BALANCE);
  const { computerChoice, result, matchup, playRound, clearRound } = useGameManager(bets, setBalance, setBets, setError);
  const lastWin = result && result.status === BetStatus.WIN ? result.amount : 0;
  return (
    <GameContext.Provider
      value={{balance,bets,error,computerChoice,result, matchup,lastWin,placeBet,removeBet,playRound,clearRound}}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
