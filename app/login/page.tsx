import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-background px-6 py-16">
      <AuthForm mode="login" />
    </main>
  );
}
