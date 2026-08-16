"use client";

import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import WhatsAppButton from "./whatsapp-button";
import type { Product } from "@/db/schema";
import { Eye } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-surface rounded-2xl overflow-hidden border border-border-light card-hover shadow-sm">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-warm-cream">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover img-hover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/90 text-primary-dark backdrop-blur-sm border border-white/50 shadow-sm">
            {product.category}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/20 transition-all duration-500 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Eye size={20} className="text-primary-dark" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="font-heading text-lg font-semibold text-text-primary group-hover:text-primary transition-colors duration-300 line-clamp-1">
          {product.title}
        </h3>

        {/* Description */}
        <p className="mt-1.5 text-sm text-text-muted line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price & Action */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xl font-bold text-primary font-heading">
              {formatPrice(product.price)}
            </p>
          </div>
          <WhatsAppButton
            productName={product.title}
            price={product.price}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
