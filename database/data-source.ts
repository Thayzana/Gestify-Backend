import "reflect-metadata";
import { DataSource } from "typeorm";
import {
  Product,
  Recipe,
  RecipeIngredient,
  InvisibleCost,
  SalesHistory,
  Promotion,
  Supplier,
  Order,
  User,
  Customer,
} from "../entities/index.ts";

export function getDatabaseUrl(): string {
  return (
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@localhost:5432/gestify"
  );
}

export function getSslConfig(): { rejectUnauthorized: boolean } | undefined {
  const url = getDatabaseUrl();
  if (
    process.env.VERCEL ||
    process.env.NODE_ENV === "production" ||
    url.includes("supabase.com") ||
    url.includes("supabase.co")
  ) {
    return { rejectUnauthorized: false };
  }
  return undefined;
}

const sslConfig = getSslConfig();

const poolExtra: Record<string, unknown> = {
  connectionTimeoutMillis: 10_000,
  idleTimeoutMillis: 10_000,
};
if (sslConfig) {
  poolExtra.ssl = { rejectUnauthorized: false };
}

export const AppDataSource = new DataSource({
  type: "postgres",
  url: getDatabaseUrl(),
  synchronize: !process.env.VERCEL,
  logging: process.env.DB_LOGGING === "true",
  ssl: sslConfig ? true : false,
  extra: poolExtra,
  entities: [
    Product,
    Recipe,
    RecipeIngredient,
    InvisibleCost,
    SalesHistory,
    Promotion,
    Supplier,
    Order,
    User,
    Customer,
  ],
});
