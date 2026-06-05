import Link from "next/link";
import { createBattingStat, updateBattingStat } from "@/app/stats/actions";
import {
  formatRate,
  getBattingTotals,
  getTotalBases,
} from "@/lib/batting-stats";
import type { BattingStat } from "@/lib/db-types";

type StatsDashboardProps = {
  stats: BattingStat[];
  userEmail: string;
};

const statInputs = [
  ["plate_appearances", "PA (plate appearances)"],
  ["at_bats", "AB (at bats)"],
  ["hits", "H (hits)"],
  ["doubles", "2B (doubles)"],
  ["triples", "3B (triples)"],
  ["home_runs", "HR (home runs)"],
  ["walks", "BB (walks)"],
  ["hit_by_pitch", "HBP (hit by pitch)"],
  ["sacrifice_flies", "SF (sacrifice flies)"],
  ["rbis", "RBI (runs batted in)"],
  ["stolen_bases", "SB (stolen bases)"],
] as const;

function formatDateValue(value: BattingStat["game_date"]) {
  if (!value) {
    return "";
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return value;
}

export function SignedOutStatsDashboard() {
  return (
    <section className="w-full max-w-md rounded border border-border-soft bg-surface p-6 text-center shadow-sm">
      <h1 className="text-2xl font-semibold text-brand-primary">
        Log in to view stats
      </h1>
      <p className="mt-3 text-sm leading-6 text-brand-neutral">
        Player stats are only available after signing in.
      </p>
      <Link
        href="/login"
        className="mt-6 inline-flex rounded bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-accent"
      >
        Log in
      </Link>
    </section>
  );
}

export function StatsDashboard({ stats, userEmail }: StatsDashboardProps) {
  const totals = getBattingTotals(stats);

  return (
    <section className="w-full max-w-6xl rounded border border-border-soft bg-surface p-6 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-border-soft pb-6">
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

      <div className="mt-8 rounded border border-border-soft bg-background p-4">
        <h2 className="text-xl font-semibold text-brand-primary">Add game</h2>
        <BattingStatForm action={createBattingStat} submitLabel="Add stat" />
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-brand-primary">Game log</h2>
        {stats.length === 0 ? (
          <p className="rounded border border-border-soft px-4 py-5 text-sm text-brand-neutral">
            No batting stats yet.
          </p>
        ) : (
          stats.map((stat) => (
            <article
              key={stat.id}
              className="rounded border border-border-soft bg-background p-4"
            >
              <div className="mb-4 flex flex-col gap-1 text-sm text-brand-neutral sm:flex-row sm:items-center sm:justify-between">
                <span>
                  {stat.opponent ? `vs ${stat.opponent}` : "Game entry"}
                </span>
                <span>{formatDateValue(stat.game_date) || "No date"}</span>
              </div>
              <BattingStatForm
                action={updateBattingStat}
                stat={stat}
                submitLabel="Update stat"
              />
              <div className="mt-3 text-sm text-brand-neutral">
                Total bases: {getTotalBases(stat)}
              </div>
            </article>
          ))
        )}
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

function BattingStatForm({
  action,
  stat,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  stat?: BattingStat;
  submitLabel: string;
}) {
  return (
    <form action={action} className="mt-4 grid gap-4">
      {stat ? <input type="hidden" name="id" value={stat.id} /> : null}

      <div className="grid gap-4 md:grid-cols-3">
        <TextInput
          label="Game date"
          name="game_date"
          type="date"
          defaultValue={formatDateValue(stat?.game_date ?? null)}
        />
        <TextInput
          label="Opponent"
          name="opponent"
          defaultValue={stat?.opponent ?? ""}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {statInputs.map(([name, label]) => (
          <NumberInput
            key={name}
            label={label}
            name={name}
            defaultValue={stat?.[name] ?? 0}
          />
        ))}
      </div>

      <div>
        <button
          type="submit"
          className="rounded bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-accent"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

function TextInput({
  label,
  name,
  type = "text",
  required = false,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-brand-primary dark:text-brand-neutral">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="rounded border border-border-soft bg-surface px-3 py-2 text-base text-foreground outline-none transition focus:border-brand-primary"
      />
    </label>
  );
}

function NumberInput({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue: number;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-brand-primary dark:text-brand-neutral">
      {label}
      <input
        name={name}
        type="number"
        min="0"
        step="1"
        defaultValue={defaultValue}
        className="rounded border border-border-soft bg-surface px-3 py-2 text-base text-foreground outline-none transition focus:border-brand-primary"
      />
    </label>
  );
}
