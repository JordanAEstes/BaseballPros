import { AuthForm } from "@/components/auth-form";

export default function RegisterPage() {
  return (
    <main className="flex min-h-full flex-1 items-center justify-center bg-zinc-50 px-6 py-16 dark:bg-black">
      <AuthForm mode="register" />
    </main>
  );
}
