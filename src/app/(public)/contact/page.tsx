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
    <div className="pt-32 pb-24 bg-[#FAF6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2D4B3E]/10 text-[#2D4B3E] text-xs sm:text-sm font-bold mb-3">
            <Sparkles size={14} className="text-[#8D493A]" />
            Direct Communication
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-[#241C18] mb-4">
            Get in <span className="text-[#8D493A]">Touch</span>
          </h1>
          <p className="text-[#584A42] max-w-xl mx-auto text-base sm:text-lg">
            Have a question, custom request, or special inquiry? We would love to assist you!
          </p>
        </div>

        {/* Contact Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${whatsappPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-8 rounded-3xl bg-white border border-[#E2D6C6] text-center shadow-sm hover:shadow-xl hover:border-[#25D366] transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#25D366]/15 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
              <MessageCircle size={30} className="text-[#25D366]" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#241C18] mb-2">
              WhatsApp
            </h3>
            <p className="text-[#584A42] text-sm mb-3">
              Instant responses — chat directly, discuss custom colors, and place orders
            </p>
            <p className="text-[#2D4B3E] font-bold text-base">
              +92 0339 2280967
            </p>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/sz_sparks/"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-8 rounded-3xl bg-white border border-[#E2D6C6] text-center shadow-sm hover:shadow-xl hover:border-[#B87B8E] transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#B87B8E]/15 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
              <Instagram size={30} className="text-[#8D493A]" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#241C18] mb-2">
              Instagram
            </h3>
            <p className="text-[#584A42] text-sm mb-3">
              Follow our latest creations, behind-the-scenes making, and customer reels
            </p>
            <p className="text-[#8D493A] font-bold text-base">@sz_sparks</p>
          </a>

          {/* Email */}
          <a
            href="mailto:contact@szsparks.com"
            className="group p-8 rounded-3xl bg-white border border-[#E2D6C6] text-center shadow-sm hover:shadow-xl hover:border-[#8D493A] transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#8D493A]/15 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
              <Mail size={30} className="text-[#8D493A]" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#241C18] mb-2">
              Email
            </h3>
            <p className="text-[#584A42] text-sm mb-3">
              For collaborations, bulk wedding favors, and general inquiries
            </p>
            <p className="text-[#2D4B3E] font-bold text-base">
              contact@szsparks.com
            </p>
          </a>

          {/* Phone */}
          <a
            href="tel:+920339228096"
            className="group p-8 rounded-3xl bg-white border border-[#E2D6C6] text-center shadow-sm hover:shadow-xl hover:border-[#2D4B3E] transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#2D4B3E]/15 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
              <Phone size={30} className="text-[#2D4B3E]" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#241C18] mb-2">
              Phone Call
            </h3>
            <p className="text-[#584A42] text-sm mb-3">
              Direct assistance during standard operating hours
            </p>
            <p className="text-[#2D4B3E] font-bold text-base">
              +92 0339 2280967
            </p>
          </a>
        </div>

        {/* Info Badges */}
        <div className="max-w-2xl mx-auto space-y-4 mb-16">
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-[#E2D6C6] shadow-sm">
            <Clock size={22} className="text-[#2D4B3E] shrink-0" />
            <div>
              <p className="font-bold text-sm sm:text-base text-[#241C18]">
                Fast WhatsApp Support
              </p>
              <p className="text-xs sm:text-sm text-[#584A42]">
                We usually reply within 1–2 hours on WhatsApp
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-[#E2D6C6] shadow-sm">
            <MapPin size={22} className="text-[#8D493A] shrink-0" />
            <div>
              <p className="font-bold text-sm sm:text-base text-[#241C18]">
                Origin & Delivery
              </p>
              <p className="text-xs sm:text-sm text-[#584A42]">
                Proudly based in Pakistan — shipping nationwide with protective gift packaging
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp Banner */}
        <div className="text-center">
          <div className="inline-block p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-[#182B23] via-[#22392F] to-[#402B24] border border-[#C5A880]/30 shadow-2xl text-white">
            <h3 className="font-heading text-2xl sm:text-4xl font-bold text-white mb-3">
              Ready to Order or Inquire?
            </h3>
            <p className="text-white/90 mb-7 max-w-md mx-auto text-base">
              Send us a direct message on WhatsApp and we will start working on your creation!
            </p>
            <a
              href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent("Hello SZ Sparks! I would like to place an order.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-9 py-4 bg-[#25D366] hover:bg-[#1E8E50] text-white rounded-full text-base font-bold shadow-xl hover:scale-105 transition-all duration-200"
            >
              <MessageCircle size={20} className="text-white" />
              Chat on WhatsApp Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
