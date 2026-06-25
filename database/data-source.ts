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

export function getSslConfig(): any {
  if (process.env.DB_SSL === "false") {
    return undefined;
  }

  const url = getDatabaseUrl();
  const isProdOrSupabase =
    process.env.VERCEL ||
    process.env.NODE_ENV === "production" ||
    url.includes("supabase.com") ||
    url.includes("supabase.co");

  if (process.env.DB_SSL === "true" || isProdOrSupabase) {
    const rejectUnauthorized = process.env.DB_SSL_REJECT_UNAUTHORIZED !== "false";
    const sslOptions: any = { rejectUnauthorized };

    if (process.env.DB_SSL_CA) {
      sslOptions.ca = process.env.DB_SSL_CA;
    }

    return sslOptions;
  }
  return undefined;
}

const sslConfig = getSslConfig();

const poolExtra: Record<string, unknown> = {
  connectionTimeoutMillis: 10_000,
  idleTimeoutMillis: 10_000,
};
if (sslConfig) {
  poolExtra.ssl = sslConfig;
}

export const AppDataSource = new DataSource({
  type: "postgres",
  url: getDatabaseUrl(),
  synchronize: !process.env.VERCEL,
  logging: process.env.DB_LOGGING === "true",
  ssl: sslConfig ? sslConfig : false,
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
