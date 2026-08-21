"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Leaf, Sparkles, Heart, Eye, ShoppingBag, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "./data/products";
import QuickViewModal from "./components/QuickViewModal";
import { useCart } from "./context/CartContext";
import { useStore } from "./context/StoreContext";

export default function Home() {
  const { addToCart } = useCart();
  const { products, settings } = useStore();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col justify-center px-6 pt-6 pb-12 max-w-5xl mx-auto space-y-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[#6b705c]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6b705c]">
              Duja Slow Fashion 2026
            </span>
            <span className="w-6 h-[1px] bg-[#6b705c]" />
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#2a2c24] leading-[1.12]">
            Silence{" "}
            <span className="text-[#6b705c] italic font-normal">
              in Every Stitch
            </span>
          </h1>
        </motion.div>

        {/* Centered Hero Banner Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative w-full"
        >
          <motion.div
            whileHover={{ scale: 1.008 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className="w-full h-[340px] md:h-[450px] rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl bg-[#e8ebe0] relative group cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1200"
              alt="Minimalist Organic Linen Capsule"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700"
            />

            {/* Floating Glass Badges inside Banner */}
            <div className="absolute top-6 left-6 bg-white/85 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest text-[#2a2c24] uppercase border border-white/50 shadow-xs">
              {settings.heroBadgeText || "Editorial Capsule"}
            </div>

            <div className="absolute bottom-6 left-6 right-6 md:right-auto bg-white/85 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/50 flex items-center justify-between gap-6 shadow-xs">
              <span className="font-serif text-xs font-bold text-[#2a2c24]">
                100% Egyptian Flax Linen
              </span>
              <span className="text-[10px] font-bold text-[#6b705c] uppercase tracking-wider">
                Handcrafted
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6 max-w-md mx-auto pt-2"
        >
          <p className="text-[#3f4236]/80 text-xs md:text-sm leading-relaxed">
            Thoughtfully curated garments in natural earthy shades. Minimalist designs tailored to seamlessly match your lifestyle.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/collection"
              className="group bg-[#2a2c24] text-[#fcfbf9] px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-[#6b705c] transition duration-300 flex items-center gap-2 shadow-md"
            >
              Explore Collection
              <ArrowUpRight
                size={15}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition duration-300"
              />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-6xl mx-auto px-6 space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#e2ded5] pb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#6b705c]">
              Featured Staples
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#2a2c24]">
              The Essential Capsule
            </h2>
          </div>
          <Link
            href="/collection"
            className="text-xs font-bold uppercase tracking-wider text-[#6b705c] hover:text-[#2a2c24] flex items-center gap-1 transition"
          >
            View All Garments <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <motion.div
              whileHover={{ y: -4 }}
              key={product.id}
              className="group bg-white rounded-3xl border border-[#e2ded5] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-500"
            >
              <div className="relative h-80 bg-[#f6f7f3] overflow-hidden cursor-pointer">
                <Link href={`/collection/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </Link>

                <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="w-full bg-white/90 backdrop-blur-md text-[#2a2c24] py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white transition flex items-center justify-center gap-1.5 shadow-md cursor-pointer border border-white/50"
                  >
                    <Eye size={14} /> Quick View
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between text-left">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#6b705c] tracking-widest">
                    {product.category}
                  </span>
                  <Link href={`/collection/${product.id}`}>
                    <h3 className="font-serif font-bold text-sm text-[#2a2c24] hover:text-[#6b705c] transition mt-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="font-bold text-xs text-[#3f4236] mt-1">
                    {product.price} EGP
                  </p>
                </div>

                <button
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      size: "M",
                    })
                  }
                  className="w-full bg-[#2a2c24] text-[#f4f1de] py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#3f4236] transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag size={14} /> Add to Bag
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sustainable Craft Pillars */}
      <section className="bg-[#2a2c24] text-[#f4f1de] py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-10 text-center">
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ddb892]">
              Why Choose Duja
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
              Rooted in Nature, Designed to Endure.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-8 bg-[#3f4236]/60 rounded-3xl border border-[#3f4236] space-y-4">
              <Leaf className="text-[#ddb892]" size={28} />
              <h3 className="font-serif font-bold text-lg text-white">
                100% Organic Fibers
              </h3>
              <p className="text-xs text-[#ddb892]/80 leading-relaxed">
                Sourced exclusively from unbleached Egyptian flax and organic cotton, ensuring maximum skin comfort.
              </p>
            </div>

            <div className="p-8 bg-[#3f4236]/60 rounded-3xl border border-[#3f4236] space-y-4">
              <Heart className="text-[#ddb892]" size={28} />
              <h3 className="font-serif font-bold text-lg text-white">
                Zero Fast-Fashion
              </h3>
              <p className="text-xs text-[#ddb892]/80 leading-relaxed">
                Hand-sewn in limited small batches to eliminate leftover fabric waste and guarantee craftsman quality.
              </p>
            </div>

            <div className="p-8 bg-[#3f4236]/60 rounded-3xl border border-[#3f4236] space-y-4">
              <ShieldCheck className="text-[#ddb892]" size={28} />
              <h3 className="font-serif font-bold text-lg text-white">
                Ethical Production
              </h3>
              <p className="text-xs text-[#ddb892]/80 leading-relaxed">
                Fairly tailored in local Egyptian artisan studios with careful attention to every hem and button.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
