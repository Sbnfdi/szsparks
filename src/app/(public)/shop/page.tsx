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
    <div className="pt-32 pb-24 bg-[#FAF6F0] min-h-screen">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2D4B3E]/10 text-[#2D4B3E] text-xs sm:text-sm font-bold mb-3">
            <Sparkles size={14} className="text-[#8D493A]" />
            Full Collection
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-[#241C18] mb-4">
            Shop Our <span className="text-[#8D493A]">Creations</span>
          </h1>
          <p className="text-[#584A42] max-w-xl mx-auto text-base sm:text-lg">
            Each piece is handcrafted with love. Click &quot;Order on WhatsApp&quot; on any item to connect with us instantly.
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
