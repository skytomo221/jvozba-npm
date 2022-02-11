import { bigram } from 'n-gram';
import {
  Consonant, isCmevla, isPermissible, syllables,
} from './tools';

export default function tosmabru(rafsis: string[]): boolean {
  const heads = rafsis.includes('y')
    ? rafsis.slice(0, rafsis.indexOf('y'))
    : rafsis.slice(0, -1);
  const last = rafsis[rafsis.length - 1];
  if (rafsis.length < 2 || isCmevla(last)) return false;
  if (heads.every((rafsi) => syllables(rafsi) === 'CVC')) {
    if (rafsis.includes('y')) {
      return bigram(heads).every(
        ([r1, r2]) => isPermissible(r1[r1.length - 1] as Consonant, r2[0] as Consonant)
          === 2,
      );
    }
    if (
      syllables(last) === 'CVCCV'
      && isPermissible(last[2] as Consonant, last[3] as Consonant) === 2
    ) {
      return bigram(rafsis).every(
        ([r1, r2]) => isPermissible(r1[r1.length - 1] as Consonant, r2[0] as Consonant)
          === 2,
      );
    }
  }
  return false;
}
