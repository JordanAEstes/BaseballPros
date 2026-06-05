import Link from "next/link";
import { formatRate, getBattingTotals } from "@/lib/batting-stats";
import type { BattingStat } from "@/lib/db-types";

type StatsDashboardProps = {
  stats: BattingStat[];
  userEmail: string;
};

export function StatsDashboard({ stats, userEmail }: StatsDashboardProps) {
  const totals = getBattingTotals(stats);

  return (
    <section className="w-full max-w-6xl rounded border border-border-soft bg-surface p-6 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-border-soft pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">
            Stats dashboard
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-brand-primary">
            Batting stats
          </h1>
          <p className="mt-2 text-sm text-brand-neutral">
            Tracking batting data for {userEmail}.
          </p>
        </div>
        <Link
          href="/games"
          className="rounded bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-accent"
        >
          View games
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard label="Games" value={String(totals.games)} />
        <SummaryCard label="Plate appearances" value={String(totals.plateAppearances)} />
        <SummaryCard label="At bats" value={String(totals.atBats)} />
        <SummaryCard label="Hits" value={String(totals.hits)} />
        <SummaryCard label="Batting average" value={formatRate(totals.battingAverage)} />
        <SummaryCard label="Slugging" value={formatRate(totals.slugging)} />
        <SummaryCard label="OBP" value={formatRate(totals.onBasePercentage)} />
        <SummaryCard label="OPS" value={formatRate(totals.ops)} />
        <SummaryCard label="Home runs" value={String(totals.homeRuns)} />
        <SummaryCard label="RBIs" value={String(totals.rbis)} />
        <SummaryCard label="Stolen bases" value={String(totals.stolenBases)} />
        <SummaryCard label="Total bases" value={String(totals.totalBases)} />
      </div>
    </section>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded border border-border-soft bg-background p-4">
      <p className="text-sm text-brand-neutral">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-brand-primary">{value}</p>
    </article>
  );
}
