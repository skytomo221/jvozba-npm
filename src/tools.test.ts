import { isConsonant, syllables, possibilityCombinations } from './tools';

describe('possibilityCombinations test', () => {
  test('[1 or 11, 2, 3 or 33 or 333]', () => {
    expect(possibilityCombinations([[1, 11], [2], [3, 33, 333]])).toEqual([
      [1, 2, 3],
      [11, 2, 3],
      [1, 2, 33],
      [11, 2, 33],
      [1, 2, 333],
      [11, 2, 333],
    ]);
  });
  test('[1 or 11]', () => {
    expect(possibilityCombinations([[1, 11]])).toEqual([[1], [11]]);
  });
});

describe('syllables test', () => {
  test('jvo to be CCV', () => {
    expect(syllables('jvo')).toBe('CCV');
  });
  test("ma'o to be CV'V", () => {
    expect(syllables("ma'o")).toBe("CV'V");
  });
  test('brody to be CCVCY', () => {
    expect(syllables('brody')).toBe('CCVCY');
  });
});

describe('isConsonant test', () => {
  test('Consonants to be truthy', () => {
    const consonants = 'bcdfgjklmnprstvxz'.split('');
    consonants.forEach((c) => expect(isConsonant(c)).toBeTruthy());
  });
  test('Vowels to be falsy', () => {
    const vowels = 'aeiou'.split('');
    vowels.forEach((c) => expect(isConsonant(c)).toBeFalsy());
  });
  test("' and y to be falsy", () => {
    const hy = "'y".split('');
    hy.forEach((c) => expect(isConsonant(c)).toBeFalsy());
  });
  test('> 1 letters to be falsy', () => {
    expect(isConsonant('coi')).toBeFalsy();
  });
});
