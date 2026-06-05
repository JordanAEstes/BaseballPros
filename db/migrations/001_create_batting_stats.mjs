import { sql } from "kysely";

export async function up(db) {
  await sql`create extension if not exists pgcrypto`.execute(db);

  await db.schema
    .createTable("batting_stats")
    .ifNotExists()
    .addColumn("id", "uuid", (column) =>
      column.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("user_id", "text", (column) =>
      column.notNull().references("user.id").onDelete("cascade"),
    )
    .addColumn("game_date", "date")
    .addColumn("opponent", "text")
    .addColumn("plate_appearances", "integer", (column) =>
      column.notNull().defaultTo(0).check(sql`plate_appearances >= 0`),
    )
    .addColumn("at_bats", "integer", (column) =>
      column.notNull().defaultTo(0).check(sql`at_bats >= 0`),
    )
    .addColumn("hits", "integer", (column) =>
      column.notNull().defaultTo(0).check(sql`hits >= 0`),
    )
    .addColumn("doubles", "integer", (column) =>
      column.notNull().defaultTo(0).check(sql`doubles >= 0`),
    )
    .addColumn("triples", "integer", (column) =>
      column.notNull().defaultTo(0).check(sql`triples >= 0`),
    )
    .addColumn("home_runs", "integer", (column) =>
      column.notNull().defaultTo(0).check(sql`home_runs >= 0`),
    )
    .addColumn("walks", "integer", (column) =>
      column.notNull().defaultTo(0).check(sql`walks >= 0`),
    )
    .addColumn("hit_by_pitch", "integer", (column) =>
      column.notNull().defaultTo(0).check(sql`hit_by_pitch >= 0`),
    )
    .addColumn("sacrifice_flies", "integer", (column) =>
      column.notNull().defaultTo(0).check(sql`sacrifice_flies >= 0`),
    )
    .addColumn("rbis", "integer", (column) =>
      column.notNull().defaultTo(0).check(sql`rbis >= 0`),
    )
    .addColumn("stolen_bases", "integer", (column) =>
      column.notNull().defaultTo(0).check(sql`stolen_bases >= 0`),
    )
    .addColumn("created_at", "timestamptz", (column) =>
      column.notNull().defaultTo(sql`now()`),
    )
    .addColumn("updated_at", "timestamptz", (column) =>
      column.notNull().defaultTo(sql`now()`),
    )
    .addCheckConstraint(
      "batting_stats_at_bats_lte_plate_appearances",
      sql`at_bats <= plate_appearances`,
    )
    .addCheckConstraint(
      "batting_stats_events_lte_plate_appearances",
      sql`at_bats + walks + hit_by_pitch + sacrifice_flies <= plate_appearances`,
    )
    .addCheckConstraint(
      "batting_stats_hits_cover_extra_base_hits",
      sql`hits >= doubles + triples + home_runs`,
    )
    .execute();

  await db.schema
    .createIndex("batting_stats_user_id_idx")
    .ifNotExists()
    .on("batting_stats")
    .column("user_id")
    .execute();

  await db.schema
    .createIndex("batting_stats_user_game_date_idx")
    .ifNotExists()
    .on("batting_stats")
    .columns(["user_id", "game_date"])
    .execute();
}

export async function down(db) {
  await db.schema.dropTable("batting_stats").ifExists().execute();
}
