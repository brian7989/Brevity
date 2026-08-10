import { STORAGE_KEY } from "@/config";
import { playerStateSchema, type PlayerState } from "@/features/results";

const EMPTY_STATE: PlayerState = { completedChallengeIds: [], currentStreak: 0, longestStreak: 0, results: [] };

export function readPlayerState(): PlayerState {
  if (typeof window === "undefined") return EMPTY_STATE;
  try {
    return playerStateSchema.parse(JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null"));
  } catch {
    return EMPTY_STATE;
  }
}

export function writePlayerState(state: PlayerState): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(playerStateSchema.parse(state)));
}

export function recordResult(state: PlayerState, result: PlayerState["results"][number]): PlayerState {
  if (state.completedChallengeIds.includes(result.challengeId)) return state;

  const yesterday = previousDate(result.localDate);
  const currentStreak = state.lastCompletedDate === yesterday ? state.currentStreak + 1 : 1;
  return playerStateSchema.parse({
    completedChallengeIds: [...state.completedChallengeIds, result.challengeId],
    currentStreak,
    longestStreak: Math.max(state.longestStreak, currentStreak),
    lastCompletedDate: result.localDate,
    results: [...state.results, result],
  });
}

export function resetChallengeAttempt(state: PlayerState, challengeId: string): PlayerState {
  const results = state.results.filter((result) => result.challengeId !== challengeId);
  const { currentStreak, longestStreak, lastCompletedDate } = calculateStreaks(
    results.map(({ localDate }) => localDate),
  );
  return playerStateSchema.parse({
    completedChallengeIds: results.map(({ challengeId: completedId }) => completedId),
    currentStreak,
    longestStreak,
    lastCompletedDate,
    results,
  });
}

function previousDate(localDate: string): string {
  const date = new Date(`${localDate}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
}

function calculateStreaks(localDates: string[]): {
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate?: string;
} {
  const dates = [...new Set(localDates)].sort();
  if (!dates.length) return { currentStreak: 0, longestStreak: 0 };

  let run = 1;
  let longestStreak = 1;
  for (let index = 1; index < dates.length; index += 1) {
    run = dates[index - 1] === previousDate(dates[index]) ? run + 1 : 1;
    longestStreak = Math.max(longestStreak, run);
  }
  return { currentStreak: run, longestStreak, lastCompletedDate: dates.at(-1) };
}
