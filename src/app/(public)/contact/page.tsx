import {
  MessageCircle,
  Instagram,
  Mail,
  Clock,
  MapPin,
  Sparkles,
  Phone,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — SZ Sparks | Get in Touch",
  description:
    "Contact SZ Sparks for orders, custom requests, and inquiries. Reach us via WhatsApp, Instagram, or email.",
};

export default function ContactPage() {
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "923392280967";

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles size={14} />
            Contact Us
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-text-muted max-w-xl mx-auto">
            Have a question, want to place a custom order, or just want to say
            hi? We&apos;d love to hear from you!
          </p>
        </div>

        {/* Contact Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${whatsappPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-8 rounded-2xl bg-surface border border-border-light card-hover text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-whatsapp/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
              <MessageCircle size={28} className="text-whatsapp" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
              WhatsApp
            </h3>
            <p className="text-text-muted text-sm mb-3">
              Fastest way to reach us — chat, order, or ask questions
            </p>
            <p className="text-primary font-medium text-sm">
              +92 0339 2280967
            </p>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/sz_sparks/"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-8 rounded-2xl bg-surface border border-border-light card-hover text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
              <Instagram size={28} className="text-secondary" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
              Instagram
            </h3>
            <p className="text-text-muted text-sm mb-3">
              Follow us for latest creations, behind-the-scenes, and more
            </p>
            <p className="text-primary font-medium text-sm">@sz_sparks</p>
          </a>

          {/* Email */}
          <a
            href="mailto:contact@szsparks.com"
            className="group p-8 rounded-2xl bg-surface border border-border-light card-hover text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
              <Mail size={28} className="text-accent-dark" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
              Email
            </h3>
            <p className="text-text-muted text-sm mb-3">
              For business inquiries and collaborations
            </p>
            <p className="text-primary font-medium text-sm">
              contact@szsparks.com
            </p>
          </a>

          {/* Phone */}
          <a
            href="tel:+920339228096"
            className="group p-8 rounded-2xl bg-surface border border-border-light card-hover text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
              <Phone size={28} className="text-primary" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
              Phone
            </h3>
            <p className="text-text-muted text-sm mb-3">
              Give us a call for immediate assistance
            </p>
            <p className="text-primary font-medium text-sm">
              +92 0339 2280967
            </p>
          </a>
        </div>

        {/* Info Strips */}
        <div className="max-w-2xl mx-auto space-y-4 mb-16">
          <div className="flex items-center gap-4 p-5 rounded-xl bg-warm-cream border border-border-light">
            <Clock size={20} className="text-primary shrink-0" />
            <div>
              <p className="font-medium text-sm text-text-primary">
                Response Time
              </p>
              <p className="text-xs text-text-muted">
                We usually respond within 1–2 hours on WhatsApp
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 rounded-xl bg-warm-cream border border-border-light">
            <MapPin size={20} className="text-secondary shrink-0" />
            <div>
              <p className="font-medium text-sm text-text-primary">Location</p>
              <p className="text-xs text-text-muted">
                Based in Pakistan — shipping nationwide & internationally
              </p>
            </div>
          </div>
        </div>

        {/* Big WhatsApp CTA */}
        <div className="text-center">
          <div className="inline-block p-8 sm:p-12 rounded-3xl hero-gradient relative overflow-hidden">
            <div className="absolute inset-0 pattern-overlay" />
            <div className="relative z-10">
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
                Ready to Order?
              </h3>
              <p className="text-white/80 mb-6 max-w-md">
                Just drop us a message on WhatsApp and we&apos;ll take it from
                there!
              </p>
              <a
                href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent("Hello SZ Sparks! I'd like to place an order.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-dark rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <MessageCircle size={20} className="text-whatsapp" />
                Start Chatting
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
