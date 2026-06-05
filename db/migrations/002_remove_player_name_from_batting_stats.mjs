import { sql } from "kysely";

export async function up(db) {
  await sql`alter table batting_stats drop column if exists player_name`.execute(db);
}

export async function down(db) {
  await sql`
    alter table batting_stats
    add column if not exists player_name text not null default 'Player'
  `.execute(db);
}
