"use client";

import { useCart } from "../context/CartContext";

export default function OrderSummary() {
  const { cart } = useCart();
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="bg-[#2a2c24] text-[#f4f1de] p-5 rounded-2xl space-y-4">
      <h3 className="font-serif font-bold text-sm text-white border-b border-[#3f4236] pb-2">
        Order Summary
      </h3>
      <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1 text-xs">
        {cart.map((item) => (
          <div
            key={`${item.id}-${item.size}`}
            className="flex justify-between items-center"
          >
            <div>
              <p className="font-bold text-white">{item.name}</p>
              <p className="text-[10px] text-[#ddb892]">
                Size: {item.size} × {item.quantity}
              </p>
            </div>
            <p className="font-bold text-[#ddb892]">
              {item.price * item.quantity} EGP
            </p>
          </div>
        ))}
      </div>
      <div className="border-t border-[#3f4236] pt-2 flex justify-between font-bold text-xs text-white">
        <span>Total:</span>
        <span className="text-[#ddb892]">{totalPrice} EGP</span>
      </div>
    </div>
  );
}
