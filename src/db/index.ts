import { createClient } from "@libsql/client";
import { seedInitialProducts } from "./seed";

// Supports local SQLite (file:local.db) and Turso Cloud (libsql://...)
const url = process.env.TURSO_CONNECTION_URL || "file:local.db";
const authToken = process.env.TURSO_AUTH_TOKEN || undefined;

export const db = createClient({
  url,
  authToken,
});

let initialized = false;

export async function initDb() {
  if (initialized) return;
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        price INTEGER NOT NULL,
        image_url TEXT NOT NULL,
        category TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `);
    initialized = true;
    await seedInitialProducts();
  } catch (error) {
    console.error("Failed to initialize database table:", error);
  }
}

