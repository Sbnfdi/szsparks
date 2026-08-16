"use client";

import { useActionState, useState, useEffect, useRef } from "react";
import { createProduct, updateProduct } from "@/app/admin/actions";
import { CATEGORIES } from "@/lib/utils";
import { X, ImageIcon, Loader2 } from "lucide-react";
import type { Product } from "@/db/schema";

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ProductForm({
  product,
  onClose,
  onSuccess,
}: ProductFormProps) {
  const isEditing = !!product;
  const action = isEditing ? updateProduct : createProduct;
  const [state, formAction, pending] = useActionState(action, null);
  const [imagePreview, setImagePreview] = useState(product?.imageUrl || "");
  const formRef = useRef<HTMLFormElement>(null);

  // Filter out "All" from categories for the form dropdown
  const formCategories = CATEGORIES.filter((c) => c !== "All");

  useEffect(() => {
    if (state?.success) {
      onSuccess();
    }
  }, [state?.success, onSuccess]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-admin-surface rounded-2xl border border-admin-border shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-admin-border">
          <h2 className="font-heading text-xl font-bold text-admin-text">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-admin-surface-hover text-admin-text-muted hover:text-admin-text transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form ref={formRef} action={formAction} className="p-6 space-y-5">
          {/* Hidden ID for editing */}
          {isEditing && (
            <input type="hidden" name="id" value={product.id} />
          )}

          {/* Error */}
          {state?.error && (
            <div className="p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm animate-scale-in">
              {state.error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1.5">
              Product Title
            </label>
            <input
              name="title"
              type="text"
              required
              defaultValue={product?.title || ""}
              placeholder="e.g., Rose Bouquet"
              className="w-full px-4 py-2.5 rounded-xl bg-admin-bg border border-admin-border text-admin-text placeholder:text-admin-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              required
              rows={3}
              defaultValue={product?.description || ""}
              placeholder="Describe the product..."
              className="w-full px-4 py-2.5 rounded-xl bg-admin-bg border border-admin-border text-admin-text placeholder:text-admin-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none"
            />
          </div>

          {/* Price & Category Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-admin-text mb-1.5">
                Price (PKR)
              </label>
              <input
                name="price"
                type="number"
                required
                min="1"
                defaultValue={product?.price || ""}
                placeholder="e.g., 500"
                className="w-full px-4 py-2.5 rounded-xl bg-admin-bg border border-admin-border text-admin-text placeholder:text-admin-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-admin-text mb-1.5">
                Category
              </label>
              <select
                name="category"
                required
                defaultValue={product?.category || ""}
                className="w-full px-4 py-2.5 rounded-xl bg-admin-bg border border-admin-border text-admin-text focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              >
                <option value="">Select category</option>
                {formCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1.5">
              Image URL
            </label>
            <input
              name="imageUrl"
              type="url"
              required
              defaultValue={product?.imageUrl || ""}
              placeholder="https://i.imgur.com/..."
              onChange={(e) => setImagePreview(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-admin-bg border border-admin-border text-admin-text placeholder:text-admin-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="relative aspect-video rounded-xl overflow-hidden bg-admin-bg border border-admin-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-admin-bg/50 opacity-0 hover:opacity-100 transition-opacity">
                <ImageIcon size={24} className="text-admin-text-muted" />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-admin-border text-admin-text-muted hover:text-admin-text hover:bg-admin-surface-hover transition-all text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold text-sm hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {pending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : isEditing ? (
                "Update Product"
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
