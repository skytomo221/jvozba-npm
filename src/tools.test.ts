import {
  rafsiCandidates,
  isConsonant,
  syllables,
  lujvoScore,
  possibilityCombinations,
  avoidProhibitions,
} from './tools';

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

describe('rafsiCandidates test', () => {
  test("bloti's rafsi is ['lot', 'blo', 'lo'i', 'blot']", () => {
    expect(rafsiCandidates('bloti', false, false)).toEqual([
      'lot',
      'blo',
      "lo'i",
      'blot',
    ]);
    expect(rafsiCandidates('bloti', false, true)).toEqual([
      'lot',
      'blo',
      "lo'i",
      'blot',
    ]);
  });
  test("gismu's rafsi is ['gim', 'gi'u', 'gismu', 'gism']", () => {
    expect(rafsiCandidates('gismu', true, false)).toEqual([
      'gim',
      "gi'u",
      'gismu',
      'gism',
    ]);
    expect(rafsiCandidates('gismu', true, true)).toEqual([
      'gim',
      "gi'u",
      'gismu',
      'gism',
    ]);
  });
  test("badna's rafsi is ['badn']", () => {
    expect(rafsiCandidates('badna', false, false)).toEqual(['badn']);
    expect(rafsiCandidates('badna', false, true)).toEqual(['badn']);
    expect(rafsiCandidates('badna', true, false)).toEqual(['badna', 'badn']);
    expect(rafsiCandidates('badna', true, true)).toEqual(['badna', 'badn']);
  });
  test("se's rafsi is ['sel']", () => {
    expect(rafsiCandidates('se', true, false)).toEqual(['sel']);
    expect(rafsiCandidates('se', true, true)).toEqual(['sel']);
  });
  test("kibro's rafsi is ['kib', 'kibr']", () => {
    expect(() => rafsiCandidates('kibro', false, false)).toThrow(Error);
    expect(rafsiCandidates('kibro', false, true)).toEqual(['kib', 'kibr']);
    expect(rafsiCandidates('kibro', true, true)).toEqual([
      'kib',
      'kibro',
      'kibr',
    ]);
  });
  test("po'o's rafsi is ['pov']", () => {
    expect(() => rafsiCandidates("po'o", true, false)).toThrow(Error);
    expect(rafsiCandidates("po'o", true, true)).toEqual(['pov']);
  });
});

// See https://lojban.org/publications/cll/cll_v1.1_xhtml-section-chunks/section-lujvo-scoring.html
describe('lujvoScore test', () => {
  test("zbasai's score to be 5847", () => {
    expect(lujvoScore(['zba', 'sai'])).toBe(5847);
  });
  test("nunynau's score to be 6967", () => {
    expect(lujvoScore(['nun', 'y', 'nau'])).toBe(6967);
  });
  test("sairzbata'u's score to be 10385", () => {
    expect(lujvoScore(['sai', 'r', 'zba', "ta'u"])).toBe(10385);
  });
  test("zbazbasysarji's score to be 12976", () => {
    expect(lujvoScore(['zba', 'zbas', 'y', 'sarji'])).toBe(12976);
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

describe('avoidProhibitions test', () => {
  test('zbasai to be zbasai', () => {
    expect(avoidProhibitions(['zba', 'sai'])).toEqual(['zba', 'sai']);
  });
  test('nunynau to be nunynau', () => {
    expect(avoidProhibitions(['nun', 'y', 'nau'])).toEqual(['nun', 'y', 'y', 'nau']);
  });
  test('nunnau to be nunynau', () => {
    expect(avoidProhibitions(['nun', 'nau'])).toEqual(['nun', 'y', 'nau']);
  });
  test("saizbata'u to be sairzbata'u", () => {
    expect(avoidProhibitions(['sai', 'zba', "ta'u"])).toEqual([
      'sai',
      'r',
      'zba',
      "ta'u",
    ]);
  });
});
