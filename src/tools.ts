import rafsiList from './rafsi.json';

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

function isPermissible(c1: Consonant, c2: Consonant): 0 | 1 | 2 {
  const i1 = 'rlnmbvdgjzscxktfp'.indexOf(c1);
  const i2 = 'rlnmbvdgjzscxktfp'.indexOf(c2);
  // 2: initial ok; 1: ok; 0: none ok
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

function isTosmabru(rafsi: string, rest: string[]): boolean {
  // skip if cmevla
  if (isCmevla(rest[rest.length - 1])) {
    // ends with a consonant
    return false;
  }
  let index;
  for (let i = 0; i < rest.length; i += 1) {
    // eslint-disable-next-line no-continue
    if (syllables(rest[i]) === 'CVC') continue;
    index = i;
    if (
      rest[i] === 'y'
      || (() => {
        if (syllables(rest[i]) !== 'CVCCV') {
          return false;
        }
        const charAt2 = rest[i].charAt(2);
        if (!isConsonant(charAt2)) {
          throw new Error('Cannot happen');
        }
        const charAt3 = rest[i].charAt(3);
        if (!isConsonant(charAt3)) {
          throw new Error('Cannot happen');
        }
        return isPermissible(charAt2, charAt3) === 2;
      })()
    ) {
      break;
      // further testing
    } else {
      return false;
    }
  }
  if (typeof index === 'undefined') {
    /* This can only occur if everything is CVC, but the that is a cmevla */
    throw new Error('Cannot happen');
  }
  // further testing
  let tmp1: string = rafsi;
  let tmp2 = rest[0];
  let j = 0;
  do {
    if (tmp2 === 'y') return true;
    const a = tmp1.charAt(tmp1.length - 1);
    if (!isConsonant(a)) {
      throw new Error('Cannot happen');
    }
    const b = tmp2.charAt(0);
    if (!isConsonant(b)) {
      throw new Error('Cannot happen');
    }
    if (isPermissible(a, b) !== 2) {
      return false;
    }
    tmp1 = tmp2;
    j += 1;
    tmp2 = rest[j];
  } while (j <= index);
  return true;
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
      && isTosmabru(rafsi, result)
    ) {
      result.unshift('y');
    }
    result.unshift(rafsi);
  }
  return result;
}
