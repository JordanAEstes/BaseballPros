"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const statCards = [
  { label: "Games tracked", value: "--" },
  { label: "At bats", value: "--" },
  { label: "Hits", value: "--" },
  { label: "Runs", value: "--" },
];

export function StatsDashboard() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="w-full max-w-5xl rounded border border-border-soft bg-surface p-6 shadow-sm">
        <div className="h-8 w-48 rounded bg-surface-muted" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className="h-24 rounded border border-border-soft bg-surface-muted"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!session?.user) {
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

  return (
    <section className="w-full max-w-5xl rounded border border-border-soft bg-surface p-6 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-border-soft pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">
            Stats dashboard
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-brand-primary">
            Baseball Pros stats
          </h1>
          <p className="mt-2 text-sm text-brand-neutral">
            Placeholder workspace for viewing, adding, and updating player
            stats.
          </p>
        </div>
        <button
          type="button"
          className="rounded bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-accent"
        >
          Add stat
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <article
            key={stat.label}
            className="rounded border border-border-soft bg-background p-4"
          >
            <p className="text-sm text-brand-neutral">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold text-brand-primary">
              {stat.value}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded border border-border-soft">
        <div className="grid grid-cols-3 bg-surface-muted px-4 py-3 text-sm font-semibold text-brand-primary">
          <span>Stat</span>
          <span>Value</span>
          <span>Status</span>
        </div>
        <div className="grid grid-cols-3 px-4 py-5 text-sm text-brand-neutral">
          <span>No stats yet</span>
          <span>--</span>
          <span>Ready for data</span>
        </div>
      </div>
    </section>
  );
}
