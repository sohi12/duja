"use client";

import React from "react";
import { useCart, CartItem } from "../context/CartContext";

import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    const phoneNumber = "201000000000"; // ضعي رقم واتساب البراند هنا
    let message = "Hello Duja! I would like to place an order:\n\n";

    cart.forEach((item: CartItem, index: number) => {
      message += `${index + 1}. *${item.name}* x${item.quantity} - ${item.price * item.quantity} EGP\n`;
    });

    message += `\n*Total Amount:* ${totalPrice} EGP\n\nPlease let me know the payment and delivery details.`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Background Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Content */}
      <div className="relative w-full max-w-md bg-[#fcfbf9] h-full shadow-2xl flex flex-col justify-between z-10 border-l border-[#e8ebe0]">
        {/* Header */}
        <div className="p-6 border-b border-[#e8ebe0] flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-[#6b705c]" size={20} />
            <h2 className="font-serif font-bold text-lg text-[#2a2c24]">
              Your Cart
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#e8ebe0] transition text-[#3f4236] cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="mx-auto text-[#6b705c]/40" size={48} />
              <p className="text-sm text-[#6b705c]">Your cart is empty.</p>
            </div>
          ) : (
            cart.map((item: CartItem) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-2xl border border-[#e8ebe0] flex items-center justify-between gap-4"
              >
                <div className="flex-1 space-y-1">
                  <h4 className="font-serif font-semibold text-sm text-[#2a2c24]">
                    {item.name}
                  </h4>
                  <p className="text-xs font-bold text-[#6b705c]">
                    {item.price} EGP
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-[#f6f7f3] border border-[#e8ebe0] rounded-full px-2 py-1">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1 text-[#3f4236] hover:text-[#6b705c] cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-xs font-bold w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1 text-[#3f4236] hover:text-[#6b705c] cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-600 p-1 cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-[#e8ebe0] space-y-4">
            <div className="flex justify-between items-center text-sm font-semibold text-[#2a2c24]">
              <span>Subtotal:</span>
              <span className="text-base text-[#6b705c]">{totalPrice} EGP</span>
            </div>
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full bg-[#25D366] text-white py-3.5 rounded-2xl font-medium text-sm hover:bg-[#1da851] transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              Order via WhatsApp <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
