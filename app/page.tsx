import Image from "next/image";
import { AuthStatus } from "@/components/auth-status";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center gap-10 px-8 py-24 bg-white dark:bg-black sm:items-start">
        <div className="flex w-full flex-col items-center gap-8 sm:items-start">
          <Image
          className="dark:invert"
          src="/Baseball_Pros_Logo.png"
          alt="Baseball Pros logo"
          width={520}
          height={204}
          priority
        />
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Track all your important stats!
          </p>
          <AuthStatus />
        </div>
      </main>
    </div>
  );
}
