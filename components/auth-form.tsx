"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";

type AuthMode = "login" | "register";

type AuthFormProps = {
  mode: AuthMode;
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRegister = mode === "register";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const name = String(formData.get("name") ?? "");

    const result = isRegister
      ? await authClient.signUp.email({ email, password, name })
      : await authClient.signIn.email({ email, password });

    setIsSubmitting(false);

    if (result.error) {
      setError(result.error.message ?? "Something went wrong.");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-5 rounded border border-border-soft bg-surface p-6 shadow-sm sm:w-96"
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-brand-primary">
          {isRegister ? "Create account" : "Log in"}
        </h1>
        <p className="text-sm text-brand-neutral">
          {isRegister ? "Start tracking your stats." : "Welcome back."}
        </p>
      </div>

      {isRegister ? (
        <label className="flex flex-col gap-2 text-sm font-medium text-brand-primary dark:text-brand-neutral">
          Name
          <input
            name="name"
            type="text"
            autoComplete="name"
            required
            className="rounded border border-border-soft bg-surface px-3 py-2 text-base text-foreground outline-none transition focus:border-brand-primary"
          />
        </label>
      ) : null}

      <label className="flex flex-col gap-2 text-sm font-medium text-brand-primary dark:text-brand-neutral">
        Email
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className="rounded border border-border-soft bg-surface px-3 py-2 text-base text-foreground outline-none transition focus:border-brand-primary"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-brand-primary dark:text-brand-neutral">
        Password
        <input
          name="password"
          type="password"
          autoComplete={isRegister ? "new-password" : "current-password"}
          required
          minLength={8}
          className="rounded border border-border-soft bg-surface px-3 py-2 text-base text-foreground outline-none transition focus:border-brand-primary"
        />
      </label>

      {error ? (
        <p className="rounded border border-brand-accent/30 bg-brand-accent/10 px-3 py-2 text-sm text-brand-accent">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting
          ? isRegister
            ? "Creating..."
            : "Logging in..."
          : isRegister
            ? "Create account"
            : "Log in"}
      </button>

      <p className="text-center text-sm text-brand-neutral">
        {isRegister ? "Already have an account?" : "Need an account?"}{" "}
        <Link
          href={isRegister ? "/login" : "/register"}
          className="font-medium text-brand-primary underline-offset-4 hover:text-brand-accent hover:underline"
        >
          {isRegister ? "Log in" : "Register"}
        </Link>
      </p>
    </form>
  );
}
