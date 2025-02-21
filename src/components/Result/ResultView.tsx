import React from "react";
import { useGameContext } from "../../store/GameContext";
import styles from "./ResultView.module.scss";

export const ResultView: React.FC = () => {
  const { result, matchup } = useGameContext();
  if (!result) {
    return null;
  }

  let resultClass = "";
  if (result.status === "WIN") {
    resultClass = styles.win;
  } else if (result.status === "LOSE") {
    resultClass = styles.lose;
  } else if (result.status === "TIE") {
    resultClass = styles.tie;
  }

  return (
    <div className={`${styles.result} ${resultClass}`}>
      {result.status === "WIN" && matchup ? (
        <>
          <h2>{matchup[1]} WON</h2>
          <h4>
            <span>You Win</span> {result.amount}
          </h4>
        </>
      ) : result.status === "LOSE" && matchup ? (
        <>
          <h2>{matchup[1]} LOST</h2>
          <h4>You Lost</h4>
        </>
      ) : (
        <h2>loss on tie.</h2>
      )}
    </div>
  );
};
