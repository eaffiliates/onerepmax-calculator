export interface CalculatorState {
  weight: number;
  reps: number;
  units: 'kg' | 'lb';
}

export function generatePermalink(state: CalculatorState): string {
  const params = new URLSearchParams();
  params.set('weight', state.weight.toString());
  params.set('reps', state.reps.toString());
  params.set('units', state.units);
  
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

export function parsePermalink(): Partial<CalculatorState> {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  const state: Partial<CalculatorState> = {};
  
  const weight = params.get('weight');
  if (weight && !isNaN(parseFloat(weight))) {
    state.weight = parseFloat(weight);
  }
  
  const reps = params.get('reps');
  if (reps && !isNaN(parseInt(reps))) {
    state.reps = parseInt(reps);
  }
  
  const units = params.get('units');
  if (units === 'kg' || units === 'lb') {
    state.units = units;
  }
  
  return state;
}