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

  // Get unique categories from actual products + CATEGORIES list
  const availableCategories = CATEGORIES.filter(
    (cat) => cat === "All" || products.some((p) => p.category === cat)
  );

  return (
    <div>
      {/* Category Filter */}
      {showFilter && (
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {availableCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-warm-cream text-text-secondary hover:bg-warm-beige hover:text-text-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "forwards",
                opacity: 0,
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <PackageOpen
            size={64}
            className="mx-auto text-text-muted/40 mb-4"
          />
          <h3 className="font-heading text-xl text-text-secondary mb-2">
            No products found
          </h3>
          <p className="text-text-muted text-sm">
            {activeCategory !== "All"
              ? `No products in the "${activeCategory}" category yet. Check back soon!`
              : "Products are coming soon. Stay tuned!"}
          </p>
        </div>
      )}
    </div>
  );
}
