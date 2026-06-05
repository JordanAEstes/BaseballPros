import type { BattingStat } from "@/lib/db-types";

export type BattingTotals = {
  games: number;
  plateAppearances: number;
  atBats: number;
  hits: number;
  doubles: number;
  triples: number;
  homeRuns: number;
  walks: number;
  hitByPitch: number;
  sacrificeFlies: number;
  rbis: number;
  stolenBases: number;
  totalBases: number;
  battingAverage: number | null;
  slugging: number | null;
  onBasePercentage: number | null;
  ops: number | null;
};

function safeRate(numerator: number, denominator: number) {
  return denominator > 0 ? numerator / denominator : null;
}

export function getTotalBases(stat: BattingStat) {
  const singles = stat.hits - stat.doubles - stat.triples - stat.home_runs;

  return singles + stat.doubles * 2 + stat.triples * 3 + stat.home_runs * 4;
}

export function getBattingTotals(stats: BattingStat[]): BattingTotals {
  const totals = stats.reduce(
    (acc, stat) => {
      acc.plateAppearances += stat.plate_appearances;
      acc.atBats += stat.at_bats;
      acc.hits += stat.hits;
      acc.doubles += stat.doubles;
      acc.triples += stat.triples;
      acc.homeRuns += stat.home_runs;
      acc.walks += stat.walks;
      acc.hitByPitch += stat.hit_by_pitch;
      acc.sacrificeFlies += stat.sacrifice_flies;
      acc.rbis += stat.rbis;
      acc.stolenBases += stat.stolen_bases;
      acc.totalBases += getTotalBases(stat);

      return acc;
    },
    {
      games: stats.length,
      plateAppearances: 0,
      atBats: 0,
      hits: 0,
      doubles: 0,
      triples: 0,
      homeRuns: 0,
      walks: 0,
      hitByPitch: 0,
      sacrificeFlies: 0,
      rbis: 0,
      stolenBases: 0,
      totalBases: 0,
    },
  );

  const battingAverage = safeRate(totals.hits, totals.atBats);
  const slugging = safeRate(totals.totalBases, totals.atBats);
  const obpDenominator =
    totals.atBats + totals.walks + totals.hitByPitch + totals.sacrificeFlies;
  const onBasePercentage = safeRate(
    totals.hits + totals.walks + totals.hitByPitch,
    obpDenominator,
  );

  return {
    ...totals,
    battingAverage,
    slugging,
    onBasePercentage,
    ops:
      slugging === null || onBasePercentage === null
        ? null
        : slugging + onBasePercentage,
  };
}

export function formatRate(value: number | null) {
  if (value === null) {
    return "---";
  }

  return value.toFixed(3).replace(/^0/, "");
}
