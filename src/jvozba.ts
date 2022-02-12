import avoidProhibitions from './avoidProhibitions';
import lujvoScore from './lujvoScore';
import {
  possibilityCombinations,
  rafsiCandidates,
  isCmevla,
} from './tools';

type LujvoAndScore = { lujvo: string; score: number };

export default function jvozba(
  arr: string[],
  forbidLaLaiDoi?: boolean,
): LujvoAndScore[] {
  const candidArr: string[][] = [];

  for (let i = 0; i < arr.length; i += 1) {
    candidArr.push(
      rafsiCandidates(arr[i], /* isLast: */ i === arr.length - 1, true),
    );
  }

  const answers: LujvoAndScore[] = possibilityCombinations(candidArr)
    .map((rafsiList: string[]) => {
      const result = avoidProhibitions(rafsiList);
      return { lujvo: result.join(''), score: lujvoScore(result) };
    })
    .filter((d: LujvoAndScore) => {
      const l = d.lujvo;
      return !(
        isCmevla(l)
        && forbidLaLaiDoi
        && (l.match(/^(lai|doi)/)
          || l.match(/[aeiouy](lai|doi)/)
          || l.match(/^la[^u]/) // the fact that CLL explicitly forbids two sequences `la` and `lai` signifies that `lau` is not forbidden
          || l.match(/[aeiouy]la[^u]/))
      );
    })
    .sort((a, b) => a.score - b.score);

  return answers;
}
