"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import { Tag, Sparkles } from "lucide-react";

interface OrderSummaryProps {
  discountAmount?: number;
  couponCode?: string;
  shippingFee?: number;
}

export default function OrderSummary({
  discountAmount = 0,
  couponCode = "",
  shippingFee = 0,
}: OrderSummaryProps) {
  const { cart } = useCart();
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <div className="bg-[#2a2c24] text-[#f4f1de] p-6 rounded-3xl space-y-4 border border-[#3f4236] shadow-xl">
      <h3 className="font-serif font-bold text-sm text-white border-b border-[#3f4236] pb-3 flex items-center justify-between">
        <span>Order Summary</span>
        <span className="text-[10px] text-[#ddb892] uppercase font-sans font-semibold">
          {cart.reduce((acc, i) => acc + i.quantity, 0)} Items
        </span>
      </h3>

      {/* Item List */}
      <div className="space-y-3 max-h-56 overflow-y-auto pr-1 text-xs divide-y divide-[#3f4236]">
        {cart.map((item) => (
          <div
            key={`${item.id}-${item.size}`}
            className="flex justify-between items-center pt-2.5 first:pt-0"
          >
            <div className="space-y-0.5">
              <p className="font-bold text-white leading-tight">{item.name}</p>
              <p className="text-[10px] text-[#ddb892]">
                Fit: Size {item.size} × {item.quantity}
              </p>
            </div>
            <p className="font-bold font-mono text-[#ddb892] text-xs">
              {item.price * item.quantity} EGP
            </p>
          </div>
        ))}
      </div>

      {/* Totals Breakdown */}
      <div className="border-t border-[#3f4236] pt-3 space-y-2 text-xs">
        <div className="flex justify-between text-[#ddb892]/80">
          <span>Subtotal</span>
          <span className="font-mono">{subtotal} EGP</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-400 font-semibold">
            <span className="flex items-center gap-1">
              <Tag size={12} /> Promo ({couponCode})
            </span>
            <span className="font-mono">-{discountAmount} EGP</span>
          </div>
        )}

        <div className="flex justify-between text-[#ddb892]/80">
          <span>Delivery & Handling</span>
          <span className="font-mono">
            {shippingFee === 0 ? "Free (Complimentary)" : `${shippingFee} EGP`}
          </span>
        </div>

        <div className="border-t border-[#3f4236] pt-3 flex justify-between font-serif font-bold text-sm text-white">
          <span>Total:</span>
          <span className="text-[#ddb892] font-mono text-base">{grandTotal} EGP</span>
        </div>
      </div>
    </div>
  );
}
