import lujvoScore from './lujvoScore';

// See https://lojban.org/publications/cll/cll_v1.1_xhtml-section-chunks/section-lujvo-scoring.html
describe('lujvoScore test', () => {
  test("zbasai's score to be 5847", () => {
    expect(lujvoScore(['zba', 'sai'])).toBe(5847);
  });
  test("nunynau's score to be 6967", () => {
    expect(lujvoScore(['nun', 'y', 'nau'])).toBe(6967);
  });
  test("sairzbata'u's score to be 10385", () => {
    expect(lujvoScore(['sai', 'r', 'zba', "ta'u"])).toBe(10385);
  });
  test("zbazbasysarji's score to be 12976", () => {
    expect(lujvoScore(['zba', 'zbas', 'y', 'sarji'])).toBe(12976);
  });
});
