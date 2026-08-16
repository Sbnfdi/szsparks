import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export function getWhatsAppUrl(productName: string, price: number): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "923392280967";
  const message = encodeURIComponent(
    `Hello SZ Sparks, I am interested in buying "${productName}" for Rs. ${price.toLocaleString("en-PK")}. Please share details.`
  );
  return `https://wa.me/${phone}?text=${message}`;
}

export const CATEGORIES = [
  "All",
  "Flowers",
  "Bouquets",
  "Animals",
  "Characters",
  "Decorations",
  "Key Chains",
  "Custom Orders",
] as const;

export type Category = (typeof CATEGORIES)[number];
