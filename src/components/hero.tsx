"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Heart,
  Flower2,
  Scissors,
  Smile,
  Palette,
} from "lucide-react";

export default function Hero() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "923392280967";

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28 bg-gradient-to-b from-[#FAF6F0] via-[#F4ECE0] to-[#FAF6F0]">
      {/* ─── Animated Organic Pastel Blobs (Light Ambient Mesh) ─── */}
      <div
        className="absolute -top-20 -left-20 w-[520px] h-[520px] rounded-full bg-[#E8C2CE]/40 blur-[110px] pointer-events-none"
        style={{ animation: "var(--animate-blob-1)" }}
      />
      <div
        className="absolute top-1/4 -right-20 w-[560px] h-[560px] rounded-full bg-[#EED5C2]/50 blur-[120px] pointer-events-none"
        style={{ animation: "var(--animate-blob-2)" }}
      />
      <div
        className="absolute -bottom-20 left-1/3 w-[580px] h-[580px] rounded-full bg-[#C2D6C5]/45 blur-[120px] pointer-events-none"
        style={{ animation: "var(--animate-blob-3)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-[#F7ECC8]/35 blur-[100px] pointer-events-none"
        style={{ animation: "var(--animate-pulse-soft)" }}
      />

      {/* ─── Delicate Animated SVG Craft Spirals ─── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lightRibbon1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B87B8E" />
            <stop offset="50%" stopColor="#8D493A" />
            <stop offset="100%" stopColor="#7A947B" />
          </linearGradient>
          <linearGradient id="lightRibbon2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7A947B" />
            <stop offset="100%" stopColor="#C5A880" />
          </linearGradient>
        </defs>
        <path
          d="M-100,180 Q300,40 600,320 T1300,180 T2000,380"
          fill="none"
          stroke="url(#lightRibbon1)"
          strokeWidth="3"
          strokeDasharray="8 12"
        />
        <path
          d="M-50,550 Q400,280 900,500 T1800,400"
          fill="none"
          stroke="url(#lightRibbon2)"
          strokeWidth="2.5"
          strokeDasharray="6 10"
          style={{ animation: "var(--animate-float-slow)" }}
        />
      </svg>

      {/* ─── Subtle Texture Overlay ─── */}
      <div className="absolute inset-0 pattern-overlay opacity-30 pointer-events-none" />

      {/* ─── Floating Artisanal Decorative Elements ─── */}
      <div
        className="absolute top-32 left-[8%] hidden sm:block pointer-events-none"
        style={{ animation: "var(--animate-float-slow)" }}
      >
        <div className="w-13 h-13 rounded-2xl bg-white/80 backdrop-blur-md border border-[#E2D6C6] flex items-center justify-center shadow-md">
          <Flower2 size={24} className="text-[#B87B8E]" />
        </div>
      </div>

      <div
        className="absolute top-40 right-[10%] hidden sm:block pointer-events-none"
        style={{ animation: "var(--animate-float-reverse)" }}
      >
        <div className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-md border border-[#E2D6C6] flex items-center justify-center shadow-md">
          <Sparkles size={20} className="text-[#8D493A]" />
        </div>
      </div>

      <div
        className="absolute bottom-28 left-[12%] hidden lg:block pointer-events-none"
        style={{ animation: "var(--animate-float-reverse)" }}
      >
        <div className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-md border border-[#E2D6C6] flex items-center justify-center shadow-md">
          <Scissors size={20} className="text-[#2D4B3E]" />
        </div>
      </div>

      <div
        className="absolute bottom-24 right-[12%] hidden lg:block pointer-events-none"
        style={{ animation: "var(--animate-float-slow)" }}
      >
        <div className="w-13 h-13 rounded-2xl bg-white/80 backdrop-blur-md border border-[#E2D6C6] flex items-center justify-center shadow-md">
          <Heart size={22} className="text-[#CF92A5]" />
        </div>
      </div>

      {/* ─── Main Hero Content ─── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Artisanal Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E2D6C6] mb-6 shadow-sm cursor-default">
          <Sparkles size={16} className="text-[#8D493A]" />
          <span className="text-[#2D4B3E] font-bold text-xs sm:text-sm tracking-wide">
            Handcrafted Pipe Cleaner Artistry • Made in Pakistan
          </span>
        </div>

        {/* Hero Title with light elegant colors */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold text-[#241C18] mb-6 leading-[1.14] tracking-tight">
          Twisted with{" "}
          <span className="text-[#8D493A] underline decoration-[#8D493A]/30 decoration-wavy">
            Passion,
          </span>
          <br />
          Crafted with{" "}
          <span className="text-[#2D4B3E]">
            Love.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-[#584A42] max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Discover enchanting handmade pipe cleaner creations — from everlasting
          flower bouquets to whimsical figurines and bespoke custom gifts.
        </p>

        {/* Highlight Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10">
          {[
            { label: "🌸 Forever Blooms", color: "bg-white/90 text-[#241C18] border-[#B87B8E]/60" },
            { label: "🧸 Cute Keychains", color: "bg-white/90 text-[#241C18] border-[#8D493A]/60" },
            { label: "💡 Floral Lamps", color: "bg-white/90 text-[#241C18] border-[#7A947B]/60" },
            { label: "✨ Custom Requests", color: "bg-white/90 text-[#241C18] border-[#C5A880]/60" },
          ].map((tag) => (
            <span
              key={tag.label}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold backdrop-blur-sm border ${tag.color} shadow-xs`}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/shop"
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#2D4B3E] hover:bg-[#3E6353] text-white rounded-full text-base font-bold shadow-lg shadow-[#2D4B3E]/20 hover:scale-105 transition-all duration-200"
          >
            <Palette size={18} className="text-[#E6C89C]" />
            Explore Creations
            <ArrowRight
              size={18}
              className="text-white group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <a
            href={`https://wa.me/${phone}?text=${encodeURIComponent("Hello SZ Sparks! I would like to inquire about your handmade pipe cleaner crafts.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#25D366] hover:bg-[#1E8E50] text-white rounded-full text-base font-bold shadow-lg shadow-[#25D366]/20 hover:scale-105 transition-all duration-200"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-white"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Order on WhatsApp
          </a>
        </div>

        {/* Live Brand Stats Cards */}
        <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-3 sm:gap-6 max-w-xl mx-auto">
          {[
            { value: "100%", label: "Handcrafted", icon: <Scissors size={15} className="text-[#8D493A]" /> },
            { value: "500+", label: "Happy Smiles", icon: <Smile size={15} className="text-[#B87B8E]" /> },
            { value: "Custom", label: "Any Design", icon: <Heart size={15} className="text-[#2D4B3E]" /> },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-3.5 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-[#E2D6C6] text-center shadow-sm"
            >
              <div className="flex items-center justify-center gap-1.5 mb-1">
                {stat.icon}
                <p className="text-xl sm:text-2xl font-bold text-[#241C18] font-heading">
                  {stat.value}
                </p>
              </div>
              <p className="text-[11px] sm:text-xs text-[#584A42] font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
