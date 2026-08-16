import Hero from "@/components/hero";
import ProductGrid from "@/components/product-grid";
import { getProducts } from "@/app/admin/actions";
import { ArrowRight, Sparkles, Palette, Heart } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(-8).reverse();

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-warm-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="text-primary" size={28} />,
                title: "Handcrafted with Care",
                description:
                  "Every piece is meticulously crafted by hand using premium pipe cleaners, ensuring unique quality in every creation.",
              },
              {
                icon: <Palette className="text-secondary" size={28} />,
                title: "Vibrant Designs",
                description:
                  "From delicate flowers to playful characters, our colorful designs bring life and joy to any space.",
              },
              {
                icon: <Heart className="text-accent-dark" size={28} />,
                title: "Made with Love",
                description:
                  "Each creation is infused with passion and dedication, making it a perfect gift for your loved ones.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="text-center p-8 rounded-2xl bg-surface border border-border-light card-hover"
              >
                <div className="w-14 h-14 rounded-2xl bg-warm-cream flex items-center justify-center mx-auto mb-5">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold text-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-warm-cream/50">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Sparkles size={14} />
                Our Collection
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-text-primary mb-4">
                Featured <span className="text-gradient">Creations</span>
              </h2>
              <p className="text-text-muted max-w-xl mx-auto">
                Explore our latest handmade pipe cleaner crafts — each one a
                unique work of art.
              </p>
            </div>

            {/* Products */}
            <ProductGrid products={featuredProducts} showFilter={false} />

            {/* View All Link */}
            <div className="text-center mt-12">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 px-8 py-3.5 btn-primary rounded-full text-base font-semibold"
              >
                View All Products
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-warm-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-12 sm:p-16 rounded-3xl overflow-hidden hero-gradient">
            <div className="absolute inset-0 pattern-overlay" />
            <div className="relative z-10">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
                Want Something Custom?
              </h2>
              <p className="text-white/80 mb-8 max-w-lg mx-auto">
                Have a special design in mind? We love bringing your ideas to
                life! Send us a message on WhatsApp and let&apos;s create
                something beautiful together.
              </p>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "923392280967"}?text=${encodeURIComponent("Hello SZ Sparks! I would like to place a custom order. Here's what I have in mind:")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-dark rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-whatsapp"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Request Custom Order
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
