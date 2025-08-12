import { calculateOneRM, formatOneRM } from './formulas';

// Basic test cases for formula validation
describe('1RM Formulas', () => {
  test('Epley formula accuracy', () => {
    const result = calculateOneRM(100, 5);
    expect(result.epley).toBeCloseTo(116.67, 1);
  });

  test('Brzycki formula accuracy', () => {
    const result = calculateOneRM(100, 5);
    expect(result.brzycki).toBeCloseTo(112.5, 1);
  });

  test('Lombardi formula accuracy', () => {
    const result = calculateOneRM(100, 5);
    expect(result.lombardi).toBeCloseTo(107.18, 1);
  });

  test('O\'Conner formula accuracy', () => {
    const result = calculateOneRM(100, 5);
    expect(result.oconnor).toBeCloseTo(112.5, 1);
  });

  test('Range calculation', () => {
    const result = calculateOneRM(100, 5);
    expect(result.min).toBeLessThan(result.median);
    expect(result.median).toBeLessThan(result.max);
  });

  test('Invalid inputs throw errors', () => {
    expect(() => calculateOneRM(0, 5)).toThrow();
    expect(() => calculateOneRM(100, 0)).toThrow();
    expect(() => calculateOneRM(100, 15)).toThrow();
  });

  test('Formatting works correctly', () => {
    expect(formatOneRM(100.7, true)).toBe('101.0kg');
    expect(formatOneRM(100.3, false)).toBe('100lb');
  });
});

// Golden test cases
const goldenCases = [
  { weight: 80, reps: 3, expectedEpley: 88 },
  { weight: 100, reps: 5, expectedEpley: 116.67 },
  { weight: 120, reps: 8, expectedEpley: 152 },
  { weight: 60, reps: 10, expectedEpley: 80 }
];

goldenCases.forEach(({ weight, reps, expectedEpley }) => {
  test(`Golden case: ${weight}kg x ${reps} reps`, () => {
    const result = calculateOneRM(weight, reps);
    expect(result.epley).toBeCloseTo(expectedEpley, 0);
  });
});