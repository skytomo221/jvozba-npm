import { jvokaha, sloppyJvokaha } from './jvokaha';

describe('jvokaha test', () => {
  test("fu'ivla be to fu'i + vla", () => {
    expect(jvokaha("fu'ivla")).toEqual(["fu'i", 'vla']);
    expect(jvokaha("fu'ivla", true)).toEqual(['fukpi', 'valsi']);
  });
  test("fu'irvla to throw", () => {
    expect(() => jvokaha("fu'irvla")).toThrow(Error);
    expect(() => jvokaha("fu'irvla", true)).toThrow(Error);
  });
  test('pasymabru be to pas + mabru', () => {
    expect(jvokaha('pasymabru')).toEqual(['pas', 'mabru']);
    expect(jvokaha('pasymabru', true)).toEqual(['pastu', 'mabru']);
  });
  test('pasmabru to throw', () => {
    expect(() => jvokaha('pasmabru')).toThrow(Error);
    expect(() => jvokaha('pasmabru', true)).toThrow(Error);
  });
});

describe('sloppyJvokaha test', () => {
  test("fu'ivla be to fu'i + vla", () => {
    expect(sloppyJvokaha("fu'ivla")).toEqual(["fu'i", 'vla']);
  });
  test("fu'irvla to fu'i + r + vla", () => {
    expect(sloppyJvokaha("fu'irvla")).toEqual(["fu'i", 'r', 'vla']);
  });
  test('pasymabru be to pas + y + mabru', () => {
    expect(sloppyJvokaha('pasymabru')).toEqual(['pas', 'y', 'mabru']);
  });
  test('pasmabru be to pas + mabru', () => {
    expect(sloppyJvokaha('pasmabru')).toEqual(['pas', 'mabru']);
  });
});
