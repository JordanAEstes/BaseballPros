import type { BattingStat } from "@/lib/db-types";

const statInputs = [
  ["plate_appearances", "PA (plate appearances)"],
  ["at_bats", "AB (at bats)"],
  ["hits", "H (hits)"],
  ["doubles", "2B (doubles)"],
  ["triples", "3B (triples)"],
  ["home_runs", "HR (home runs)"],
  ["walks", "BB (walks)"],
  ["hit_by_pitch", "HBP (hit by pitch)"],
  ["sacrifice_flies", "SF (sacrifice flies)"],
  ["rbis", "RBI (runs batted in)"],
  ["stolen_bases", "SB (stolen bases)"],
] as const;

export function formatDateValue(value: BattingStat["game_date"]) {
  if (!value) {
    return "";
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return value;
}

export function BattingStatForm({
  action,
  stat,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  stat?: BattingStat;
  submitLabel: string;
}) {
  return (
    <form action={action} className="mt-4 grid gap-4">
      {stat ? <input type="hidden" name="id" value={stat.id} /> : null}

      <div className="grid gap-4 md:grid-cols-3">
        <TextInput
          label="Game date"
          name="game_date"
          type="date"
          defaultValue={formatDateValue(stat?.game_date ?? null)}
        />
        <TextInput
          label="Opponent"
          name="opponent"
          defaultValue={stat?.opponent ?? ""}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {statInputs.map(([name, label]) => (
          <NumberInput
            key={name}
            label={label}
            name={name}
            defaultValue={stat?.[name] ?? 0}
          />
        ))}
      </div>

      <div>
        <button
          type="submit"
          className="rounded bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-accent"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

function TextInput({
  label,
  name,
  type = "text",
  required = false,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-brand-primary dark:text-brand-neutral">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="rounded border border-border-soft bg-surface px-3 py-2 text-base text-foreground outline-none transition focus:border-brand-primary"
      />
    </label>
  );
}

function NumberInput({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue: number;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-brand-primary dark:text-brand-neutral">
      {label}
      <input
        name={name}
        type="number"
        min="0"
        step="1"
        defaultValue={defaultValue}
        className="rounded border border-border-soft bg-surface px-3 py-2 text-base text-foreground outline-none transition focus:border-brand-primary"
      />
    </label>
  );
}
