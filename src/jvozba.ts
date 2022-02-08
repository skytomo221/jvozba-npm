import {
  Consonant,
  possibilityCombinations,
  rafsiCandidates,
  syllables,
  lujvoScore,
  isConsonant,
} from './tools';

type LujvoAndScore = { lujvo: string; score: number };

function isCmevla(valsi: string): boolean {
  return (
    valsi.length >= 1
    && "aeiouy'".indexOf(valsi.charAt(valsi.length - 1)) === -1
  );
}

function isCvv(rafsi: string) {
  return syllables(rafsi) === 'CVV' || syllables(rafsi) === "CV'V";
}

function isCcv(rafsi: string) {
  return syllables(rafsi) === 'CCV';
}

function isCvc(rafsi: string) {
  return syllables(rafsi) === 'CVC';
}

function is4Letter(rafsi: string) {
  return syllables(rafsi) === 'CVCC' || syllables(rafsi) === 'CCVC';
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
    if (isCvc(rest[i])) continue;
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

export function normalize(rafsiList: string[]): string[] {
  if (rafsiList.length < 2) {
    throw new Error('You need at least two valsi to make a lujvo');
  }

  const input: string[] = Array.from(rafsiList); // copy
  const result: string[] = [input.pop()!]; // add the final rafsi

  while (input.length) {
    const rafsi: string = input.pop()!;
    const end = rafsi.charAt(rafsi.length - 1);
    const init = result[0].charAt(0);

    if (is4Letter(rafsi)) {
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
    } else if (input.length === 0 && isCvv(rafsi)) {
      // adapting first rafsi, which is CVV; gotta think about r-hyphen
      let hyphen = 'r';
      if (result[0].startsWith('r')) {
        hyphen = 'n';
      }

      if (rafsiList.length > 2 || !isCcv(result[0])) {
        result.unshift(hyphen);
      }
    } else if (
      input.length === 0
      && isCvc(rafsi)
      && isTosmabru(rafsi, result)
    ) {
      result.unshift('y');
    }

    result.unshift(rafsi);
  }

  return result;
}

export default function jvozba(
  arr: string[],
  forbidLaLaiDoi?: boolean,
): LujvoAndScore[] {
  const candidArr: string[][] = [];

  for (let i = 0; i < arr.length; i += 1) {
    candidArr.push(
      rafsiCandidates(arr[i], /* isLast: */ i === arr.length - 1, true),
    );
  }

  const answers: LujvoAndScore[] = possibilityCombinations(candidArr)
    .map((rafsiList: string[]) => {
      const result = normalize(rafsiList);
      return { lujvo: result.join(''), score: lujvoScore(result) };
    })
    .filter((d: LujvoAndScore) => {
      const l = d.lujvo;
      return !(
        isCmevla(l)
        && forbidLaLaiDoi
        && (l.match(/^(lai|doi)/)
          || l.match(/[aeiouy](lai|doi)/)
          || l.match(/^la[^u]/) // the fact that CLL explicitly forbids two sequences `la` and `lai` signifies that `lau` is not forbidden
          || l.match(/[aeiouy]la[^u]/))
      );
    })
    .sort((a, b) => a.score - b.score);

  return answers;
}
