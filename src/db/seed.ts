import { db, initDb } from "./index";

export const realProducts = [
  {
    title: "Handmade Pink Bow Mirror Keychain",
    description: "Charming black & soft pink handmade pipe cleaner mirror keychain with crystal bow accent and gold key ring. Practical, portable, and adorable.",
    price: 500,
    imageUrl: "/products/mirror-keychain.jpg",
    category: "Key Chains",
  },
  {
    title: "Fuzzy Bear Charm Keychain",
    description: "Cute handcrafted fuzzy bear face charm made with dense chenille stems, vibrant pink ears, and matching bowtie with sturdy gold keyring.",
    price: 500,
    imageUrl: "/products/bear-keychain.jpg",
    category: "Key Chains",
  },
  {
    title: "Purple Pearl Jellyfish Hanging Lamp Decor",
    description: "Whimsical handmade deep purple & lavender jellyfish with spiral tentacles and luminous pearl beads. Perfect ambient hanging decoration.",
    price: 1400,
    imageUrl: "/products/jellyfish-lamp.jpg",
    category: "Decorations",
  },
  {
    title: "Pearl Blossom Wooden Slice Lamp Decor",
    description: "Exquisite handmade pipe cleaner flowers with lustrous pearl centers mounted on a natural rustic wood slice. Perfect bedside or table centerpiece.",
    price: 1600,
    imageUrl: "/products/rustic-floral-lamp.jpg",
    category: "Decorations",
  },
  {
    title: "Pastel Floral Wooden Log Arrangement",
    description: "Lush multi-flower arrangement featuring pastel pink and purple pipe cleaner blossoms with pearl centers on an authentic natural wood log slice.",
    price: 1500,
    imageUrl: "/products/floral-wood-arrangement.jpg",
    category: "Flowers",
  },
];

export async function seedInitialProducts() {
  await initDb();
  try {
    const existing = await db.execute("SELECT COUNT(*) as count FROM products");
    const count = Number((existing.rows[0] as any).count || 0);

    if (count === 0) {
      console.log("Seeding initial products...");
      const now = new Date().toISOString();
      for (const p of realProducts) {
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
