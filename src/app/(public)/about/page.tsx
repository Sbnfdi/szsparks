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
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles size={14} />
            Our Story
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            About <span className="text-gradient">SZ Sparks</span>
          </h1>
          <p className="text-text-muted max-w-xl mx-auto">
            Where creativity meets craftsmanship — one pipe cleaner at a time.
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative p-8 sm:p-12 bg-surface rounded-3xl border border-border-light shadow-sm">
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent/10 to-transparent rounded-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/5 to-transparent rounded-3xl" />

            <div className="relative space-y-6 text-text-secondary leading-relaxed">
              <p className="text-lg">
                <span className="font-heading text-4xl text-primary float-left mr-3 mt-1 leading-none">
                  S
                </span>
                Z Sparks was born from a simple love for creating beautiful things with
                humble materials. What started as a hobby — twisting colorful pipe cleaners
                into delicate flowers and quirky characters — quickly blossomed into a
                passion for handmade artistry.
              </p>
              <p>
                Based in Pakistan, we believe that the most meaningful gifts and decorations
                are those made by hand, with care, attention to detail, and a whole lot of
                love. Every pipe cleaner creation from SZ Sparks is a tiny sculpture —
                vibrant, unique, and crafted to bring a smile to your face.
              </p>
              <p>
                From intricate flower bouquets that never wilt, to adorable animal
                figurines and fun characters that make perfect desk companions — our
                creations are designed to add warmth and color to your world.
              </p>
              <p className="font-medium text-text-primary">
                We don&apos;t just make crafts. We create little sparks of joy.
                ✨
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="font-heading text-3xl font-bold text-center text-text-primary mb-12">
            What Sets Us <span className="text-gradient">Apart</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Scissors className="text-primary" size={24} />,
                title: "100% Handmade",
                description:
                  "Every single piece is crafted entirely by hand — no machines, no shortcuts, just pure skill.",
              },
              {
                icon: <Star className="text-secondary" size={24} />,
                title: "Premium Quality",
                description:
                  "We use only the best pipe cleaners and materials for vibrant colors that last.",
              },
              {
                icon: <Heart className="text-accent-dark" size={24} />,
                title: "Made with Love",
                description:
                  "Each creation carries the warmth and passion of its maker. That's the SZ Sparks difference.",
              },
              {
                icon: <Award className="text-primary-light" size={24} />,
                title: "Unique Designs",
                description:
                  "No two pieces are exactly alike. Your creation is as unique as you are.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="p-6 rounded-2xl bg-surface border border-border-light card-hover text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-warm-cream flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="font-heading text-base font-semibold text-text-primary mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-block p-8 sm:p-12 rounded-3xl bg-warm-cream border border-border-light">
            <h3 className="font-heading text-2xl font-bold text-text-primary mb-3">
              Ready to explore?
            </h3>
            <p className="text-text-muted mb-6 max-w-md">
              Browse our collection and find the perfect handmade creation for
              yourself or someone special.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 btn-primary rounded-full text-base font-semibold"
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
