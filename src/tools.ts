import rafsiList from './rafsi.json';
import tosmabru from './tosmabru';

export type Consonant =
  | 'r'
  | 'l'
  | 'n'
  | 'm'
  | 'b'
  | 'v'
  | 'd'
  | 'g'
  | 'j'
  | 'z'
  | 's'
  | 'c'
  | 'x'
  | 'k'
  | 't'
  | 'f'
  | 'p';

export function possibilityCombinations<T>(elements: T[][]): T[][] {
  return elements.length < 1
    ? [[]]
    : possibilityCombinations(elements.slice(1))
      .map((remaining) => elements[0].map((first) => [first, ...remaining]))
      .reduce((x, y) => x.concat(y));
}

export function rafsiCandidates(
  selrafsi: string,
  last: boolean,
  experimental: boolean,
): string[] {
  const { pos, rafsi } = rafsiList
    .filter((word) => !word.experimental || experimental)
    .find((word) => word.selrafsi === selrafsi) ?? { pos: null, rafsi: null };
  if (rafsi && pos === 'cmavo') return rafsi;
  if (rafsi && pos === 'gismu') {
    const gismuRafsi = rafsi.concat([]);
    if (last) gismuRafsi.push(selrafsi);
    const chopped = selrafsi.slice(0, -1);
    if (chopped !== 'brod') gismuRafsi.push(chopped);
    return gismuRafsi;
  }
  throw new Error(`no rafsi for word ${selrafsi}`);
}

export function syllables(v: string) {
  return v
    .split('')
    .map((c) => {
      if ('aeiou'.includes(c)) return 'V';
      if ('bcdfgjklmnprstvxz'.includes(c)) return 'C';
      if (c === "'") return "'";
      if (c === 'y') return 'Y';
      throw new Error(`Unknown token ${c}`);
    })
    .join('');
}

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

export function isConsonant(c: string): c is Consonant {
  return c.length === 1 && 'bcdfgjklmnprstvxz'.includes(c);
}

export function isCmevla(valsi: string): boolean {
  return (
    valsi.length >= 1
    && "aeiouy'".indexOf(valsi.charAt(valsi.length - 1)) === -1
  );
}

export function isPermissible(c1: Consonant, c2: Consonant): 0 | 1 | 2 {
  const i1 = 'rlnmbvdgjzscxktfp'.indexOf(c1);
  const i2 = 'rlnmbvdgjzscxktfp'.indexOf(c2);
  // 2: permissible initial consonant pair (e.g. 's' and 't' (CC))
  // 1: permissible consonant pair (e.g. 'n' and 't' (C/C))
  // 0: forbidden consonant pair (e.g. 'n' and 'n')
  return [
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [2, 2, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [2, 1, 1, 1, 1, 1, 0, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0],
    [2, 2, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2],
    [2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2],
    [2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1],
    [2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1],
    [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 1, 1, 0, 1, 1],
    [2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
    [2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
  ][i1][i2] as 0 | 1 | 2;
}

export function normalize(rafsis: string[]): string[] {
  if (rafsis.length < 2) {
    throw new Error('You need at least two valsi to make a lujvo');
  }
  const input: string[] = Array.from(rafsis); // copy
  const result: string[] = [input.pop()!]; // add the final rafsi
  while (input.length) {
    const rafsi: string = input.pop()!;
    const end = rafsi.charAt(rafsi.length - 1);
    const init = result[0].charAt(0);
    if (syllables(rafsi) === 'CVCC' || syllables(rafsi) === 'CCVC') {
      result.unshift('y');
    } else if (
      isConsonant(end)
      && isConsonant(init)
      && isPermissible(end, init) === 0
    ) {
      result.unshift('y');
    } else if (
      end === 'n'
      && ['ts', 'tc', 'dz', 'dj'].indexOf(result[0].slice(0, 2)) !== -1
    ) {
      result.unshift('y');
    } else if (
      input.length === 0
      && (syllables(rafsi) === 'CVV' || syllables(rafsi) === "CV'V")
    ) {
      // adapting first rafsi, which is CVV; gotta think about r-hyphen
      let hyphen = 'r';
      if (result[0].startsWith('r')) {
        hyphen = 'n';
      }
      if (rafsis.length > 2 || syllables(result[0]) !== 'CCV') {
        result.unshift(hyphen);
      }
    } else if (
      input.length === 0
      && syllables(rafsi) === 'CVC'
      && tosmabru([rafsi, ...result])
    ) {
      result.unshift('y');
    }
    result.unshift(rafsi);
  }
  return result;
}
