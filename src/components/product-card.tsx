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
    <div className="group bg-white rounded-3xl overflow-hidden border border-[#E2D6C6] card-hover shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#F3ECE0]">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          unoptimized={product.imageUrl.startsWith("data:")}
          className="object-cover img-hover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Category Badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-white/95 text-[#2D4B3E] border border-[#E2D6C6] shadow-sm">
            {product.category}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-[#182B23]/0 group-hover:bg-[#182B23]/25 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-200">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
              <Eye size={20} className="text-[#2D4B3E]" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        {/* Title */}
        <h3 className="font-heading text-lg sm:text-xl font-bold text-[#241C18] group-hover:text-[#2D4B3E] transition-colors duration-200 line-clamp-1">
          {product.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-[#584A42] line-clamp-2 leading-relaxed font-normal">
          {product.description}
        </p>

        {/* Price & WhatsApp Action */}
        <div className="mt-5 pt-4 border-t border-[#E2D6C6]/60 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#8A7B73] block font-semibold">
              Price
            </span>
            <p className="text-xl font-bold text-[#2D4B3E] font-heading">
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
