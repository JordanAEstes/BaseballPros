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
      className="flex w-full max-w-sm flex-col gap-5 rounded border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-black"
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
          {isRegister ? "Create account" : "Log in"}
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {isRegister ? "Start tracking your stats." : "Welcome back."}
        </p>
      </div>

      {isRegister ? (
        <label className="flex flex-col gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Name
          <input
            name="name"
            type="text"
            autoComplete="name"
            required
            className="rounded border border-zinc-300 bg-white px-3 py-2 text-base text-zinc-950 outline-none transition focus:border-zinc-950 dark:border-zinc-700 dark:bg-black dark:text-zinc-50 dark:focus:border-zinc-100"
          />
        </label>
      ) : null}

      <label className="flex flex-col gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">
        Email
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className="rounded border border-zinc-300 bg-white px-3 py-2 text-base text-zinc-950 outline-none transition focus:border-zinc-950 dark:border-zinc-700 dark:bg-black dark:text-zinc-50 dark:focus:border-zinc-100"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">
        Password
        <input
          name="password"
          type="password"
          autoComplete={isRegister ? "new-password" : "current-password"}
          required
          minLength={8}
          className="rounded border border-zinc-300 bg-white px-3 py-2 text-base text-zinc-950 outline-none transition focus:border-zinc-950 dark:border-zinc-700 dark:bg-black dark:text-zinc-50 dark:focus:border-zinc-100"
        />
      </label>

      {error ? (
        <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        {isSubmitting
          ? isRegister
            ? "Creating..."
            : "Logging in..."
          : isRegister
            ? "Create account"
            : "Log in"}
      </button>

      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        {isRegister ? "Already have an account?" : "Need an account?"}{" "}
        <Link
          href={isRegister ? "/login" : "/register"}
          className="font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
        >
          {isRegister ? "Log in" : "Register"}
        </Link>
      </p>
    </form>
  );
}
