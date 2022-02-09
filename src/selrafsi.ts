import rafsiList from './rafsi.json';

export default function selrafsi(rafsi: string, experimental: boolean = true) {
  return rafsiList
    .filter((word) => !word.experimental || experimental)
    .find((word) => word.rafsi.includes(rafsi))?.selrafsi;
}
