import avoidProhibitions from './avoidProhibitions';

describe('avoidProhibitions test', () => {
  test('zbasai to be zbasai', () => {
    expect(avoidProhibitions(['zba', 'sai'])).toEqual(['zba', 'sai']);
  });
  test('nunynau to be nunynau', () => {
    expect(avoidProhibitions(['nun', 'y', 'nau'])).toEqual([
      'nun',
      'y',
      'y',
      'nau',
    ]);
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
