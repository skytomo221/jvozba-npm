import bondRafsis from './bondRafsis';
import lujvoScore from './lujvoScore';
import rafsiCandidates from './rafsiCandidates';
import { possibilityCombinations, isCmevla } from './tools';

type LujvoAndScore = { lujvo: string; score: number };

export default function jvozba(
  words: string[],
  forbidLaLaiDoi: boolean = false,
  experimental: boolean = true,
): LujvoAndScore[] {
  return possibilityCombinations(
    words.map((word, index) => rafsiCandidates(word, index === words.length - 1, experimental)),
  )
    .map((rafsis) => bondRafsis(rafsis))
    .map((rafsis) => ({ lujvo: rafsis.join(''), score: lujvoScore(rafsis) }))
    .filter(
      ({ lujvo }) => !(
        isCmevla(lujvo)
          && forbidLaLaiDoi
          // the fact that CLL explicitly forbids two sequences `la` and `lai` signifies
          // that `lau` is not forbidden
          && lujvo.match(/^(lai|doi)|[aeiouy](lai|doi)|^la[^u]|[aeiouy]la[^u]/)
      ),
    )
    .sort((a, b) => a.score - b.score);
}
