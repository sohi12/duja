"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ShoppingBag, Eye, SlidersHorizontal, ArrowUpDown, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, Product } from "../data/products";
import { useCart } from "../context/CartContext";
import QuickViewModal from "../components/QuickViewModal";

export default function CollectionPage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSize, setSelectedSize] = useState<string>("All");
  const [selectedColor, setSelectedColor] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"featured" | "low-high" | "high-low">("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState<boolean>(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = ["All", "Blouses", "Tops", "Dresses", "Trousers", "Outerwear"];
  const sizes = ["All", "S", "M", "L", "XL"];
  const colors = ["All", "Sand", "Olive", "Terracotta", "Natural", "Charcoal"];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchCat =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchSize =
        selectedSize === "All" ||
        product.sizes.includes(selectedSize as any);
      const matchColor =
        selectedColor === "All" ||
        product.colors.includes(selectedColor as any);
      return matchCat && matchSize && matchColor;
    }).sort((a, b) => {
      if (sortBy === "low-high") return a.price - b.price;
      if (sortBy === "high-low") return b.price - a.price;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, selectedSize, selectedColor, sortBy]);

  const handleQuickAdd = (product: Product, size: "S" | "M" | "L" | "XL" = "M") => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedSize("All");
    setSelectedColor("All");
    setSortBy("featured");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-20 space-y-8">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-3 max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-3">
          <span className="w-6 h-[1px] bg-[#6b705c]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6b705c]">
            Ethical & Sustainable
          </span>
          <span className="w-6 h-[1px] bg-[#6b705c]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2a2c24]">
          The Organic Linen Capsule
        </h1>
        <p className="text-xs md:text-sm text-[#3f4236]/80 leading-relaxed">
          Explore timeless silhouettes woven from pure Egyptian flax and unbleached organic cotton. Designed for versatile daily luxury.
        </p>
      </motion.div>

      {/* Filter Toolbar (Top Bar for Quick Access & Mobile Toggle) */}
      <div className="bg-[#e2ded5]/40 backdrop-blur-md border border-[#e2ded5] p-4 rounded-2xl flex flex-wrap justify-between items-center gap-4">
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setIsFilterMobileOpen(!isFilterMobileOpen)}
          className="md:hidden flex items-center gap-2 bg-[#2a2c24] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
        >
          <SlidersHorizontal size={14} /> Filters
        </button>

        {/* Desktop Category Pills */}
        <div className="hidden md:flex items-center gap-2 overflow-x-auto py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#2a2c24] text-white shadow-xs"
                  : "bg-white/70 text-[#3f4236] hover:bg-white border border-[#e2ded5]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort & Reset */}
        <div className="flex items-center gap-3 ml-auto text-xs">
          <div className="flex items-center gap-2 bg-white/80 border border-[#e2ded5] px-3 py-1.5 rounded-xl">
            <ArrowUpDown size={14} className="text-[#6b705c]" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-transparent text-[#2a2c24] font-semibold outline-none cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          {(selectedCategory !== "All" ||
            selectedSize !== "All" ||
            selectedColor !== "All") && (
            <button
              onClick={clearFilters}
              className="text-[#6b705c] hover:text-[#2a2c24] text-xs font-semibold underline flex items-center gap-1 cursor-pointer"
            >
              <X size={13} /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Main Content Layout (Sidebar Filters + Responsive Grid) */}
      <div className="grid md:grid-cols-4 gap-8 items-start">
        {/* Filter Sidebar (Desktop & Mobile Drawer) */}
        <aside
          className={`space-y-6 md:block ${
            isFilterMobileOpen ? "block" : "hidden md:block"
          } bg-[#f7f5f0] md:bg-transparent p-5 md:p-0 rounded-2xl border md:border-none border-[#e2ded5]`}
        >
          {/* Category Filter (Mobile) */}
          <div className="md:hidden space-y-2">
            <h3 className="text-xs font-serif font-bold uppercase tracking-wider text-[#2a2c24]">
              Category
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs transition ${
                    selectedCategory === cat
                      ? "bg-[#2a2c24] text-white"
                      : "bg-[#e2ded5]/50 text-[#3f4236]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-serif font-bold uppercase tracking-wider text-[#2a2c24]">
              Size
            </h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                    selectedSize === sz
                      ? "bg-[#2a2c24] text-white shadow-xs"
                      : "bg-white border border-[#e2ded5] text-[#3f4236] hover:bg-[#e2ded5]/50"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div className="space-y-3 pt-4 border-t border-[#e2ded5]">
            <h3 className="text-xs font-serif font-bold uppercase tracking-wider text-[#2a2c24]">
              Color Palette
            </h3>
            <div className="space-y-1.5 text-xs">
              {colors.map((col) => (
                <button
                  key={col}
                  onClick={() => setSelectedColor(col)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl transition cursor-pointer text-left ${
                    selectedColor === col
                      ? "bg-[#2a2c24] text-white font-bold"
                      : "hover:bg-[#e2ded5]/40 text-[#3f4236]"
                  }`}
                >
                  <span>{col}</span>
                  {selectedColor === col && <Check size={14} />}
                </button>
              ))}
            </div>
          </div>

          {/* Sustainability Assurance Badge */}
          <div className="p-4 bg-[#e2ded5]/40 rounded-2xl border border-[#e2ded5] text-[11px] space-y-2 text-[#3f4236]">
            <span className="font-serif font-bold text-[#2a2c24] block">
              🌿 Duja Craft Commitment
            </span>
            <p className="text-[#3f4236]/80 leading-relaxed text-[10px]">
              Every garment is made to order or crafted in small limited batches to eliminate waste.
            </p>
          </div>
        </aside>

        {/* Product Grid (3 cols on desktop when sidebar active, total 4 cols layout) */}
        <div className="md:col-span-3 space-y-6">
          {/* Results count */}
          <div className="flex justify-between items-center text-xs text-[#6b705c]">
            <span>Showing {filteredProducts.length} sustainable items</span>
            {selectedCategory !== "All" && (
              <span className="font-bold text-[#2a2c24]">Category: {selectedCategory}</span>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white/60 p-12 rounded-3xl border border-[#e2ded5] text-center space-y-4">
              <h3 className="font-serif font-bold text-xl text-[#2a2c24]">
                No garments found
              </h3>
              <p className="text-xs text-[#3f4236]/70">
                Try clearing your active filters to see all available items.
              </p>
              <button
                onClick={clearFilters}
                className="bg-[#2a2c24] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#3f4236] transition cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4 }}
                    key={product.id}
                    className="group bg-white rounded-3xl border border-[#e2ded5] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-500 relative"
                  >
                    {/* Image Container with Hover Slow Zoom */}
                    <div className="relative h-80 bg-[#f6f7f3] overflow-hidden cursor-pointer">
                      <Link href={`/collection/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                        />
                      </Link>

                      {/* Floating Category Badge */}
                      <span className="absolute top-3 left-3 bg-white/85 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-[#2a2c24] uppercase border border-white/40 shadow-xs">
                        {product.category}
                      </span>

                      {/* Quick Action Overlay Bar on Hover */}
                      <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="flex-1 bg-white/90 backdrop-blur-md text-[#2a2c24] py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white transition flex items-center justify-center gap-1.5 shadow-md cursor-pointer border border-white/50"
                        >
                          <Eye size={14} /> Quick View
                        </button>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <Link href={`/collection/${product.id}`}>
                          <h3 className="font-serif font-bold text-sm text-[#2a2c24] group-hover:text-[#6b705c] transition line-clamp-1">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex justify-between items-center pt-0.5">
                          <p className="font-bold text-xs text-[#3f4236]">
                            {product.price} EGP
                          </p>
                          <div className="flex gap-1">
                            {product.sizes.map((s) => (
                              <span
                                key={s}
                                className="text-[9px] text-[#6b705c] font-semibold uppercase bg-[#f7f5f0] px-1.5 py-0.5 rounded-sm"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Minimalist Add to Cart Button */}
                      <button
                        onClick={() => handleQuickAdd(product)}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                          addedId === product.id
                            ? "bg-[#6b705c] text-white"
                            : "bg-[#2a2c24] text-[#f4f1de] hover:bg-[#3f4236]"
                        }`}
                      >
                        {addedId === product.id ? (
                          <>
                            <Check size={14} /> Added!
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={14} /> Add to Bag
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

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
