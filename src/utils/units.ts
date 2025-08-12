export type Unit = 'kg' | 'lb';

export function convertWeight(weight: number, fromUnit: Unit, toUnit: Unit): number {
  if (fromUnit === toUnit) return weight;
  
  if (fromUnit === 'kg' && toUnit === 'lb') {
    return weight * 2.20462;
  }
  
  if (fromUnit === 'lb' && toUnit === 'kg') {
    return weight / 2.20462;
  }
  
  return weight;
}

export function getUnitSymbol(unit: Unit): string {
  return unit === 'kg' ? 'kg' : 'lb';
}