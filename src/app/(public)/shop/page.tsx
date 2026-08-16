import ProductGrid from "@/components/product-grid";
import { getProducts } from "@/app/admin/actions";
import { Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop — SZ Sparks | Handmade Pipe Cleaner Crafts",
  description:
    "Browse our full collection of handmade pipe cleaner crafts. Flowers, bouquets, animals, characters, and more — order directly via WhatsApp.",
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="pt-28 pb-20">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles size={14} />
            Our Collection
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            Shop Our <span className="text-gradient">Creations</span>
          </h1>
          <p className="text-text-muted max-w-xl mx-auto">
            Each piece is lovingly handcrafted from premium pipe cleaners.
            Click &quot;Order on WhatsApp&quot; on any item to place your order
            instantly.
          </p>
        </div>

        {/* Divider */}
        <div className="section-divider max-w-xs mx-auto mb-12" />

        {/* Product Grid */}
        <ProductGrid products={products} showFilter={true} />
      </div>
    </div>
  );
}
