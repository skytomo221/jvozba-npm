import bondRafsis from './bondRafsis';

describe('avoidProhibitions test', () => {
  test('zbasai to be zbasai', () => {
    expect(bondRafsis(['zba', 'sai'])).toEqual(['zba', 'sai']);
  });
  test('nunynau to be nunynau', () => {
    expect(bondRafsis(['nun', 'y', 'nau'])).toEqual(['nun', 'y', 'nau']);
  });
  test('nunnau to be nunynau', () => {
    expect(bondRafsis(['nun', 'nau'])).toEqual(['nun', 'y', 'nau']);
  });
  test("saizbata'u to be sairzbata'u", () => {
    expect(bondRafsis(['sai', 'zba', "ta'u"])).toEqual([
      'sai',
      'r',
      'zba',
      "ta'u",
    ]);
  });
});
