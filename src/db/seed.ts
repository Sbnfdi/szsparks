import { db, initDb } from "./index";

const sampleProducts = [
  {
    title: "Handmade Lavender & Daisy Bouquet",
    description: "Intricately twisted pastel purple lavenders and delicate white daisies crafted from soft pipe cleaners. Will never wither!",
    price: 1800,
    imageUrl: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80",
    category: "Bouquets",
  },
  {
    title: "Artisanal Sunflower Stems",
    description: "Vibrant yellow pipe cleaner sunflowers with velvety brown centers and flexible green leaves. Bring sunshine indoors.",
    price: 1200,
    imageUrl: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80",
    category: "Flowers",
  },
  {
    title: "Fuzzy Blossom Peony Pot",
    description: "Lush pink layered peony handcrafted from premium fuzzy chenille stems in a mini decorative rustic pot.",
    price: 1500,
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    category: "Decorations",
  },
  {
    title: "Cute Fuzzy Bunny Figurine",
    description: "Adorable handmade white and blush-pink bunny made with ultra-soft pipe cleaners. Perfect desk companion.",
    price: 950,
    imageUrl: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=800&q=80",
    category: "Animals",
  },
  {
    title: "Classic Red Rose Stem",
    description: "Romantic velvet-touch red rose made with high-density chenille pipe cleaners. Eternal symbol of affection.",
    price: 850,
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    category: "Flowers",
  },
  {
    title: "Mini Totoro Character Figurine",
    description: "Handcrafted cute studio-inspired pipe cleaner character with leaf umbrella and leafy base.",
    price: 1100,
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    category: "Characters",
  },
];

export async function seedInitialProducts() {
  await initDb();
  try {
    const existing = await db.execute("SELECT COUNT(*) as count FROM products");
    const count = Number((existing.rows[0] as any).count || 0);

    if (count === 0) {
      console.log("Seeding initial sample products...");
      const now = new Date().toISOString();
      for (const p of sampleProducts) {
        await db.execute({
          sql: `INSERT INTO products (title, description, price, image_url, category, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
          args: [p.title, p.description, p.price, p.imageUrl, p.category, now, now],
        });
      }
      console.log("Seeding completed successfully!");
    }
  } catch (error) {
    console.error("Error seeding products:", error);
  }
}
