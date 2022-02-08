import jvokaha from './jvokaha';

describe('jvozba test', () => {
  test("fu'ivla be to fu'i + vla", () => {
    expect(jvokaha("fu'ivla")).toEqual(["fu'i", 'vla']);
  });
  test("fu'irvla to throw", () => {
    expect(() => jvokaha("fu'irvla")).toThrow(Error);
  });
  test('pasymabru be to pas + y + mabru', () => {
    expect(jvokaha("fu'ivla")).toEqual(["fu'i", 'vla']);
  });
  test('pasmabru', () => {
    expect(() => jvokaha('pasmabru')).toThrow(Error);
  });
});
