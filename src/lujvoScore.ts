import { syllables } from './tools';

// See https://lojban.org/publications/cll/cll_v1.1_xhtml-section-chunks/section-lujvo-scoring.html
export function lujvoScore(rafsiYnrSequence: string[]): number {
  const lujvo: string = rafsiYnrSequence.join('');
  const l = lujvo.length;
  const a = lujvo.split("'").length - 1;
  const h = rafsiYnrSequence
    .map(syllables)
    .filter((syllable) => syllable === 'C' || syllable === 'Y').length;
  const r = rafsiYnrSequence
    .map(syllables)
    .map((syllable): number => {
      switch (syllable) {
        case 'CVCCV':
          return 1;
        case 'CVCC':
          return 2;
        case 'CCVCV':
          return 3;
        case 'CCVC':
          return 4;
        case 'CVC':
          return 5;
        case "CV'V":
          return 6;
        case 'CCV':
          return 7;
        case 'CVV':
          return 8;
        default:
          return 0;
      }
    })
    .reduce((x, y) => x + y);
  const v = (lujvo.match(/[aeiou]/g) || []).length;
  return 1000 * l - 500 * a + 100 * h - 10 * r - v;
}
