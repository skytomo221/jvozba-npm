import rewire from 'rewire';
import jvokaha from './jvokaha';

describe('jvokaha test', () => {
  test("fu'ivla be to fu'i + vla", () => {
    expect(jvokaha("fu'ivla")).toEqual(["fu'i", 'vla']);
    expect(jvokaha("fu'ivla", true)).toEqual(['fukpi', 'valsi']);
  });
  test("fu'irvla to throw", () => {
    expect(() => jvokaha("fu'irvla")).toThrow(Error);
    expect(() => jvokaha("fu'irvla", true)).toThrow(Error);
  });
  test('pasymabru be to pas + y + mabru', () => {
    expect(jvokaha("fu'ivla")).toEqual(["fu'i", 'vla']);
    expect(jvokaha("fu'ivla", true)).toEqual(['fukpi', 'valsi']);
  });
  test('pasmabru to throw', () => {
    expect(() => jvokaha('pasmabru')).toThrow(Error);
    expect(() => jvokaha('pasmabru', true)).toThrow(Error);
  });
});

// eslint-disable-next-line no-underscore-dangle
const sloppyJvokaha = rewire('../dist/jvokaha').__get__('sloppyJvokaha');

describe('sloppyJvokaha test', () => {
  test("fu'ivla be to fu'i + vla", () => {
    expect(sloppyJvokaha("fu'ivla")).toEqual(["fu'i", 'vla']);
  });
  test("fu'irvla to fu'i + r + vla", () => {
    expect(sloppyJvokaha("fu'irvla")).toEqual(["fu'i", 'r', 'vla']);
  });
  test('pasymabru be to pas + y + mabru', () => {
    expect(sloppyJvokaha("fu'ivla")).toEqual(["fu'i", 'vla']);
  });
  test('pasmabru be to pas + mabru', () => {
    expect(sloppyJvokaha('pasmabru')).toEqual(['pas', 'mabru']);
  });
});
