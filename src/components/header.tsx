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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 overflow-hidden rounded-full border-2 border-accent/30 group-hover:border-accent transition-colors duration-300">
              <Image
                src="/logo.png"
                alt="SZ Sparks"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-heading text-xl font-bold text-primary-dark tracking-tight">
                SZ Sparks
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium">
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
                className="relative px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-3/4 transition-all duration-300 rounded-full" />
              </Link>
            ))}
            <Link
              href="/shop"
              className="ml-4 inline-flex items-center gap-2 px-5 py-2.5 btn-primary rounded-full text-sm font-semibold"
            >
              <ShoppingBag size={16} />
              Shop Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-warm-cream transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Nav */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="glass rounded-2xl p-4 space-y-1 shadow-xl">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:text-primary hover:bg-warm-cream transition-all duration-300 font-medium"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <Sparkles size={14} className="text-accent" />
                {link.label}
              </Link>
            ))}
            <Link
              href="/shop"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 mt-2 px-4 py-3 btn-primary rounded-xl text-sm font-semibold"
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
