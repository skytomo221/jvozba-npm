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

export function isConsonant(c: string): c is Consonant {
  return c.length === 1 && 'bcdfgjklmnprstvxz'.includes(c);
}

export function isCmevla(valsi: string): boolean {
  return (
    valsi.length >= 1
    && "aeiouy'".indexOf(valsi.charAt(valsi.length - 1)) === -1
  );
}
