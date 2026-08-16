import Link from "next/link";
import { Heart, Instagram, MessageCircle, Mail, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#15241E] text-white overflow-hidden border-t-2 border-[#C5A880]/40">
      {/* Decorative Top Border */}
      <div className="section-divider" />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 pattern-overlay opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="text-[#F4E2C7]" size={24} />
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">SZ Sparks</h3>
            </div>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-xs">
              Crafting beauty with every twist. Unique, handmade pipe cleaner creations that bring joy and color to your world.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/sz_sparks/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/15 hover:bg-[#8D493A] flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                aria-label="Instagram"
              >
                <Instagram size={20} className="text-white" />
              </a>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "923392280967"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-[#25D366]/30 hover:bg-[#25D366] flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} className="text-white" />
              </a>
              <a
                href="mailto:contact@szsparks.com"
                className="w-11 h-11 rounded-full bg-white/15 hover:bg-[#2D4B3E] flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                aria-label="Email"
              >
                <Mail size={20} className="text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg sm:text-xl font-bold text-[#F4E2C7]">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop All Products" },
                { href: "/about", label: "About Us & Story" },
                { href: "/contact", label: "Contact & Custom Orders" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/85 hover:text-[#F4E2C7] transition-colors duration-200 text-sm sm:text-base font-medium w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg sm:text-xl font-bold text-[#F4E2C7]">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm sm:text-base text-white/90">
              <p className="flex items-center gap-2.5">
                <MessageCircle size={16} className="text-[#25D366]" />
                +92 0339 2280967
              </p>
              <p className="flex items-center gap-2.5">
                <Instagram size={16} className="text-[#CF92A5]" />
                @sz_sparks
              </p>
              <p className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#E6C89C]" />
                contact@szsparks.com
              </p>
            </div>
            <div className="pt-2">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "923392280967"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1E8E50] text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg transition-all hover:scale-105"
              >
                <MessageCircle size={16} />
                Chat with Us on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/15 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/75 text-xs sm:text-sm text-center sm:text-left font-medium">
            © {new Date().getFullYear()} SZ Sparks. All rights reserved. Handcrafted with love in Pakistan.
          </p>
          <p className="text-white/75 text-xs sm:text-sm flex items-center gap-1.5 font-medium">
            Made with <Heart size={14} className="text-[#CF92A5] fill-[#CF92A5]" /> by SZ Sparks
          </p>
        </div>
      </div>
    </footer>
  );
}
