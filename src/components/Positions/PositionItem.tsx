import React, { useState } from "react";
import { Choice } from "../../domain/models/Choice";
import { useGameContext } from "../../store/GameContext";
import styles from "./PositionItem.module.scss";

interface PositionItemProps {
  choice: Choice;
}

export const PositionItem: React.FC<PositionItemProps> = ({ choice }) => {
  const { bets, placeBet, removeBet, result, matchup } = useGameContext();
  const [isHover, setIsHover] = useState(false);

  const betForThisChoice = bets.find((b) => b.choice === choice);
  const betAmount = betForThisChoice?.amount || 0;

  const disableInteraction = Boolean(result) || Boolean(matchup);

  const handleAddBet = () => {
    if (!disableInteraction) {
      placeBet(choice);
    }
  };

  const handleRemoveBet = () => {
    if (!disableInteraction) {
      removeBet(choice);
    }
  };

  const choiceClass = (() => {
    switch (choice) {
      case Choice.ROCK:
        return styles.rock;
      case Choice.PAPER:
        return styles.paper;
      case Choice.SCISSORS:
        return styles.scissors;
      default:
        return "";
    }
  })();

  return (
    <div
      className={`${styles.positionItem} ${choiceClass}`}
      onClick={!disableInteraction ? handleAddBet : undefined}
      onMouseEnter={!disableInteraction ? () => setIsHover(true) : undefined}
      onMouseLeave={!disableInteraction ? () => setIsHover(false) : undefined}
    >
      {betAmount > 0 && (
        <div className={styles.bet}>
          {betAmount}
          {isHover && betAmount > 0 && !disableInteraction && (
            <button
              className={styles.removeButton}
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveBet();
              }}
            >
              -
            </button>
          )}
        </div>
      )}
      <div className={styles.label}>{choice}</div>
    </div>
  );
};
