import { bigram } from 'n-gram';
import permissibleConsonantPair from './permissibleConsonantPair';
import { isConsonant, syllables } from './tools';
import tosmabru from './tosmabru';

// See https://github.com/sozysozbot/advent2016/blob/master/cll_lujvo_manual.md#2-rafsi%E3%82%92%E3%81%8F%E3%81%A3%E3%81%A4%E3%81%91%E3%82%8Bpart1
export default function avoidProhibitions(rafsis: string[]): string[] {
  if (rafsis.length < 2) {
    throw new Error('You need at least two valsi to make a lujvo');
  }
  const result = [rafsis[0]];
  bigram(rafsis).forEach(([previousRafsi, rafsi], index) => {
    const end = previousRafsi.charAt(previousRafsi.length - 1);
    const begin = rafsi.charAt(0);
    if (
      syllables(previousRafsi) === 'CVCC'
        || syllables(previousRafsi) === 'CCVC'
    ) {
      result.push('y');
    } else if (
      isConsonant(end)
        && isConsonant(begin)
        && permissibleConsonantPair(end, begin) === 0
    ) {
      result.push('y');
    } else if (
      end === 'n'
        && ['ts', 'tc', 'dz', 'dj'].indexOf(rafsi.slice(0, 2)) !== -1
    ) {
      result.push('y');
    } else if (
      index === 0
        && (syllables(previousRafsi) === 'CVV'
          || syllables(previousRafsi) === "CV'V")
    ) {
      // adapting first rafsi, which is CVV; gotta think about r-hyphen
      let hyphen = 'r';
      if (rafsi.startsWith('r')) {
        hyphen = 'n';
      }
      if (rafsis.length > 2 || syllables(rafsi) !== 'CCV') {
        result.push(hyphen);
      }
    } else if (
      index === 0
        && syllables(previousRafsi) === 'CVC'
        && tosmabru(rafsis)
    ) {
      result.push('y');
    }
    result.push(rafsi);
  });
  return result;
}
