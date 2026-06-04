import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center bg-background px-6 py-16 font-sans">
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-accent">
            Baseball Pros
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-brand-primary sm:text-5xl lg:text-6xl">
            Keep every player, game, and stat in one clean clubhouse.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-primary/75 dark:text-brand-neutral">
            Track the numbers that matter from practice notes to season-long
            performance.
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <Image
            src="/Baseball_Pros_Logo.png"
            alt="Baseball Pros logo"
            width={620}
            height={244}
            priority
            className="w-full max-w-xl"
          />
        </div>
      </section>
    </main>
  );
}
