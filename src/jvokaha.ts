import bondRafsis from './bondRafsis';
import selrafsi from './selrafsi';
import { syllables } from './tools';

function headSyllable(lujvo: string, cvs: string): boolean {
  return syllables(lujvo.slice(0, cvs.length)) === cvs;
}

export function sloppyJvokaha(originalLujvo: string): string[] {
  let lujvo = originalLujvo;
  const dropped = [];
  for (;;) {
    if (lujvo === '') return dropped;
    // remove hyphen
    if (
      dropped.length > 0
      && dropped[dropped.length - 1].length !== 1
      // hyphen cannot begin a word; nor can two hyphens
      && (lujvo.charAt(0) === 'y' // y-hyphen
        || lujvo.slice(0, 2) === 'nr' // n-hyphen is only allowed before r
        || (lujvo.charAt(0) === 'r' && headSyllable(lujvo, 'C'))) // r followed by a consonant
    ) {
      dropped.push(lujvo.charAt(0));
      lujvo = lujvo.slice(1);
    } else if (
      headSyllable(lujvo, 'CVV')
      && ['ai', 'ei', 'oi', 'au'].indexOf(lujvo.slice(1, 3)) !== -1
    ) {
      // drop rafsi from front
      // CVV can always be dropped
      dropped.push(lujvo.slice(0, 3));
      lujvo = lujvo.slice(3);
    } else if (syllables(lujvo.slice(0, 4)) === "CV'V") {
      // CV'V can always be dropped
      dropped.push(lujvo.slice(0, 4));
      lujvo = lujvo.slice(4);
    } else if (headSyllable(lujvo, 'CVCCY') || headSyllable(lujvo, 'CCVCY')) {
      // CVCCY and CCVCY can always be dropped
      // FIXME: how about checking if CC is persimmisble?
      dropped.push(lujvo.slice(0, 4));
      dropped.push('y');
      lujvo = lujvo.slice(5);
    } else if (syllables(lujvo) === 'CVCCV' || syllables(lujvo) === 'CCVCV') {
      // the final rafsi can be 5-letter
      dropped.push(lujvo);
      return dropped;
    } else if (headSyllable(lujvo, 'CVC') || headSyllable(lujvo, 'CCV')) {
      dropped.push(lujvo.slice(0, 3));
      lujvo = lujvo.slice(3);
    } else {
      // if all fails...
      throw new Error(`Failed to decompose {${originalLujvo}}`);
    }
  }
}

export function jvokaha(lujvo: string, tanru: boolean = false): string[] {
  const dropped = sloppyJvokaha(lujvo).filter((a) => a.length !== 1); // remove ynr
  const correctLujvo = bondRafsis(dropped).join(''); // recreate the lujvo from the rafsi list
  if (lujvo !== correctLujvo) {
    throw new Error(
      `malformed lujvo {${lujvo}}; it should be {${correctLujvo}}`,
    );
  }
  return tanru ? dropped.map((word) => selrafsi(word)) : dropped;
}
