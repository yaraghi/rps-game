import { Choice } from "./Choice";

export interface Bet {
  choice: Choice;
  amount: number; // e.g. 500, 1000, ...
}
