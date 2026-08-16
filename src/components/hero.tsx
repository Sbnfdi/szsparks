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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24">
      {/* ─── Base Atmospheric Background (Deep Botanical & Walnut) ─── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#182B23] via-[#22392F] to-[#1D2E26]" />

      {/* ─── Animated Organic Craft Blobs (Deep Subtle Ambient Glow) ─── */}
      <div
        className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-[#B87B8E]/20 blur-[100px] pointer-events-none"
        style={{ animation: "var(--animate-blob-1)" }}
      />
      <div
        className="absolute top-1/4 -right-24 w-[550px] h-[550px] rounded-full bg-[#8D493A]/25 blur-[110px] pointer-events-none"
        style={{ animation: "var(--animate-blob-2)" }}
      />
      <div
        className="absolute -bottom-24 left-1/4 w-[600px] h-[600px] rounded-full bg-[#2D4B3E]/40 blur-[120px] pointer-events-none"
        style={{ animation: "var(--animate-blob-3)" }}
      />

      {/* ─── Subtle Animated SVG Craft Spirals ─── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-15"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ribbonGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CF92A5" />
            <stop offset="50%" stopColor="#E6C89C" />
            <stop offset="100%" stopColor="#8D493A" />
          </linearGradient>
        </defs>
        <path
          d="M-100,200 Q300,50 600,350 T1300,200 T2000,400"
          fill="none"
          stroke="url(#ribbonGrad1)"
          strokeWidth="3"
          strokeDasharray="8 12"
        />
      </svg>

      {/* ─── Subtle Texture Overlay ─── */}
      <div className="absolute inset-0 pattern-overlay opacity-25 pointer-events-none" />

      {/* ─── Floating Artisanal Decorative Elements ─── */}
      <div
        className="absolute top-28 left-[6%] hidden sm:block pointer-events-none"
        style={{ animation: "var(--animate-float-slow)" }}
      >
        <div className="w-13 h-13 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
          <Flower2 size={24} className="text-[#F4C4D4]" />
        </div>
      </div>

      <div
        className="absolute top-36 right-[8%] hidden sm:block pointer-events-none"
        style={{ animation: "var(--animate-float-reverse)" }}
      >
        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
          <Sparkles size={20} className="text-[#F4E2C7]" />
        </div>
      </div>

      {/* ─── Main Hero Content ─── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Artisanal Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 mb-6 shadow-md cursor-default">
          <Sparkles size={16} className="text-[#F4E2C7]" />
          <span className="text-white font-medium text-xs sm:text-sm tracking-wide">
            Handcrafted Pipe Cleaner Artistry • Made in Pakistan
          </span>
        </div>

        {/* Hero Title with strong white contrast and warm gold/rose accents */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-[1.15] tracking-tight drop-shadow-md">
          Twisted with{" "}
          <span className="text-[#F4E2C7] underline decoration-[#8D493A]/60 decoration-wavy">
            Passion,
          </span>
          <br />
          Crafted with{" "}
          <span className="text-[#F5BACD]">
            Love.
          </span>
        </h1>

        {/* Subtitle with crystal clear high contrast */}
        <p className="text-base sm:text-xl text-white/90 max-w-2xl mx-auto mb-8 font-normal leading-relaxed drop-shadow-sm">
          Discover enchanting handmade pipe cleaner creations — from everlasting
          flower bouquets to whimsical figurines and bespoke custom gifts.
        </p>

        {/* Highlight Feature Badges with solid readable pill design */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {[
            { label: "🌸 Forever Blooms", bg: "bg-[#B87B8E]/30 text-white border-[#B87B8E]/50" },
            { label: "🧸 Cute Figurines", bg: "bg-[#8D493A]/35 text-white border-[#8D493A]/55" },
            { label: "🎁 Gift Bouquets", bg: "bg-[#7A947B]/30 text-white border-[#7A947B]/50" },
            { label: "✨ Custom Orders", bg: "bg-[#C5A880]/30 text-white border-[#C5A880]/50" },
          ].map((tag) => (
            <span
              key={tag.label}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-sm border ${tag.bg} shadow-xs`}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/shop"
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-[#241C18] hover:text-[#2D4B3E] rounded-full text-base font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
          >
            <Palette size={18} className="text-[#8D493A]" />
            Explore Creations
            <ArrowRight
              size={18}
              className="text-[#2D4B3E] group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <a
            href={`https://wa.me/${phone}?text=${encodeURIComponent("Hello SZ Sparks! I would like to inquire about your handmade pipe cleaner crafts.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#25D366] hover:bg-[#1E8E50] text-white rounded-full text-base font-bold shadow-lg shadow-[#25D366]/25 hover:scale-105 transition-all duration-200"
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

        {/* Live Brand Stats Cards with high contrast white text */}
        <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-3 sm:gap-6 max-w-xl mx-auto">
          {[
            { value: "100%", label: "Handcrafted", icon: <Scissors size={15} className="text-[#F4E2C7]" /> },
            { value: "500+", label: "Happy Smiles", icon: <Smile size={15} className="text-[#F5BACD]" /> },
            { value: "Custom", label: "Any Design", icon: <Heart size={15} className="text-[#E6C89C]" /> },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-3.5 sm:p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center shadow-md"
            >
              <div className="flex items-center justify-center gap-1.5 mb-1">
                {stat.icon}
                <p className="text-xl sm:text-2xl font-bold text-white font-heading">
                  {stat.value}
                </p>
              </div>
              <p className="text-[11px] sm:text-xs text-white font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Bottom Soft Linen Transition Fade ─── */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#FAF6F0] to-transparent pointer-events-none" />
    </section>
  );
}
