"use client";

import { useState } from "react";
import ProductCard from "./product-card";
import { CATEGORIES } from "@/lib/utils";
import type { Product } from "@/db/schema";
import { PackageOpen } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  showFilter?: boolean;
}

export default function ProductGrid({
  products,
  showFilter = true,
}: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const availableCategories = CATEGORIES.filter(
    (cat) => cat === "All" || products.some((p) => p.category === cat)
  );

  return (
    <div>
      {/* Category Filter Tabs */}
      {showFilter && (
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {availableCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeCategory === category
                  ? "bg-[#2D4B3E] text-white shadow-md shadow-[#2D4B3E]/20 scale-105"
                  : "bg-white border border-[#E2D6C6] text-[#241C18] hover:bg-[#F3ECE0] hover:border-[#8D493A]/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
          {filteredProducts.map((product) => (
            <div key={product.id} className="transition-all">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#E2D6C6] p-8 max-w-lg mx-auto shadow-sm">
          <PackageOpen
            size={56}
            className="mx-auto text-[#8A7B73] mb-4"
          />
          <h3 className="font-heading text-2xl font-bold text-[#241C18] mb-2">
            No creations found
          </h3>
          <p className="text-[#584A42] text-sm sm:text-base">
            {activeCategory !== "All"
              ? `No products in "${activeCategory}" currently. Check back soon or message us on WhatsApp for custom orders!`
              : "New handcrafted creations are being added. Check back shortly!"}
          </p>
        </div>
      )}
    </div>
  );
}
