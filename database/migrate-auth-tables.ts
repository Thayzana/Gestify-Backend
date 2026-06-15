import { AppDataSource } from "./data-source.ts";

/** Cria tabelas users e customers no Supabase/Vercel (synchronize desligado em produção) */
export async function migrateAuthTables(): Promise<void> {
  await AppDataSource.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(32) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      role VARCHAR(16) NOT NULL DEFAULT 'operator',
      active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await AppDataSource.query(`
    CREATE TABLE IF NOT EXISTS customers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(32) NOT NULL,
      email VARCHAR(255),
      address VARCHAR(512),
      notes TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  console.log("[db] Tabelas users e customers verificadas");
}
