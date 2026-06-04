"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function AuthStatus() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut();
    router.refresh();
  }

  if (isPending) {
    return <div className="h-10 w-40 rounded bg-zinc-100 dark:bg-zinc-900" />;
  }

  if (session?.user) {
    return (
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="text-zinc-600 dark:text-zinc-400">
          {session.user.email}
        </span>
        <button
          type="button"
          onClick={handleSignOut}
          className="rounded border border-zinc-300 px-4 py-2 font-medium text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        href="/login"
        className="rounded border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
      >
        Log in
      </Link>
      <Link
        href="/register"
        className="rounded bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        Register
      </Link>
    </div>
  );
}
