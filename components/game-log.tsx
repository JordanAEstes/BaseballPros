import Link from "next/link";
import { DeleteGameButton } from "@/components/delete-game-button";
import { formatDateValue } from "@/components/batting-stat-form";
import { getTotalBases } from "@/lib/batting-stats";
import type { BattingStat } from "@/lib/db-types";

type GameLogProps = {
  stats: BattingStat[];
};

const gameStatLabels = [
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

export function GameLog({ stats }: GameLogProps) {
  return (
    <section className="w-full max-w-6xl rounded border border-border-soft bg-surface p-6 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-border-soft pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">
            Games
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-brand-primary">
            Game log
          </h1>
        </div>
        <Link
          href="/games/new"
          className="rounded bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-accent"
        >
          Add game
        </Link>
      </div>

      <div className="mt-8 space-y-4">
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
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-brand-primary">
                    {stat.opponent ? `vs ${stat.opponent}` : "Game entry"}
                  </h2>
                  <p className="mt-1 text-sm text-brand-neutral">
                    {formatDateValue(stat.game_date) || "No date"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/games/${stat.id}/edit`}
                    className="rounded border border-border-soft px-4 py-2 text-sm font-medium text-brand-primary transition hover:border-brand-accent hover:text-brand-accent"
                  >
                    Edit
                  </Link>
                  <DeleteGameButton gameId={stat.id} />
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {gameStatLabels.map(([field, label]) => (
                  <div
                    key={field}
                    className="rounded border border-border-soft bg-surface px-3 py-2"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-neutral">
                      {label}
                    </p>
                    <p className="mt-1 text-xl font-semibold text-brand-primary">
                      {stat[field]}
                    </p>
                  </div>
                ))}
                <div className="rounded border border-border-soft bg-surface px-3 py-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-neutral">
                    TB (total bases)
                  </p>
                  <p className="mt-1 text-xl font-semibold text-brand-primary">
                    {getTotalBases(stat)}
                  </p>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
