"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

const blouses = [
  {
    id: 1,
    name: "Sand Minimalist Linen Blouse",
    price: 1100,
    image: "/products/1.jpeg",
  },
  {
    id: 2,
    name: "Olive Earth Cotton Blouse",
    price: 980,
    image: "/products/2.jpeg",
  },
  {
    id: 3,
    name: "Terracotta Wrap Linen Blouse",
    price: 1050,
    image: "/products/3.jpeg",
  },
];
export default function CollectionPage() {
  const { addToCart } = useCart();

  return (
    <div className="max-w-5xl mx-auto px-6 pt-8 pb-16 space-y-8 text-center">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2a2c24]">
          The Blouse Collection
        </h1>
        <p className="text-xs text-[#3f4236]/70">
          Pure linen & organic cotton blouses designed for everyday ease.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-3 gap-6 text-left">
        {blouses.map((blouse) => (
          <div
            key={blouse.id}
            className="bg-[#f2efe9]/60 rounded-2xl border border-[#e2ded5] overflow-hidden space-y-3 p-3 transition hover:shadow-md"
          >
            <Link href={`/collection/${blouse.id}`}>
              <img
                src={blouse.image}
                alt={blouse.name}
                className="w-full h-72 object-cover rounded-xl"
              />
            </Link>

            <div className="px-1 space-y-1">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#6b705c]">
                Blouse
              </span>
              <Link href={`/collection/${blouse.id}`}>
                <h3 className="font-serif font-bold text-sm text-[#2a2c24] hover:text-[#6b705c] transition">
                  {blouse.name}
                </h3>
              </Link>
              <p className="font-bold text-xs text-[#3f4236]">
                {blouse.price} EGP
              </p>
            </div>

            <button
              onClick={() =>
                addToCart({
                  id: blouse.id,
                  name: blouse.name,
                  price: blouse.price,
                  size: "M",
                  image: blouse.image,
                })
              }
              className="w-full bg-[#2a2c24] text-[#f4f1de] py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#3f4236] transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag size={14} /> Add to Bag
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
