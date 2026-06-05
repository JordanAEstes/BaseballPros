import Link from "next/link";
import { createBattingStat } from "@/app/games/actions";
import { BattingStatForm } from "@/components/batting-stat-form";
import { SignedOutStats } from "@/components/signed-out-stats";
import { getCurrentUser } from "@/lib/session";

export default async function NewGamePage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <main className="flex flex-1 items-center justify-center bg-background px-6 py-16">
        <SignedOutStats />
      </main>
    );
  }

  return (
    <main className="flex flex-1 justify-center bg-background px-6 py-16">
      <section className="w-full max-w-6xl rounded border border-border-soft bg-surface p-6 shadow-sm">
        <div className="border-b border-border-soft pb-6">
          <Link
            href="/games"
            className="text-sm font-medium text-brand-primary underline-offset-4 hover:text-brand-accent hover:underline"
          >
            Back to games
          </Link>
          <h1 className="mt-4 text-3xl font-semibold text-brand-primary">
            Add game
          </h1>
        </div>

        <BattingStatForm action={createBattingStat} submitLabel="Add game" />
      </section>
    </main>
  );
}
