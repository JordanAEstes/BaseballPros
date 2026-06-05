"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import type { BattingStatUpdate } from "@/lib/db-types";
import { getCurrentUser } from "@/lib/session";

const numberFields = [
  "plate_appearances",
  "at_bats",
  "hits",
  "doubles",
  "triples",
  "home_runs",
  "walks",
  "hit_by_pitch",
  "sacrifice_flies",
  "rbis",
  "stolen_bases",
] as const;

type NumberField = (typeof numberFields)[number];
type StatNumberValues = Record<NumberField, number>;

function getString(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value.length > 0 ? value : null;
}

function getNumber(formData: FormData, key: NumberField) {
  const value = Number(formData.get(key) ?? 0);
  return Number.isFinite(value) && value >= 0 ? Math.trunc(value) : 0;
}

function getStatValues(formData: FormData) {
  const values = Object.fromEntries(
    numberFields.map((field) => [field, getNumber(formData, field)]),
  ) as StatNumberValues;

  values.hits = Math.max(
    values.hits,
    values.doubles + values.triples + values.home_runs,
  );
  values.plate_appearances = Math.max(
    values.plate_appearances,
    values.at_bats + values.walks + values.hit_by_pitch + values.sacrifice_flies,
  );

  return {
    game_date: getString(formData, "game_date"),
    opponent: getString(formData, "opponent"),
    ...values,
  };
}

export async function createBattingStat(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  await db
    .insertInto("batting_stats")
    .values({
      user_id: user.id,
      ...getStatValues(formData),
    })
    .execute();

  revalidatePath("/stats");
}

export async function updateBattingStat(formData: FormData) {
  const user = await getCurrentUser();
  const id = getString(formData, "id");

  if (!user || !id) {
    throw new Error("Unauthorized");
  }

  const values: BattingStatUpdate = {
    ...getStatValues(formData),
    updated_at: new Date(),
  };

  await db
    .updateTable("batting_stats")
    .set(values)
    .where("id", "=", id)
    .where("user_id", "=", user.id)
    .executeTakeFirst();

  revalidatePath("/stats");
}
