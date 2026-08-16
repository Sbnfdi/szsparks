"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";
import { Lock, Sparkles, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-admin-bg p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pattern-overlay opacity-5" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
            <Sparkles size={28} className="text-white" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-white mb-2">
            Admin Panel
          </h1>
          <p className="text-admin-text-muted text-sm">
            Sign in to manage SZ Sparks products
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-admin-surface rounded-2xl border border-admin-border p-8 shadow-xl">
          <form action={formAction} className="space-y-5">
            {/* Error Message */}
            {state?.error && (
              <div className="p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm text-center animate-scale-in">
                {state.error}
              </div>
            )}

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-admin-text mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-admin-text-muted"
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter admin password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-admin-bg border border-admin-border text-admin-text placeholder:text-admin-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-admin-text-muted hover:text-admin-text transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={pending}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold text-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {pending ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-admin-text-muted/50 text-xs mt-6">
          © {new Date().getFullYear()} SZ Sparks Admin
        </p>
      </div>
    </div>
  );
}
