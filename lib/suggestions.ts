export type Suggestion = { base: number, current: number, trend: 'up'|'down'|'flat' }

export function computeSuggestion(base: number, recentWeights: number[], recentCompletedRatio?: number): Suggestion {
  let current = base
  let trend: 'up'|'down'|'flat' = 'flat'
  if (recentWeights.length >= 3) {
    const avg = recentWeights.reduce((a,b)=>a+b,0)/recentWeights.length
    current = avg
    if ((recentCompletedRatio ?? 1) >= 0.9) {
      current = Math.round(avg * 1.05 * 10) / 10
      trend = 'up'
    } else if ((recentCompletedRatio ?? 1) < 0.7) {
      current = Math.round(avg * 0.95 * 10) / 10
      trend = 'down'
    }
  }
  return { base, current, trend }
}
