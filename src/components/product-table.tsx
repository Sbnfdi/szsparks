"use client";

import { useState } from "react";
import { deleteProduct } from "@/app/admin/actions";
import { formatPrice } from "@/lib/utils";
import {
  Pencil,
  Trash2,
  AlertTriangle,
  X,
  ExternalLink,
} from "lucide-react";
import type { Product } from "@/db/schema";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onRefresh: () => void;
}

export default function ProductTable({
  products,
  onEdit,
  onRefresh,
}: ProductTableProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await deleteProduct(id);
      onRefresh();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-admin-surface rounded-2xl border border-admin-border">
        <p className="text-admin-text-muted text-lg mb-2">No products yet</p>
        <p className="text-admin-text-muted/60 text-sm">
          Click &quot;Add Product&quot; to create your first listing.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-admin-surface rounded-2xl border border-admin-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-admin-border">
                <th className="text-left px-5 py-4 text-admin-text-muted font-medium text-xs uppercase tracking-wider">
                  Product
                </th>
                <th className="text-left px-5 py-4 text-admin-text-muted font-medium text-xs uppercase tracking-wider hidden sm:table-cell">
                  Category
                </th>
                <th className="text-left px-5 py-4 text-admin-text-muted font-medium text-xs uppercase tracking-wider">
                  Price
                </th>
                <th className="text-right px-5 py-4 text-admin-text-muted font-medium text-xs uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-admin-border/50 hover:bg-admin-surface-hover/50 transition-colors"
                >
                  {/* Product Info */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-admin-bg shrink-0 border border-admin-border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21,15 16,10 5,21'/%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-admin-text truncate max-w-[200px]">
                          {product.title}
                        </p>
                        <p className="text-admin-text-muted text-xs truncate max-w-[200px]">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-5 py-4">
                    <span className="font-semibold text-admin-text">
                      {formatPrice(product.price)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={product.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-admin-bg text-admin-text-muted hover:text-admin-text transition-colors"
                        title="View image"
                      >
                        <ExternalLink size={16} />
                      </a>
                      <button
                        onClick={() => onEdit(product)}
                        className="p-2 rounded-lg hover:bg-primary/10 text-admin-text-muted hover:text-primary transition-colors"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(product.id)}
                        disabled={deletingId === product.id}
                        className="p-2 rounded-lg hover:bg-danger/10 text-admin-text-muted hover:text-danger transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setConfirmDeleteId(null)}
          />
          <div className="relative w-full max-w-sm bg-admin-surface rounded-2xl border border-admin-border p-6 shadow-2xl animate-scale-in">
            <button
              onClick={() => setConfirmDeleteId(null)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-admin-surface-hover text-admin-text-muted"
            >
              <X size={16} />
            </button>
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-danger/10 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={24} className="text-danger" />
              </div>
              <h3 className="font-heading text-lg font-bold text-admin-text mb-2">
                Delete Product?
              </h3>
              <p className="text-admin-text-muted text-sm mb-6">
                This action cannot be undone. The product will be permanently
                removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="flex-1 py-2.5 rounded-xl border border-admin-border text-admin-text-muted hover:text-admin-text hover:bg-admin-surface-hover transition-all text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(confirmDeleteId)}
                  disabled={deletingId === confirmDeleteId}
                  className="flex-1 py-2.5 rounded-xl bg-danger hover:bg-danger-dark text-white font-semibold text-sm transition-all disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  {deletingId === confirmDeleteId ? (
                    "Deleting..."
                  ) : (
                    <>
                      <Trash2 size={14} />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
