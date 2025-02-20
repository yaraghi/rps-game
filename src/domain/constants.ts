/**
 * The initial balance for the player.
 * @constant {number}
 */
export const INITIAL_BALANCE = 5000;

/**
 * The base bet amount.
 * @constant {number}
 */
export const BET_AMOUNT = 500;

/**
 * Maximum number of positions a player can bet on per game.
 * @constant {number}
 */
export const MAX_BET_POSITIONS = 2;

/**
 * @interface WinMultipliers
 * Represents the winning multipliers for bets.
 */
export interface WinMultipliers {
  SINGLE_BET: number;
  DOUBLE_BET: number;
}

/**
 * Winning multipliers for a single bet and double bet.
 * If the player bets on one position and wins, the return is 14 times the bet.
 * If the player bets on two positions and wins, the return is 3 times the bet.
 * @constant {WinMultipliers}
 */
export const WIN_MULTIPLIERS: WinMultipliers = {
  SINGLE_BET: 14,
  DOUBLE_BET: 3,
};

/**
 * @enum {string} BetStatus
 * Represents the status of a bet after a game round.
 */
export enum BetStatus {
  WIN = "WIN",
  LOSE = "LOSE",
  TIE = "TIE",
}
