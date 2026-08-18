"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import { ShoppingBag } from "lucide-react";

export default function NavbarActions() {
  const { setIsCartOpen, totalItems } = useCart();

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="bg-[#3f4236] text-[#fcfbf9] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#6b705c] transition flex items-center gap-2 relative cursor-pointer"
    >
      <ShoppingBag size={16} />
      <span>Bag</span>
      {totalItems > 0 && (
        <span className="bg-[#6b705c] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
          {totalItems}
        </span>
      )}
    </button>
  );
}
