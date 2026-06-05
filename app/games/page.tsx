import { GameLog } from "@/components/game-log";
import { SignedOutStats } from "@/components/signed-out-stats";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export default async function GamesPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <main className="flex flex-1 items-center justify-center bg-background px-6 py-16">
        <SignedOutStats />
      </main>
    );
  }

  const stats = await db
    .selectFrom("batting_stats")
    .selectAll()
    .where("user_id", "=", user.id)
    .orderBy("game_date", "desc")
    .orderBy("created_at", "desc")
    .execute();

  return (
    <main className="flex flex-1 justify-center bg-background px-6 py-16">
      <GameLog stats={stats} />
    </main>
  );
}
