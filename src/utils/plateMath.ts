export interface PlateCalculation {
  barWeight: number;
  plates: { weight: number; count: number }[];
  totalWeight: number;
}

export function calculatePlates(targetWeight: number, isKg: boolean): PlateCalculation {
  const barWeight = isKg ? 20 : 45; // Standard Olympic bar
  const availablePlates = isKg 
    ? [25, 20, 15, 10, 5, 2.5, 1.25] 
    : [45, 35, 25, 10, 5, 2.5];
  
  let remainingWeight = Math.max(0, targetWeight - barWeight);
  const plates: { weight: number; count: number }[] = [];
  
  // Calculate plates needed (pairs for each side)
  for (const plateWeight of availablePlates) {
    const platesPerSide = Math.floor(remainingWeight / (2 * plateWeight));
    if (platesPerSide > 0) {
      plates.push({ weight: plateWeight, count: platesPerSide * 2 });
      remainingWeight -= platesPerSide * 2 * plateWeight;
    }
  }
  
  const totalWeight = barWeight + plates.reduce((sum, p) => sum + p.weight * p.count, 0);
  
  return { barWeight, plates, totalWeight };
}

export function generateWarmupLadder(oneRM: number): number[] {
  const percentages = [40, 60, 75, 85, 95];
  return percentages.map(pct => oneRM * (pct / 100));
}