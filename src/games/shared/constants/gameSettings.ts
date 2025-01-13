export const ROUND_TIMES = [
  { value: 5, label: '5 Seconds' },
  { value: 180, label: '3 Minutes' },
  { value: 300, label: '5 Minutes' },
  { value: 420, label: '7 Minutes' },
  { value: 600, label: '10 Minutes' }
] as const;

export const ROUND_COUNTS = [3, 5, 7, 10] as const;

export const DEFAULT_SETTINGS = {
  rounds: 5,
  timePerRound: 300
} as const;