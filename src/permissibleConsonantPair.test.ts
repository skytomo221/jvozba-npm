import permissibleConsonantPair from './permissibleConsonantPair';

describe('tosmabru test', () => {
  test('s + t to be permissible initial consonant pair', () => {
    expect(permissibleConsonantPair('s', 't')).toBe(2);
  });
  test('d + j to be permissible initial consonant pair', () => {
    expect(permissibleConsonantPair('d', 'j')).toBe(2);
  });
  test('n + t to be permissible consonant pair', () => {
    expect(permissibleConsonantPair('n', 't')).toBe(1);
  });
  test('s + k to be permissible initial consonant pair', () => {
    expect(permissibleConsonantPair('s', 'k')).toBe(2);
  });
  test('s + p to be permissible initial consonant pair', () => {
    expect(permissibleConsonantPair('s', 'p')).toBe(2);
  });
  test('z + b to be permissible initial consonant pair', () => {
    expect(permissibleConsonantPair('z', 'b')).toBe(2);
  });
  test('d + n to be permissible consonant pair', () => {
    expect(permissibleConsonantPair('d', 'n')).toBe(1);
  });
});
