import { bigram } from 'n-gram';
import {
  Consonant, isCmevla, isConsonant, isPermissible, syllables,
} from './tools';

function cc(r1: string, r2: string): boolean {
  return (
    isConsonant(r1[r1.length - 1])
    && isConsonant(r2[0])
    && isPermissible(r1[r1.length - 1] as Consonant, r2[0]) === 2
  );
}

export default function tosmabru(rafsis: string[]): boolean {
  const last = rafsis[rafsis.length - 1];
  if (rafsis.length < 2 || isCmevla(last)) return false;
  if (rafsis.includes('y')) {
    const heads = rafsis.slice(0, rafsis.indexOf('y'));
    return (
      heads.every((rafsi) => syllables(rafsi) === 'CVC')
      && bigram(heads).every(([r1, r2]) => cc(r1, r2))
    );
  }
  if (
    syllables(last) === 'CVCCV'
    && isConsonant(last[2])
    && isConsonant(last[3])
    && isPermissible(last[2], last[3]) === 2
  ) {
    const heads = rafsis.slice(0, -1);
    return (
      heads.every((rafsi) => syllables(rafsi) === 'CVC')
      && bigram(rafsis).every(([r1, r2]) => cc(r1, r2))
    );
  }
  return false;
}
