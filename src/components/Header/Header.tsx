import React from "react";
import { useGameContext } from "../../store/GameContext";
import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  const { balance, bets, lastWin } = useGameContext();
  const totalBet = bets.reduce((sum, b) => sum + b.amount, 0);
  return (
    <header className={styles.header}>
      <div className={styles.item}><span>BALANCE:</span> {balance.toLocaleString()}</div>
      <div className={styles.item}><span>BET:</span> {totalBet.toLocaleString()}</div>
      <div className={styles.item}><span>WIN:</span> {lastWin.toLocaleString()}</div>
    </header>
  );
};
