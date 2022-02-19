import { selrafsi } from './selrafsi';

describe('selrafsi test', () => {
  test("fu'i's selrafsi be to fukpi", () => {
    expect(selrafsi("fu'i")).toBe('fukpi');
  });
  test("kib's selrafsi be to kibro", () => {
    expect(selrafsi('kib')).toBe('kibro');
    expect(() => selrafsi('kib', false)).toThrow(Error);
  });
  test("mabr's selrafsi be to mabru", () => {
    expect(selrafsi('mabr')).toBe('mabru');
  });
  test("mabru's selrafsi be to mabru", () => {
    expect(selrafsi('mabru')).toBe('mabru');
  });
});
