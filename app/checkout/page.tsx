"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { CreditCard, Banknote, Send, ArrowLeft } from "lucide-react";
import Link from "next/link";
import OrderSummary from "./OrderSummary";
import InstaPayBox from "./InstaPayBox";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "instapay">("cod");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const INSTAPAY_NUMBER = "01000000000";
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const items = cart
      .map((i) => `- ${i.name} (${i.size}) x${i.quantity}`)
      .join("\n");
    const msg = `*New Order - Duja* 🌿\n\n👤 *Name:* ${formData.name}\n📱 *Phone:* ${formData.phone}\n📍 *Address:* ${formData.address}, ${formData.city}\n\n*Items:*\n${items}\n\n💰 *Total:* ${totalPrice} EGP\n💳 *Payment:* ${paymentMethod === "cod" ? "Cash on Delivery" : "InstaPay"}`;

    window.open(
      `https://wa.me/201000000000?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-3">
        <h2 className="font-serif font-bold text-xl text-[#2a2c24]">
          Your Bag is Empty
        </h2>
        <Link
          href="/collection"
          className="inline-block bg-[#3f4236] text-white px-5 py-2 rounded-full text-xs"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 pt-6 pb-16 space-y-6 text-left">
      <Link
        href="/collection"
        className="inline-flex items-center gap-2 text-xs text-[#6b705c]"
      >
        <ArrowLeft size={14} /> Back to Shop
      </Link>
      <h1 className="text-2xl font-serif font-bold text-[#2a2c24]">Checkout</h1>

      <div className="grid md:grid-cols-5 gap-6 items-start">
        <form
          onSubmit={handleSubmit}
          className="md:col-span-3 space-y-4 text-xs"
        >
          <div className="bg-[#e2ded5]/30 p-5 rounded-xl space-y-3 border border-[#e2ded5]">
            <input
              type="text"
              required
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-[#f7f5f0] border border-[#e2ded5] p-2.5 rounded-lg outline-none"
            />
            <input
              type="tel"
              required
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full bg-[#f7f5f0] border border-[#e2ded5] p-2.5 rounded-lg outline-none"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                placeholder="City / Governorate"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full bg-[#f7f5f0] border border-[#e2ded5] p-2.5 rounded-lg outline-none"
              />
              <input
                type="text"
                required
                placeholder="Detailed Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full bg-[#f7f5f0] border border-[#e2ded5] p-2.5 rounded-lg outline-none"
              />
            </div>
          </div>

          <div className="bg-[#e2ded5]/30 p-5 rounded-xl space-y-3 border border-[#e2ded5]">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`p-3 rounded-lg border flex items-center justify-center gap-2 cursor-pointer ${paymentMethod === "cod" ? "bg-[#2a2c24] text-white" : "bg-[#f7f5f0]"}`}
              >
                <Banknote size={16} /> Cash on Delivery
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("instapay")}
                className={`p-3 rounded-lg border flex items-center justify-center gap-2 cursor-pointer ${paymentMethod === "instapay" ? "bg-[#2a2c24] text-white" : "bg-[#f7f5f0]"}`}
              >
                <CreditCard size={16} /> InstaPay
              </button>
            </div>
            {paymentMethod === "instapay" && (
              <InstaPayBox number={INSTAPAY_NUMBER} />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#3f4236] text-white py-3 rounded-xl font-bold hover:bg-[#6b705c] transition flex justify-center items-center gap-2 cursor-pointer"
          >
            Place Order <Send size={14} />
          </button>
        </form>

        <div className="md:col-span-2">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
