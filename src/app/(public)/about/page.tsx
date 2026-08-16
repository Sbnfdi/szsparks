import { Sparkles, Heart, Star, Scissors, Award } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — SZ Sparks | Our Story",
  description:
    "Learn about SZ Sparks — a Pakistani brand creating beautiful handmade pipe cleaner crafts. Discover our passion for artistry and handmade creations.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-[#FAF6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2D4B3E]/10 text-[#2D4B3E] text-xs sm:text-sm font-bold mb-3">
            <Sparkles size={14} className="text-[#8D493A]" />
            Our Story
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-[#241C18] mb-4">
            About <span className="text-[#8D493A]">SZ Sparks</span>
          </h1>
          <p className="text-[#584A42] max-w-xl mx-auto text-base sm:text-lg">
            Where imagination meets craftsmanship — one handcrafted stem at a time.
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative p-8 sm:p-12 bg-white rounded-3xl border border-[#E2D6C6] shadow-sm">
            <div className="relative space-y-6 text-[#584A42] text-base sm:text-lg leading-relaxed">
              <p>
                <span className="font-heading text-5xl text-[#2D4B3E] float-left mr-3 mt-1 leading-none font-bold">
                  S
                </span>
                Z Sparks was born from a genuine love for turning humble craft materials into captivating art. What started as a creative hobby — hand-twisting soft pipe cleaners into delicate flower petals and playful characters — quickly blossomed into a dedicated handmade brand.
              </p>
              <p>
                Based in Pakistan, we believe that the most treasured gifts are those made by human hands with care, precision, and passion. Every single pipe cleaner creation from SZ Sparks is an individual piece of sculpture — vibrant, unique, and crafted to bring joy.
              </p>
              <p>
                From intricate flower bouquets that stay in bloom forever, to desk companion figurines and personalized festive gifts — our creations bring warmth and color to everyday spaces.
              </p>
              <p className="font-bold text-[#241C18] text-lg sm:text-xl pt-2">
                We don&apos;t just make crafts. We spark joy through handmade art. ✨
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center text-[#241C18] mb-12">
            What Sets Us <span className="text-[#8D493A]">Apart</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Scissors className="text-[#2D4B3E]" size={24} />,
                title: "100% Handmade",
                description:
                  "Every piece is crafted entirely by hand — no shortcuts, just authentic artisan dedication.",
              },
              {
                icon: <Star className="text-[#8D493A]" size={24} />,
                title: "Premium Materials",
                description:
                  "We use high-density, velvety soft chenille pipe cleaners for vivid colors that last indefinitely.",
              },
              {
                icon: <Heart className="text-[#B87B8E]" size={24} />,
                title: "Made with Love",
                description:
                  "Each creation carries the warmth and affection of handmade artistry. Perfect for gifting.",
              },
              {
                icon: <Award className="text-[#C5A880]" size={24} />,
                title: "Unique Pieces",
                description:
                  "Because each creation is handcrafted, every item is wonderfully unique and special.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="p-7 rounded-3xl bg-white border border-[#E2D6C6] text-center shadow-sm hover:shadow-md hover:border-[#8D493A]/40 transition-all duration-300"
              >
                <div className="w-13 h-13 rounded-2xl bg-[#F3ECE0] flex items-center justify-center mx-auto mb-4 border border-[#E2D6C6]">
                  {value.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-[#241C18] mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-[#584A42] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-block p-10 sm:p-14 rounded-3xl bg-[#F3ECE0] border border-[#E2D6C6] max-w-lg shadow-sm">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#241C18] mb-3">
              Ready to explore?
            </h3>
            <p className="text-[#584A42] mb-6 text-base">
              Browse our collection and find the perfect handmade piece for yourself or your loved ones.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#2D4B3E] hover:bg-[#3E6353] text-white rounded-full text-base font-bold shadow-lg shadow-[#2D4B3E]/20 transition-all hover:scale-105"
            >
              <Sparkles size={16} />
              Visit Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
