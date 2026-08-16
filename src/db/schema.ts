export interface Product {
  id: number;
  title: string;
  description: string;
  price: number; // Price in PKR
  imageUrl: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export type NewProduct = Omit<Product, "id" | "createdAt" | "updatedAt">;
