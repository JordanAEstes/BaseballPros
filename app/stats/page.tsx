import {
  SignedOutStatsDashboard,
  StatsDashboard,
} from "@/components/stats-dashboard";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export default async function StatsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <main className="flex flex-1 items-center justify-center bg-background px-6 py-16">
        <SignedOutStatsDashboard />
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
      <StatsDashboard stats={stats} userEmail={user.email} />
    </main>
  );
}
