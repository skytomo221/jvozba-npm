import { bigram } from 'n-gram';
import permissibleConsonantPair from './permissibleConsonantPair';
import {
  Consonant, isCmevla, isConsonant, syllables,
} from './tools';

function cc(r1: string, r2: string): boolean {
  return (
    isConsonant(r1[r1.length - 1])
    && isConsonant(r2[0])
    && permissibleConsonantPair(r1[r1.length - 1] as Consonant, r2[0]) === 2
  );
}

// See https://github.com/sozysozbot/advent2016/blob/master/cll_lujvo_manual.md#3-1-tosmabru%E3%83%86%E3%82%B9%E3%83%88
export default function tosmabru(rafsis: string[]): boolean {
  const last = rafsis[rafsis.length - 1];
  if (isCmevla(last)) return false;
  if (rafsis.includes('y')) {
    const heads = rafsis.slice(0, rafsis.indexOf('y'));
    return (
      heads.length > 1
      && heads.every((rafsi) => syllables(rafsi) === 'CVC')
      && bigram(heads).every(([r1, r2]) => cc(r1, r2))
    );
  }
  if (
    syllables(last) === 'CVCCV'
    && isConsonant(last[2])
    && isConsonant(last[3])
    && permissibleConsonantPair(last[2], last[3]) === 2
  ) {
    const heads = rafsis.slice(0, -1);
    return (
      heads.length > 0
      && heads.every((rafsi) => syllables(rafsi) === 'CVC')
      && bigram(rafsis).every(([r1, r2]) => cc(r1, r2))
    );
  }
  return false;
}
