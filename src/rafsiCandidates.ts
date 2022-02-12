import rafsiList from './rafsi.json';

export default function rafsiCandidates(
  selrafsi: string,
  last: boolean = false,
  experimental: boolean = true,
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
