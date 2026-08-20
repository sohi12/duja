"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import { ShoppingBag, User } from "lucide-react";

export default function NavbarActions() {
  const { setIsCartOpen, setIsAuthOpen, totalItems, user } = useCart();

  return (
    <div className="flex items-center gap-2">
      {/* User Account Button */}
      <button
        onClick={() => setIsAuthOpen(true)}
        className="p-2 bg-[#3f4236]/60 hover:bg-[#3f4236] text-[#ddb892] hover:text-white rounded-full transition duration-300 flex items-center justify-center cursor-pointer relative"
        title={user ? `Logged in as ${user.name}` : "Sign In / Account"}
        aria-label="User Account"
      >
        <User size={16} />
        {user && (
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#6b705c] border-2 border-[#2a2c24] rounded-full" />
        )}
      </button>

      {/* Cart Button with Counter Badge */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="bg-[#3f4236] text-[#fcfbf9] px-4 py-2 rounded-full text-xs font-semibold tracking-wider hover:bg-[#6b705c] transition duration-300 flex items-center gap-2 relative cursor-pointer shadow-xs border border-white/10"
        aria-label={`Shopping Bag (${totalItems} items)`}
      >
        <ShoppingBag size={15} />
        <span className="hidden sm:inline">Bag</span>
        {totalItems > 0 && (
          <span className="bg-[#6b705c] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            {totalItems}
          </span>
        )}
      </button>
    </div>
  );
}
