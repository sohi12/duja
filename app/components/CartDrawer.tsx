"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import { X, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } =
    useCart();
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-[#e2ded5] flex justify-between items-center">
            <h2 className="font-serif font-bold text-base text-[#2a2c24]">
              Your Bag
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-[#3f4236] cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {cart.length === 0 ? (
              <p className="text-center py-10 text-xs text-[#3f4236]/70">
                Your bag is empty.
              </p>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex items-center justify-between p-3.5 bg-[#f7f5f0] rounded-xl border border-[#e2ded5]"
                >
                  <div className="space-y-0.5 text-xs">
                    <p className="font-serif font-bold text-[#2a2c24]">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-[#6b705c]">
                      Size: {item.size}
                    </p>
                    <p className="font-bold text-[#3f4236]">{item.price} EGP</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-white border border-[#e2ded5] rounded-md px-2 py-0.5 gap-2 text-xs">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="font-bold"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 transition cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer CTA */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#e2ded5] bg-[#f7f5f0] space-y-3">
              <div className="flex justify-between items-center text-xs font-serif font-bold text-[#2a2c24]">
                <span>Subtotal:</span>
                <span>{subtotal} EGP</span>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-[#2a2c24] text-[#f4f1de] py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#3f4236] transition duration-300 flex items-center justify-center gap-2 shadow-md"
              >
                Proceed to Checkout <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
