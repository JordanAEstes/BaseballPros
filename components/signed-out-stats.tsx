import Link from "next/link";

export function SignedOutStats() {
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
