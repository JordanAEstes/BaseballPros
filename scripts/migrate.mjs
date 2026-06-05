import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  Kysely,
  Migrator,
  PostgresDialect,
  NO_MIGRATIONS,
} from "kysely";
import nextEnv from "@next/env";
import { Pool } from "pg";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationsPath = path.join(dirname, "..", "db", "migrations");
const { loadEnvConfig } = nextEnv;

loadEnvConfig(path.join(dirname, ".."));

function createPool() {
  return new Pool(
    process.env.DATABASE_URL
      ? { connectionString: process.env.DATABASE_URL }
      : {
          host: process.env.PGHOST,
          database: process.env.PGDATABASE,
          user: process.env.PGUSER,
        },
  );
}

const db = new Kysely({
  dialect: new PostgresDialect({
    pool: createPool(),
  }),
});

const migrator = new Migrator({
  db,
  provider: {
    async getMigrations() {
      const files = await fs.readdir(migrationsPath);
      const migrations = {};

      for (const file of files.filter((entry) => entry.endsWith(".mjs")).sort()) {
        const name = file.replace(/\.mjs$/, "");
        migrations[name] = await import(
          pathToFileURL(path.join(migrationsPath, file)).href
        );
      }

      return migrations;
    },
  },
});

const direction = process.argv[2] ?? "latest";
const result =
  direction === "down"
    ? await migrator.migrateDown()
    : direction === "none"
      ? await migrator.migrateTo(NO_MIGRATIONS)
      : await migrator.migrateToLatest();

for (const migration of result.results ?? []) {
  if (migration.status === "Success") {
    console.log(`Migration ${migration.migrationName} ${migration.direction}`);
  } else if (migration.status === "Error") {
    console.error(`Failed to run ${migration.migrationName}`);
  }
}

if (result.error) {
  console.error(result.error);
  await db.destroy();
  process.exit(1);
}

await db.destroy();
