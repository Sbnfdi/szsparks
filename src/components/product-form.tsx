"use client";

import { useActionState, useState, useEffect, useRef } from "react";
import { createProduct, updateProduct } from "@/app/admin/actions";
import { CATEGORIES } from "@/lib/utils";
import {
  X,
  UploadCloud,
  Link as LinkIcon,
  ImageIcon,
  Loader2,
  Trash2,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
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

  // Image upload mode: "upload" (file) or "url" (link)
  const [imageMode, setImageMode] = useState<"upload" | "url">("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState<string>(product?.imageUrl || "");
  const [urlPreview, setUrlPreview] = useState<string>(product?.imageUrl || "");
  const [isDragging, setIsDragging] = useState(false);
  const [clientError, setClientError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Filter out "All" from categories for the form dropdown
  const formCategories = CATEGORIES.filter((c) => c !== "All");

  // Keep track of current preview URL (file preview, url preview, or existing product image)
  const currentPreview =
    imageMode === "upload"
      ? filePreview || (product?.imageUrl && !selectedFile ? product.imageUrl : "")
      : urlPreview;

  // Handle file selection
  const handleFile = (file: File) => {
    setClientError(null);
    if (!file.type.startsWith("image/")) {
      setClientError("Please select a valid image file (JPEG, PNG, WebP, etc.)");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setClientError("Image size must be less than 10MB");
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setFilePreview(objectUrl);
  };

  // Cleanup object URL on unmount or new file
  useEffect(() => {
    return () => {
      if (filePreview && filePreview.startsWith("blob:")) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
      if (fileInputRef.current) {
        fileInputRef.current.files = e.dataTransfer.files;
      }
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    if (filePreview && filePreview.startsWith("blob:")) {
      URL.revokeObjectURL(filePreview);
    }
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
        <div className="flex items-center justify-between p-6 border-b border-admin-border sticky top-0 bg-admin-surface/95 backdrop-blur z-10">
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
        <form
          ref={formRef}
          action={formAction}
          encType="multipart/form-data"
          className="p-6 space-y-5"
        >
          {/* Hidden ID for editing */}
          {isEditing && <input type="hidden" name="id" value={product.id} />}

          {/* Hidden existing image URL to preserve previous image if not changing */}
          {isEditing && (
            <input
              type="hidden"
              name="existingImageUrl"
              value={product.imageUrl || ""}
            />
          )}

          {/* Error messages */}
          {(state?.error || clientError) && (
            <div className="p-3.5 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm flex items-start gap-2.5 animate-scale-in">
              <span className="shrink-0 font-bold mt-0.5">⚠️</span>
              <span>{state?.error || clientError}</span>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1.5">
              Product Title <span className="text-primary">*</span>
            </label>
            <input
              name="title"
              type="text"
              required
              defaultValue={product?.title || ""}
              placeholder="e.g., Blue Lotus Lamp"
              className="w-full px-4 py-2.5 rounded-xl bg-admin-bg border border-admin-border text-admin-text placeholder:text-admin-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1.5">
              Description <span className="text-primary">*</span>
            </label>
            <textarea
              name="description"
              required
              rows={3}
              defaultValue={product?.description || ""}
              placeholder="Handmade crochet flowers in an ambient LED glass lamp..."
              className="w-full px-4 py-2.5 rounded-xl bg-admin-bg border border-admin-border text-admin-text placeholder:text-admin-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none transition-all"
            />
          </div>

          {/* Price & Category Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-admin-text mb-1.5">
                Price (PKR) <span className="text-primary">*</span>
              </label>
              <input
                name="price"
                type="number"
                required
                min="1"
                defaultValue={product?.price || ""}
                placeholder="e.g., 2500"
                className="w-full px-4 py-2.5 rounded-xl bg-admin-bg border border-admin-border text-admin-text placeholder:text-admin-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-admin-text mb-1.5">
                Category <span className="text-primary">*</span>
              </label>
              <select
                name="category"
                required
                defaultValue={product?.category || ""}
                className="w-full px-4 py-2.5 rounded-xl bg-admin-bg border border-admin-border text-admin-text focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all"
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

          {/* Image Section */}
          <div className="pt-1">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-admin-text">
                Product Image <span className="text-primary">*</span>
              </label>

              {/* Mode Switcher Tabs */}
              <div className="flex items-center bg-admin-bg rounded-lg p-0.5 border border-admin-border text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setImageMode("upload")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                    imageMode === "upload"
                      ? "bg-primary text-white shadow-sm"
                      : "text-admin-text-muted hover:text-admin-text"
                  }`}
                >
                  <UploadCloud size={13} />
                  <span>Upload File</span>
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode("url")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                    imageMode === "url"
                      ? "bg-primary text-white shadow-sm"
                      : "text-admin-text-muted hover:text-admin-text"
                  }`}
                >
                  <LinkIcon size={13} />
                  <span>Image Link</span>
                </button>
              </div>
            </div>

            {/* Mode 1: File Upload */}
            {imageMode === "upload" && (
              <div className="space-y-3">
                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFile(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />

                {/* Upload Zone / Active Preview */}
                {currentPreview ? (
                  <div className="relative rounded-xl border border-admin-border bg-admin-bg overflow-hidden p-3 flex items-center gap-4 group">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-admin-surface border border-admin-border/80 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={currentPreview}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21,15 16,10 5,21'/%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mb-1">
                        <CheckCircle2 size={14} />
                        <span>
                          {selectedFile
                            ? "New file selected"
                            : isEditing
                            ? "Current product image"
                            : "Image ready"}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-admin-text truncate">
                        {selectedFile
                          ? selectedFile.name
                          : isEditing
                          ? product?.title || "Existing image"
                          : "Selected image"}
                      </p>
                      {selectedFile && (
                        <p className="text-xs text-admin-text-muted mt-0.5">
                          {(selectedFile.size / 1024).toFixed(1)} KB
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 rounded-lg bg-admin-surface hover:bg-admin-surface-hover text-admin-text-muted hover:text-primary transition-colors border border-admin-border"
                        title="Choose another image"
                      >
                        <RefreshCw size={15} />
                      </button>
                      {selectedFile && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="p-2 rounded-lg bg-danger/10 hover:bg-danger/20 text-danger transition-colors border border-danger/20"
                          title="Remove selected file"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                      isDragging
                        ? "border-primary bg-primary/10"
                        : "border-admin-border hover:border-primary/60 bg-admin-bg/50 hover:bg-admin-bg"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-admin-surface border border-admin-border flex items-center justify-center mx-auto mb-3 text-primary">
                      <UploadCloud size={24} />
                    </div>
                    <p className="text-sm font-semibold text-admin-text mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-admin-text-muted">
                      PNG, JPG, JPEG, or WebP (max 10MB)
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Mode 2: Direct Image URL / Path */}
            {imageMode === "url" && (
              <div className="space-y-3">
                <input
                  name="imageUrl"
                  type="text"
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    setUrlPreview(e.target.value);
                  }}
                  placeholder="https://images.unsplash.com/... or /products/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-admin-bg border border-admin-border text-admin-text placeholder:text-admin-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all"
                />

                {urlPreview && (
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-admin-bg border border-admin-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={urlPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21,15 16,10 5,21'/%3E%3C/svg%3E";
                      }}
                    />
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur text-[11px] text-admin-text-muted flex items-center gap-1.5">
                      <ImageIcon size={12} />
                      <span>URL Preview</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-3 border-t border-admin-border">
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
