"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import { ShoppingBag } from "lucide-react";

export default function NavbarActions() {
  const { setIsCartOpen, totalItems } = useCart();

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="bg-[#3f4236] text-[#fcfbf9] px-4 py-2 rounded-full text-xs font-semibold tracking-wider hover:bg-[#6b705c] transition duration-300 flex items-center gap-2 relative cursor-pointer shadow-xs"
    >
      <ShoppingBag size={15} />
      <span>Bag</span>
      {totalItems > 0 && (
        <span className="bg-[#6b705c] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold ml-0.5">
          {totalItems}
        </span>
      )}
    </button>
  );
}
