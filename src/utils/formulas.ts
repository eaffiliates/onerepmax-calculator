export interface OneRMResult {
  epley: number;
  brzycki: number;
  lombardi: number;
  oconnor: number;
  median: number; // Keep for compatibility, but now contains the average
  average: number; // Add explicit average property
  min: number;
  max: number;
}

export function calculateOneRM(weight: number, reps: number): OneRMResult {
  if (weight <= 0 || reps < 1 || reps > 12) {
    throw new Error('Invalid input: weight must be positive and reps between 1-12');
  }

  // Epley: 1RM = w × (1 + r/30)
  const epley = weight * (1 + reps / 30);

  // Brzycki: 1RM = w × 36 / (37 − r) - handle edge case
  const brzycki = reps >= 37 ? weight * 2 : weight * 36 / (37 - reps);

  // Lombardi: 1RM = w × r^0.10
  const lombardi = weight * Math.pow(reps, 0.10);

  // O'Conner: 1RM = w × (1 + 0.025 × r)
  const oconnor = weight * (1 + 0.025 * reps);

  const results = [epley, brzycki, lombardi, oconnor];
  const average = results.reduce((sum, val) => sum + val, 0) / results.length; // True mathematical average
  const min = Math.min(...results);
  const max = Math.max(...results);

  return {
    epley,
    brzycki,
    lombardi,
    oconnor,
    median: average, // Keep median property name for compatibility
    average: average, // Add explicit average property
    min,
    max
  };
}

export function roundToNearestIncrement(value: number, isKg: boolean): number {
  const increment = isKg ? 0.5 : 1;
  return Math.round(value / increment) * increment;
}

export function formatOneRM(value: number, isKg: boolean): string {
  const rounded = roundToNearestIncrement(value, isKg);
  return `${rounded.toFixed(isKg ? 1 : 0)} ${isKg ? 'kg' : 'lb'}`;
}