import rafsiList from './rafsi.json';

export function selrafsi(rafsi: string, experimental: boolean = true) {
  const result = rafsiList
    .filter((word) => !word.experimental || experimental)
    .find((word) => word.rafsi.includes(rafsi));
  if (!result) throw new Error(`no rafsi for word ${rafsi}`);
  return result.selrafsi;
}
