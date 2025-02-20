import React from "react";
import { Choice } from "../../domain/models/Choice";
import { useGameContext } from "../../store/GameContext";
import { PositionItem } from "../Positions/PositionItem";
import { ResultView } from "../Result/ResultView";
import styles from "./BettingBoard.module.scss";

export const BettingBoard: React.FC = () => {
  const { playRound, clearRound, result, error, matchup } = useGameContext();

  const renderMatchup = () => {
    if (!matchup) return null;
    const [computerChoice, userChoice] = matchup;
    return (
      <h3 className={styles.matchupText}>
        <span className={styles.matchPart}>{computerChoice}</span>
        <span className={styles.vs}> vs </span>
        <span className={styles.matchPart}>{userChoice}</span>
      </h3>
    );
  };

  return (
    <div className={styles.board}>
      {result ? (
        <ResultView />
      ) : matchup ? (
        <div className={styles.matchup}>{renderMatchup()}</div>
      ) : (
        <div className={styles.startTitle}>PICK YOUR POSITIONS</div>
      )}

      <div className={styles.choices}>
        <PositionItem choice={Choice.ROCK} />
        <PositionItem choice={Choice.PAPER} />
        <PositionItem choice={Choice.SCISSORS} />
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {!result ? (
        <button className={styles.playButton} onClick={playRound} disabled={!!matchup}>
          Play
        </button>
      ) : (
        <button className={styles.clearButton} onClick={clearRound}>
          Clear
        </button>
      )}
    </div>
  );
};
export default BettingBoard;