"use client";

import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  productName: string;
  price: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function WhatsAppButton({
  productName,
  price,
  className = "",
  size = "md",
}: WhatsAppButtonProps) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "923392280967";
  const message = encodeURIComponent(
    `Hello SZ Sparks, I am interested in buying "${productName}" for Rs. ${price.toLocaleString("en-PK")}. Please share more details.`
  );
  const url = `https://wa.me/${phone}?text=${message}`;

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2",
  };

  const iconSize = {
    sm: 12,
    md: 16,
    lg: 18,
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center font-semibold rounded-full btn-whatsapp ${sizeClasses[size]} ${className}`}
    >
      <MessageCircle size={iconSize[size]} />
      Order on WhatsApp
    </a>
  );
}
