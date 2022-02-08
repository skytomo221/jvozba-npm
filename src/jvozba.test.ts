import jvozba from './jvozba';

describe('jvozba test', () => {
  test('lujvo + zbasu be to jvozva', () => {
    expect(jvozba(['lujvo', 'zbasu'])).toEqual([
      { lujvo: 'jvozba', score: 5858 },
      { lujvo: 'luvzba', score: 5878 },
      { lujvo: 'jvozbas', score: 6888 },
      { lujvo: 'luvzbas', score: 6908 },
      { lujvo: 'jvozbasu', score: 7897 },
      { lujvo: 'luvzbasu', score: 7917 },
      { lujvo: 'lujvyzba', score: 8008 },
      { lujvo: 'lujvyzbas', score: 9038 },
      { lujvo: 'lujvyzbasu', score: 10047 },
    ]);
  });
});
