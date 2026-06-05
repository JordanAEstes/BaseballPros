import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";

type Timestamp = ColumnType<Date, Date | string | undefined, Date | string>;

export type BattingStatsTable = {
  id: Generated<string>;
  user_id: string;
  game_date: ColumnType<
    Date | string | null,
    string | null | undefined,
    string | null
  >;
  opponent: ColumnType<string | null, string | null | undefined, string | null>;
  plate_appearances: ColumnType<number, number | undefined, number>;
  at_bats: ColumnType<number, number | undefined, number>;
  hits: ColumnType<number, number | undefined, number>;
  doubles: ColumnType<number, number | undefined, number>;
  triples: ColumnType<number, number | undefined, number>;
  home_runs: ColumnType<number, number | undefined, number>;
  walks: ColumnType<number, number | undefined, number>;
  hit_by_pitch: ColumnType<number, number | undefined, number>;
  sacrifice_flies: ColumnType<number, number | undefined, number>;
  rbis: ColumnType<number, number | undefined, number>;
  stolen_bases: ColumnType<number, number | undefined, number>;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp;
};

export type Database = {
  batting_stats: BattingStatsTable;
};

export type BattingStat = Selectable<BattingStatsTable>;
export type NewBattingStat = Insertable<BattingStatsTable>;
export type BattingStatUpdate = Updateable<BattingStatsTable>;
