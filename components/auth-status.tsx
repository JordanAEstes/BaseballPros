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
    return <div className="h-10 w-40 rounded bg-surface-muted" />;
  }

  if (session?.user) {
    return (
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="text-brand-primary dark:text-brand-neutral">
          {session.user.email}
        </span>
        <button
          type="button"
          onClick={handleSignOut}
          className="rounded border border-border-soft px-4 py-2 font-medium text-brand-primary transition hover:border-brand-accent hover:text-brand-accent"
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
        className="rounded border border-border-soft px-4 py-2 text-sm font-medium text-brand-primary transition hover:border-brand-accent hover:text-brand-accent"
      >
        Log in
      </Link>
      <Link
        href="/register"
        className="rounded bg-brand-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-accent"
      >
        Register
      </Link>
    </div>
  );
}
