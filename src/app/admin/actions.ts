"use server";

import { db, initDb } from "@/db";
import type { Product } from "@/db/schema";
import { requireAuth } from "@/lib/auth";
import { login as authLogin, logout as authLogout } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Helper to map DB row to Product interface
function rowToProduct(row: any): Product {
  return {
    id: Number(row.id),
    title: String(row.title),
    description: String(row.description),
    price: Number(row.price),
    imageUrl: String(row.image_url),
    category: String(row.category),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

// ─── Auth Actions ────────────────────────────────────────

export async function loginAction(
  _prevState: { error: string } | null,
  formData: FormData
) {
  const password = formData.get("password") as string;

  if (!password) {
    return { error: "Password is required" };
  }

  const success = await authLogin(password);
  if (!success) {
    return { error: "Invalid password" };
  }

  redirect("/admin/dashboard");
}

export async function logoutAction() {
  await authLogout();
  redirect("/admin");
}

// ─── Product Actions (SQLite / Turso Direct) ─────────────

export async function getProducts(): Promise<Product[]> {
  try {
    await initDb();
    const result = await db.execute("SELECT * FROM products ORDER BY id DESC");
    return result.rows.map(rowToProduct);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export async function getProduct(id: number): Promise<Product | null> {
  try {
    await initDb();
    const result = await db.execute({
      sql: "SELECT * FROM products WHERE id = ? LIMIT 1",
      args: [id],
    });
    if (result.rows.length === 0) return null;
    return rowToProduct(result.rows[0]);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    await initDb();
    if (category === "All") {
      return await getProducts();
    }
    const result = await db.execute({
      sql: "SELECT * FROM products WHERE category = ? ORDER BY id DESC",
      args: [category],
    });
    return result.rows.map(rowToProduct);
  } catch (error) {
    console.error("Failed to fetch products by category:", error);
    return [];
  }
}

export async function createProduct(
  _prevState: { error?: string; success?: boolean } | null,
  formData: FormData
) {
  await requireAuth();
  await initDb();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseInt(formData.get("price") as string, 10);
  const imageUrl = formData.get("imageUrl") as string;
  const category = formData.get("category") as string;

  if (!title || !description || !price || !imageUrl || !category) {
    return { error: "All fields are required" };
  }

  if (isNaN(price) || price <= 0) {
    return { error: "Price must be a valid positive number" };
  }

  try {
    const now = new Date().toISOString();
    await db.execute({
      sql: `
        INSERT INTO products (title, description, price, image_url, category, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      args: [title, description, price, imageUrl, category, now, now],
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/shop");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to create product:", error);
    return { error: "Failed to create product. Please try again." };
  }
}

export async function updateProduct(
  _prevState: { error?: string; success?: boolean } | null,
  formData: FormData
) {
  await requireAuth();
  await initDb();

  const id = parseInt(formData.get("id") as string, 10);
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseInt(formData.get("price") as string, 10);
  const imageUrl = formData.get("imageUrl") as string;
  const category = formData.get("category") as string;

  if (!id || !title || !description || !price || !imageUrl || !category) {
    return { error: "All fields are required" };
  }

  try {
    const now = new Date().toISOString();
    await db.execute({
      sql: `
        UPDATE products 
        SET title = ?, description = ?, price = ?, image_url = ?, category = ?, updated_at = ?
        WHERE id = ?
      `,
      args: [title, description, price, imageUrl, category, now, id],
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/shop");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to update product:", error);
    return { error: "Failed to update product. Please try again." };
  }
}

export async function deleteProduct(id: number) {
  await requireAuth();
  await initDb();

  try {
    await db.execute({
      sql: "DELETE FROM products WHERE id = ?",
      args: [id],
    });
    revalidatePath("/admin/dashboard");
    revalidatePath("/shop");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { error: "Failed to delete product" };
  }
}
