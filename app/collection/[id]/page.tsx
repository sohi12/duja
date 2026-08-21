"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { PRODUCTS, Product } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { useStore } from "../../context/StoreContext";

export default function BlouseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const { getProductById, products } = useStore();
  
  const product: Product = getProductById(id) || products.find((p) => p.id === id) || PRODUCTS[0];
  const [selectedSize, setSelectedSize] = useState<"S" | "M" | "L" | "XL">(
    product.sizes[0] || "M"
  );
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(product.image);

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      {/* Breadcrumb / Back link */}
      <div className="flex justify-between items-center text-xs">
        <Link
          href="/collection"
          className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-[#6b705c] hover:text-[#2a2c24] transition"
        >
          <ArrowLeft size={15} /> Back to Collection
        </Link>
        <span className="text-[#6b705c] uppercase text-[10px] tracking-widest">
          Capsule Item #{product.id}
        </span>
      </div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Left Image Gallery */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-[450px] bg-[#f6f7f3] rounded-3xl overflow-hidden border border-[#e2ded5] shadow-lg relative group"
          >
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <span className="absolute top-4 left-4 bg-white/85 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#2a2c24] border border-white/50">
              {product.category}
            </span>
          </motion.div>

          {/* Alternate Thumbnail Selector */}
          {product.hoverImage && (
            <div className="flex gap-3">
              <button
                onClick={() => setActiveImage(product.image)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                  activeImage === product.image
                    ? "border-[#2a2c24]"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </button>
              <button
                onClick={() => setActiveImage(product.hoverImage!)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                  activeImage === product.hoverImage
                    ? "border-[#2a2c24]"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={product.hoverImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          )}
        </div>

        {/* Right Info Section */}
        <div className="space-y-6 text-left">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#6b705c]">
              100% Sustainable Linen & Organic Cotton
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2a2c24] leading-tight">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-[#3f4236]">
              {product.price} EGP
            </p>
          </div>

          <p className="text-xs md:text-sm text-[#3f4236]/80 leading-relaxed">
            {product.description}
          </p>

          {/* Garment Key Details */}
          <div className="space-y-2 pt-2 border-t border-[#e2ded5]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2a2c24]">
              Garment Highlights:
            </span>
            <ul className="grid grid-cols-2 gap-2 text-xs text-[#6b705c]">
              {product.details.map((detail, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6b705c]" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          {/* Size Picker */}
          <div className="space-y-2 pt-3 border-t border-[#e2ded5]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#2a2c24] uppercase tracking-wider">
                Select Fit / Size:
              </span>
              <Link
                href="/size-guide"
                className="text-[11px] text-[#6b705c] font-semibold underline hover:text-[#2a2c24]"
              >
                Size Guide
              </Link>
            </div>

            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-11 h-11 rounded-xl text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                    selectedSize === size
                      ? "bg-[#2a2c24] text-white shadow-md"
                      : "bg-[#e2ded5]/40 text-[#3f4236] hover:bg-[#e2ded5]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAdd}
            className={`w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
              added
                ? "bg-[#6b705c] text-white"
                : "bg-[#2a2c24] text-[#f4f1de] hover:bg-[#3f4236]"
            }`}
          >
            {added ? <Check size={18} /> : <ShoppingBag size={18} />}
            {added ? "Added to Your Bag!" : `Add Size ${selectedSize} to Bag`}
          </button>

          {/* Value Badges */}
          <div className="grid grid-cols-3 gap-3 pt-4 text-[10px] text-[#3f4236]/80 text-center">
            <div className="p-3 bg-[#e2ded5]/30 rounded-2xl space-y-1">
              <Truck size={16} className="mx-auto text-[#6b705c]" />
              <span className="block font-semibold">Fast Delivery</span>
              <span className="text-[9px] text-[#6b705c]">2-4 Days in Egypt</span>
            </div>
            <div className="p-3 bg-[#e2ded5]/30 rounded-2xl space-y-1">
              <ShieldCheck size={16} className="mx-auto text-[#6b705c]" />
              <span className="block font-semibold">InstaPay / COD</span>
              <span className="text-[9px] text-[#6b705c]">Flexible Payment</span>
            </div>
            <div className="p-3 bg-[#e2ded5]/30 rounded-2xl space-y-1">
              <RefreshCw size={16} className="mx-auto text-[#6b705c]" />
              <span className="block font-semibold">14-Day Returns</span>
              <span className="text-[9px] text-[#6b705c]">Easy Exchange</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
