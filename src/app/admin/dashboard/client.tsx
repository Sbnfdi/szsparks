"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/admin/actions";
import ProductTable from "@/components/product-table";
import ProductForm from "@/components/product-form";
import {
  Plus,
  LogOut,
  Package,
  Sparkles,
  LayoutDashboard,
  Tag,
} from "lucide-react";
import type { Product } from "@/db/schema";

interface AdminDashboardClientProps {
  initialProducts: Product[];
}

export default function AdminDashboardClient({
  initialProducts,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSuccess = useCallback(() => {
    setShowForm(false);
    setEditingProduct(null);
    router.refresh();
  }, [router]);

  const handleRefresh = () => {
    router.refresh();
  };

  // Compute stats
  const totalProducts = initialProducts.length;
  const categories = new Set(initialProducts.map((p) => p.category));
  const totalCategories = categories.size;

  return (
    <div className="min-h-screen bg-admin-bg">
      {/* Top Bar */}
      <header className="border-b border-admin-border bg-admin-surface/50 backdrop-blur-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-admin-text">
                  SZ Sparks
                </h1>
                <p className="text-[10px] text-admin-text-muted">
                  Admin Dashboard
                </p>
              </div>
            </div>

            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-admin-border text-admin-text-muted hover:text-admin-text hover:bg-admin-surface-hover transition-all text-sm"
              >
                <LogOut size={14} />
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-admin-surface rounded-xl border border-admin-border p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-admin-text">
                  {totalProducts}
                </p>
                <p className="text-xs text-admin-text-muted">
                  Total Products
                </p>
              </div>
            </div>
          </div>
          <div className="bg-admin-surface rounded-xl border border-admin-border p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Tag size={18} className="text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-admin-text">
                  {totalCategories}
                </p>
                <p className="text-xs text-admin-text-muted">Categories</p>
              </div>
            </div>
          </div>
          <div className="bg-admin-surface rounded-xl border border-admin-border p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <LayoutDashboard size={18} className="text-accent-dark" />
              </div>
              <div>
                <p className="text-2xl font-bold text-admin-text">Active</p>
                <p className="text-xs text-admin-text-muted">Store Status</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-admin-text flex items-center gap-2">
            <Package size={20} />
            Products
          </h2>
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold text-sm hover:shadow-lg hover:shadow-primary/20 transition-all"
          >
            <Plus size={16} />
            Add Product
          </button>
        </div>

        <ProductTable
          products={initialProducts}
          onEdit={handleEdit}
          onRefresh={handleRefresh}
        />
      </main>

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={handleClose}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
