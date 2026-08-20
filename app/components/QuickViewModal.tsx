"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { X, ShoppingBag, Check } from "lucide-react";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

type ModalProps = {
  product: Product | null;
  onClose: () => void;
};

export default function QuickViewModal({ product, onClose }: ModalProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("M");
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: `${product.name} (${selectedSize})`,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-[#fcfbf9] border border-[#e8ebe0] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl z-10 grid md:grid-cols-2">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 rounded-full hover:bg-white text-[#3f4236] cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Product Image */}
        <div className="h-64 md:h-full bg-[#f6f7f3]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold text-[#6b705c] tracking-widest">
              {product.category}
            </span>
            <h2 className="text-xl font-serif font-bold text-[#2a2c24]">
              {product.name}
            </h2>
            <p className="text-lg font-bold text-[#3f4236]">
              {product.price} EGP
            </p>
            <p className="text-xs text-[#3f4236]/70 leading-relaxed pt-2">
              Made from 100% natural organic fibers. Designed with a loose,
              relaxed minimalist fit.
            </p>
          </div>

          {/* Size Picker */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#2a2c24]">
              Select Size:
            </label>
            <div className="flex gap-2">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition cursor-pointer ${
                    selectedSize === size
                      ? "bg-[#3f4236] text-white"
                      : "bg-[#e8ebe0]/50 text-[#3f4236] hover:bg-[#e8ebe0]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAdd}
            className={`w-full py-3 rounded-2xl text-xs font-medium transition flex items-center justify-center gap-2 cursor-pointer ${
              added
                ? "bg-[#6b705c] text-white"
                : "bg-[#3f4236] text-white hover:bg-[#6b705c]"
            }`}
          >
            {added ? <Check size={16} /> : <ShoppingBag size={16} />}
            {added ? "Added to Bag!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
