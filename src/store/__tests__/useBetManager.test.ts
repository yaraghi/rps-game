import { renderHook, act } from "@testing-library/react";
import { useBetManager } from "../useBetManager";
import { Choice } from "../../domain/models/Choice";
import { BET_AMOUNT } from "../../domain/constants";
import { expect } from "vitest";

describe("useBetManager", () => {
  it("initializes with the provided balance", () => {
    const { result } = renderHook(() => useBetManager(5000));
    expect(result.current.balance).toBe(5000);
    expect(result.current.bets).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("places a bet if conditions are satisfied", () => {
    const { result } = renderHook(() => useBetManager(5000));
    act(() => {
      result.current.placeBet(Choice.ROCK);
    });
    expect(result.current.bets).toHaveLength(1);
    expect(result.current.balance).toBe(5000 - BET_AMOUNT);
    expect(result.current.error).toBeNull();
  });

  it("sets an error if the balance is insufficient", () => {
    const { result } = renderHook(() => useBetManager(400));
    act(() => {
      result.current.placeBet(Choice.ROCK);
    });
    expect(result.current.error).toBe("Insufficient balance to place bet.");
  });

  it("removes a bet and refunds the balance correctly", () => {
    const { result } = renderHook(() => useBetManager(5000));
    act(() => {
      result.current.placeBet(Choice.ROCK);
      result.current.removeBet(Choice.ROCK);
    });
    expect(result.current.bets).toHaveLength(0);
    expect(result.current.balance).toBe(5000);
    expect(result.current.error).toBeNull();
  });
});
