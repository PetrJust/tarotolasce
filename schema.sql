-- Schéma databáze pro Tarot o Lásce (PostgreSQL).
-- Aplikace si tabulky vytvoří sama při prvním připojení (viz lib/db.ts),
-- tento soubor je pro ruční založení nebo kontrolu.

create table if not exists readings (
  id          text primary key,
  email       text,
  question    text not null,
  spread_key  text not null,
  spread_name text not null,
  cards       jsonb not null,
  text        text not null,
  created_at  bigint not null
);
create index if not exists readings_email_idx on readings (email, created_at desc);

create table if not exists feedback (
  reading_id text primary key,
  rating     text not null,
  comment    text not null default '',
  created_at bigint not null
);
