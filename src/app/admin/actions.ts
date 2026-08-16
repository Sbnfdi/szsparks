"use server";

import { db, initDb } from "@/db";
import type { Product } from "@/db/schema";
import { requireAuth } from "@/lib/auth";
import { login as authLogin, logout as authLogout } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import fs from "node:fs/promises";
import path from "node:path";

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

async function handleImageUpload(formData: FormData, fallbackUrl?: string): Promise<string | null> {
  const imageFile = formData.get("imageFile") as File | null;
  const imageUrlInput = (formData.get("imageUrl") as string | null)?.trim();
  const existingImageUrl = (formData.get("existingImageUrl") as string | null)?.trim();

  // 1. If a file was uploaded
  if (imageFile && typeof imageFile === "object" && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(imageFile.name) || ".jpg";
    const rawBaseName = path.basename(imageFile.name, ext);
    const sanitizedBase = rawBaseName.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 40) || "product";
    const fileName = `${sanitizedBase}-${Date.now()}${ext}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);

    return `/uploads/${fileName}`;
  }

  // 2. If a manual image URL / path was provided
  if (imageUrlInput && imageUrlInput.length > 0) {
    return imageUrlInput;
  }

  // 3. If keeping existing image (editing)
  if (existingImageUrl && existingImageUrl.length > 0) {
    return existingImageUrl;
  }

  // 4. Fallback if editing
  if (fallbackUrl && fallbackUrl.length > 0) {
    return fallbackUrl;
  }

  return null;
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

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const price = parseInt(formData.get("price") as string, 10);
  const category = (formData.get("category") as string)?.trim();

  if (!title || !description || isNaN(price) || !category) {
    return { error: "Please fill in all required fields." };
  }

  if (price <= 0) {
    return { error: "Price must be a valid positive number." };
  }

  const imageUrl = await handleImageUpload(formData);
  if (!imageUrl) {
    return { error: "Please upload an image or provide an image URL." };
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
  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const price = parseInt(formData.get("price") as string, 10);
  const category = (formData.get("category") as string)?.trim();

  if (!id || !title || !description || isNaN(price) || !category) {
    return { error: "Please fill in all required fields." };
  }

  if (price <= 0) {
    return { error: "Price must be a valid positive number." };
  }

  // Fetch current product to fallback to existing image if nothing new provided
  let fallbackUrl: string | undefined;
  try {
    const existing = await getProduct(id);
    if (existing) {
      fallbackUrl = existing.imageUrl;
    }
  } catch (e) {
    console.error("Failed to retrieve existing product for fallback image:", e);
  }

  const imageUrl = await handleImageUpload(formData, fallbackUrl);
  if (!imageUrl) {
    return { error: "Please upload an image or provide an image URL." };
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
