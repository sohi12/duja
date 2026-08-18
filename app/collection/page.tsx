"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { ShoppingBag } from "lucide-react";

const PRODUCTS = [
  {
    id: 1,
    name: "Olive Earth Linen Shirt",
    price: 850,
    category: "Tops",
    image:
      "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    name: "Sand Minimalist Kimono",
    price: 1200,
    category: "Outerwear",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    name: "Forest Shade Trousers",
    price: 950,
    category: "Bottoms",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 4,
    name: "Naturals Cotton Tote",
    price: 400,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600",
  },
];

export default function CollectionPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart } = useCart();

  const filtered =
    selectedCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-6 pt-12 pb-20 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-serif font-bold text-[#2a2c24]">
          The Collection
        </h1>
        <p className="text-sm text-[#6b705c]">
          Carefully crafted garments inspired by nature.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-3 border-b border-[#e8ebe0] pb-4">
        {["All", "Tops", "Outerwear", "Bottoms", "Accessories"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 text-xs rounded-full transition cursor-pointer ${
              selectedCategory === cat
                ? "bg-[#3f4236] text-white"
                : "bg-[#e8ebe0]/50 text-[#3f4236] hover:bg-[#e8ebe0]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-[#e8ebe0] overflow-hidden flex flex-col justify-between hover:shadow-lg transition"
          >
            <div className="h-72 overflow-hidden bg-[#f6f7f3]">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>
            <div className="p-4 space-y-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#6b705c]">
                  {item.category}
                </span>
                <h3 className="font-serif font-semibold text-sm text-[#2a2c24]">
                  {item.name}
                </h3>
                <p className="text-sm font-bold text-[#3f4236] mt-1">
                  {item.price} EGP
                </p>
              </div>

              <button
                onClick={() => addToCart(item)}
                className="w-full bg-[#3f4236] text-white text-xs font-medium py-2.5 rounded-xl hover:bg-[#6b705c] transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag size={15} /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
