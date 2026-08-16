"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, Sparkles } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF6F0]/95 backdrop-blur-md shadow-md py-2.5 border-b border-[#E2D6C6]"
          : "bg-[#FAF6F0]/90 backdrop-blur-sm py-3.5 border-b border-[#E2D6C6]/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="relative w-11 h-11 sm:w-13 sm:h-13 overflow-hidden rounded-full border-2 border-[#8D493A]/40 group-hover:border-[#8D493A] transition-colors duration-300 shadow-sm">
              <Image
                src="/logo.png"
                alt="SZ Sparks"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg sm:text-xl font-bold text-[#241C18] tracking-tight group-hover:text-[#2D4B3E] transition-colors">
                SZ Sparks
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#8A7B73] font-semibold">
                Handmade Creations
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-semibold text-[#584A42] hover:text-[#2D4B3E] transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#8D493A] group-hover:w-3/4 transition-all duration-300 rounded-full" />
              </Link>
            ))}
            <Link
              href="/shop"
              className="ml-3 inline-flex items-center gap-2 px-5 py-2.5 bg-[#2D4B3E] hover:bg-[#3E6353] text-white rounded-full text-sm font-semibold shadow-md shadow-[#2D4B3E]/20 transition-all hover:scale-105"
            >
              <ShoppingBag size={15} />
              Shop Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-white/80 border border-[#E2D6C6] text-[#241C18] hover:bg-[#F3ECE0] transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile Nav */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100 mt-3 pb-2" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white rounded-2xl p-4 space-y-1.5 shadow-xl border border-[#E2D6C6]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#241C18] hover:text-[#2D4B3E] hover:bg-[#F3ECE0] font-semibold text-sm transition-all"
              >
                <Sparkles size={14} className="text-[#8D493A]" />
                {link.label}
              </Link>
            ))}
            <Link
              href="/shop"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 mt-2 px-4 py-3 bg-[#2D4B3E] text-white rounded-xl text-sm font-semibold shadow-md"
            >
              <ShoppingBag size={16} />
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
