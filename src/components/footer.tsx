import Link from "next/link";
import { Heart, Instagram, MessageCircle, Mail, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-primary-dark text-white overflow-hidden">
      {/* Decorative Top Border */}
      <div className="section-divider" />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 pattern-overlay opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="text-accent" size={24} />
              <h3 className="font-heading text-2xl font-bold">SZ Sparks</h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Crafting beauty with every twist. Unique, handmade pipe cleaner
              creations that bring joy and color to your world.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://www.instagram.com/sz_sparks/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent/30 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "923392280967"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-whatsapp/30 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="mailto:contact@szsparks.com"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-secondary/30 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold text-accent">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/70 hover:text-accent transition-colors duration-300 text-sm w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold text-accent">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm text-white/70">
              <p className="flex items-center gap-2">
                <MessageCircle size={14} className="text-whatsapp" />
                +92 0339 2280967
              </p>
              <p className="flex items-center gap-2">
                <Instagram size={14} className="text-secondary" />
                @sz_sparks
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-accent" />
                contact@szsparks.com
              </p>
            </div>
            <div className="pt-2">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "923392280967"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-whatsapp px-5 py-2.5 rounded-full text-sm font-semibold"
              >
                <MessageCircle size={16} />
                Chat with Us
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} SZ Sparks. All rights reserved. Handcrafted with love in Pakistan.
          </p>
          <p className="text-white/50 text-xs flex items-center gap-1">
            Made with <Heart size={12} className="text-secondary fill-secondary" /> by SZ Sparks
          </p>
        </div>
      </div>
    </footer>
  );
}
