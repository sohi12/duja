"use client";

import React, { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Sand Linen Blouse",
    price: 1100,
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800",
    desc: "100% Organic Egyptian linen with a relaxed, breathable fit.",
  },
  {
    id: 2,
    name: "Olive Earth Blouse",
    price: 980,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
    desc: "Soft-washed cotton linen blend with natural wooden buttons.",
  },
  {
    id: 3,
    name: "Terracotta Wrap Blouse",
    price: 1050,
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
    desc: "Tailored wrap-style linen blouse designed for effortless layering.",
  },
];

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = React.use(params);
  const productId = Number(resolvedParams.id);
  const product = products.find((p) => p.id === productId) || products[0];

  const { addToCart } = useCart();
  const [size, setSize] = useState("M");
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 pt-6 pb-12 space-y-6 text-left">
      <Link
        href="/collection"
        className="inline-flex items-center gap-1 text-xs text-[#6b705c]"
      >
        <ArrowLeft size={14} /> Back
      </Link>

      <div className="grid md:grid-cols-2 gap-6 items-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover rounded-2xl border border-[#e2ded5]"
        />

        <div className="space-y-4 text-xs">
          <div>
            <h1 className="text-xl font-serif font-bold text-[#2a2c24]">
              {product.name}
            </h1>
            <p className="text-sm font-bold text-[#3f4236] mt-1">
              {product.price} EGP
            </p>
          </div>

          <p className="text-[#3f4236]/80 leading-relaxed">{product.desc}</p>

          <div className="space-y-1.5">
            <span className="font-bold text-[10px] text-[#3f4236] uppercase">
              Size
            </span>
            <div className="flex gap-2">
              {["S", "M", "L", "XL"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-8 h-8 rounded-lg font-bold border transition cursor-pointer ${size === s ? "bg-[#2a2c24] text-white" : "bg-[#f7f5f0]"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`w-full py-3 rounded-xl font-bold uppercase transition flex justify-center items-center gap-2 cursor-pointer ${added ? "bg-green-700 text-white" : "bg-[#2a2c24] text-[#f4f1de]"}`}
          >
            <ShoppingBag size={14} /> {added ? "Added!" : "Add to Bag"}
          </button>
        </div>
      </div>
    </div>
  );
}
