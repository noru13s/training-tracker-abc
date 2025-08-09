export type DayKey = 'A'|'B'|'C'
export function nextDay(last?: DayKey): DayKey {
  if (!last) return 'A'
  if (last === 'A') return 'B'
  if (last === 'B') return 'C'
  return 'A'
}
