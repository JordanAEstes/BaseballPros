import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import type { Database } from "@/lib/db-types";

const globalForDb = globalThis as typeof globalThis & {
  baseballProsDb?: Kysely<Database>;
};

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

export const db =
  globalForDb.baseballProsDb ??
  new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: createPool(),
    }),
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.baseballProsDb = db;
}
