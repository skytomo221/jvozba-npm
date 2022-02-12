import { bigram } from 'n-gram';
import permissibleConsonantPair from './permissibleConsonantPair';
import { isConsonant, syllables } from './tools';
import tosmabru from './tosmabru';

// See https://github.com/sozysozbot/advent2016/blob/master/cll_lujvo_manual.md#2-rafsi%E3%82%92%E3%81%8F%E3%81%A3%E3%81%A4%E3%81%91%E3%82%8Bpart1
export default function avoidProhibitions(rafsis: string[]): string[] {
  if (rafsis.length < 2) throw new Error('You need at least two valsi to make a lujvo');
  const result = [rafsis[0]];
  if (
    (syllables(rafsis[0]) === 'CVV' || syllables(rafsis[0]) === "CV'V")
    && (rafsis.length > 2 || syllables(rafsis[1]) !== 'CCV')
  ) result.push(rafsis[1].startsWith('r') ? 'n' : 'r');
  bigram(rafsis).forEach(([previousRafsi, rafsi]) => {
    const end = previousRafsi.charAt(previousRafsi.length - 1);
    const begin = rafsi.charAt(0);
    if (
      syllables(previousRafsi) === 'CVCC'
      || syllables(previousRafsi) === 'CCVC'
      || (isConsonant(end)
        && isConsonant(begin)
        && permissibleConsonantPair(end, begin) === 0)
      || (end === 'n' && ['ts', 'tc', 'dz', 'dj'].includes(rafsi.slice(0, 2)))
    ) result.push('y');
    result.push(rafsi);
  });
  if (tosmabru(result)) result.splice(1, 0, 'y');
  return result;
}
