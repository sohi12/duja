"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice } =
    useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#2a2c24]/50 backdrop-blur-xs cursor-pointer"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-[#f7f5f0] border-l border-[#e2ded5] shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-5 border-b border-[#e2ded5] bg-[#2a2c24] text-[#f4f1de] flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} className="text-[#ddb892]" />
                  <h2 className="font-serif font-bold text-base text-white tracking-wide">
                    Your Shopping Bag
                  </h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 text-[#ddb892] hover:text-white transition cursor-pointer"
                  aria-label="Close cart drawer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 bg-[#e2ded5]/40 rounded-full flex items-center justify-center mx-auto text-[#6b705c]">
                      <ShoppingBag size={28} />
                    </div>
                    <div className="space-y-1">
                      <p className="font-serif font-bold text-sm text-[#2a2c24]">
                        Your bag is empty
                      </p>
                      <p className="text-xs text-[#3f4236]/70">
                        Explore our sustainable linen capsule collection.
                      </p>
                    </div>
                    <Link
                      href="/collection"
                      onClick={() => setIsCartOpen(false)}
                      className="inline-block bg-[#3f4236] text-[#f4f1de] px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#6b705c] transition"
                    >
                      Shop Collection
                    </Link>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div
                      layout
                      key={`${item.id}-${item.size}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-[#e2ded5] shadow-xs gap-3"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-xl border border-[#e2ded5]"
                        />
                      )}

                      <div className="flex-1 min-w-0 space-y-1 text-xs">
                        <p className="font-serif font-bold text-[#2a2c24] truncate">
                          {item.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#e8ebe0] text-[#6b705c] px-2 py-0.5 rounded-md">
                            Size: {item.size}
                          </span>
                          <span className="font-bold text-[#3f4236]">
                            {item.price} EGP
                          </span>
                        </div>
                      </div>

                      {/* Quantity Selector & Remove */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-[#f7f5f0] border border-[#e2ded5] rounded-xl px-2 py-1 gap-2 text-xs">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.size, -1)
                            }
                            className="font-bold text-[#3f4236] hover:text-[#2a2c24] px-1 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="font-bold text-xs">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.size, 1)
                            }
                            className="font-bold text-[#3f4236] hover:text-[#2a2c24] px-1 cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-[#6b705c] hover:text-red-600 p-1.5 transition cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer CTA */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-[#e2ded5] bg-[#e2ded5]/30 space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs text-[#3f4236]">
                      <span>Shipping estimate:</span>
                      <span className="font-semibold text-[#6b705c]">
                        Calculated at checkout
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-serif font-bold text-[#2a2c24]">
                      <span>Total Amount:</span>
                      <span className="text-base text-[#3f4236]">
                        {totalPrice} EGP
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-[#6b705c] bg-white p-2.5 rounded-xl border border-[#e2ded5]">
                    <ShieldCheck size={16} className="shrink-0" />
                    <span>Free shipping in Egypt on orders over 2000 EGP.</span>
                  </div>

                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full bg-[#2a2c24] text-[#f4f1de] py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#3f4236] transition duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    Proceed to Checkout <ArrowRight size={15} />
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
