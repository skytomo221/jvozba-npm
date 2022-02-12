import rafsiCandidates from './rafsiCandidates';

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
