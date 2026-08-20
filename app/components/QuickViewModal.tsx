"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { X, ShoppingBag, Check, ShieldCheck, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../data/products";

type ModalProps = {
  product: Product | null;
  onClose: () => void;
};

export default function QuickViewModal({ product, onClose }: ModalProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<"S" | "M" | "L" | "XL">("M");
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#2a2c24]/60 backdrop-blur-sm cursor-pointer"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative bg-[#fcfbf9] border border-[#e2ded5] w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl z-10 grid md:grid-cols-2"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-white text-[#3f4236] cursor-pointer transition border border-[#e2ded5]"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Product Image */}
          <div className="h-72 md:h-full bg-[#f6f7f3] relative overflow-hidden group">
            <img
              src={product.hoverImage || product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute top-4 left-4 bg-[#2a2c24]/80 backdrop-blur-md text-[#f4f1de] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
              {product.category}
            </div>
          </div>

          {/* Product Details */}
          <div className="p-6 md:p-8 space-y-5 flex flex-col justify-between text-left">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#6b705c]">
                <span>100% Organic</span>
                <span>•</span>
                <span>In Stock</span>
              </div>
              
              <h2 className="text-2xl font-serif font-bold text-[#2a2c24] leading-tight">
                {product.name}
              </h2>
              
              <p className="text-xl font-bold text-[#3f4236]">
                {product.price} EGP
              </p>

              <p className="text-xs text-[#3f4236]/80 leading-relaxed pt-1">
                {product.description}
              </p>

              {/* Bullet Details */}
              <ul className="grid grid-cols-2 gap-1.5 pt-2 text-[11px] text-[#6b705c]">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6b705c]" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Picker */}
            <div className="space-y-2 pt-2 border-t border-[#e2ded5]">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#2a2c24]">Select Size:</span>
                <span className="text-[10px] text-[#6b705c] font-semibold underline cursor-pointer">
                  Size Guide
                </span>
              </div>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center ${
                      selectedSize === size
                        ? "bg-[#2a2c24] text-white shadow-sm"
                        : "bg-[#e2ded5]/40 text-[#3f4236] hover:bg-[#e2ded5]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Bag Button */}
            <button
              onClick={handleAdd}
              className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                added
                  ? "bg-[#6b705c] text-white"
                  : "bg-[#2a2c24] text-white hover:bg-[#3f4236]"
              }`}
            >
              {added ? <Check size={16} /> : <ShoppingBag size={16} />}
              {added ? "Added to Bag!" : `Add Size ${selectedSize} to Bag`}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
