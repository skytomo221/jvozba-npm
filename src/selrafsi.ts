import rafsiList from './rafsi.json';

export function selrafsi(rafsi: string, experimental: boolean = true) {
  const result = rafsiList
    .filter((word) => !word.experimental || experimental)
    .find(
      (word) => word.rafsi.includes(rafsi)
        || word.selrafsi === rafsi
        || word.selrafsi.slice(0, 4) === rafsi,
    );
  if (!result) throw new Error(`no rafsi for word ${rafsi}`);
  return result.selrafsi;
}
