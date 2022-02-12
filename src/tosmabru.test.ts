import tosmabru from './tosmabru';

describe('tosmabru test', () => {
  test('tadji to be not tosmabru', () => {
    expect(tosmabru(['tadji'])).toBeFalsy();
  });
  test('jvozba to be not tosmabru', () => {
    expect(tosmabru(['jvo', 'zba'])).toBeFalsy();
  });
  test('sozysozbot to be not tosmabru', () => {
    expect(tosmabru(['soz', 'y', 'soz', 'bot'])).toBeFalsy();
  });
  test('castadji to be tosmabru', () => {
    expect(tosmabru(['cas', 'tadji'])).toBeTruthy();
  });
  test('kantadji to be not tosmabru', () => {
    expect(tosmabru(['kan', 'tadji'])).toBeFalsy();
  });
  test('caskantadji to be not tosmabru', () => {
    expect(tosmabru(['cas', 'kan', 'tadji'])).toBeFalsy();
  });
  test('paspazbadna to be not tosmabru', () => {
    expect(tosmabru(['pas', 'paz', 'badna'])).toBeFalsy();
  });
  test('paspasybadna to be tosmabru', () => {
    expect(tosmabru(['pas', 'pas', 'y', 'badna'])).toBeTruthy();
  });
  test('nunynau to be not tosmabru', () => {
    expect(tosmabru(['nun', 'y', 'nau'])).toBeFalsy();
  });
});
