"use client";

import React from "react";
import { User, Banknote, CreditCard } from "lucide-react";
import InstaPayBox from "./InstaPayBox";

interface ShippingFormProps {
  formData: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      phone: string;
      address: string;
      city: string;
    }>
  >;
  paymentMethod: "cod" | "instapay";
  setPaymentMethod: (method: "cod" | "instapay") => void;
  INSTAPAY_NUMBER: string;
}

export default function ShippingForm({
  formData,
  setFormData,
  paymentMethod,
  setPaymentMethod,
  INSTAPAY_NUMBER,
}: ShippingFormProps) {
  return (
    <div className="space-y-4 text-xs">
      {/* Shipping Info Card */}
      <div className="bg-[#f2efe9]/80 p-5 rounded-2xl space-y-3 border border-[#e2ded5]">
        <h2 className="font-serif font-bold text-sm text-[#2a2c24] flex items-center gap-1.5">
          <User size={15} className="text-[#6b705c]" /> Shipping Information
        </h2>
        <input
          type="text"
          required
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-[#f7f5f0] border border-[#e2ded5] p-2.5 rounded-xl outline-none"
        />
        <input
          type="tel"
          required
          placeholder="Phone Number (WhatsApp)"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full bg-[#f7f5f0] border border-[#e2ded5] p-2.5 rounded-xl outline-none"
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            required
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full bg-[#f7f5f0] border border-[#e2ded5] p-2.5 rounded-xl outline-none"
          />
          <input
            type="text"
            required
            placeholder="Detailed Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full bg-[#f7f5f0] border border-[#e2ded5] p-2.5 rounded-xl outline-none"
          />
        </div>
      </div>

      {/* Payment Selection Card */}
      <div className="bg-[#f2efe9]/80 p-5 rounded-2xl space-y-3 border border-[#e2ded5]">
        <h2 className="font-serif font-bold text-sm text-[#2a2c24]">
          Payment Option
        </h2>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setPaymentMethod("cod")}
            className={`p-3 rounded-xl border flex items-center justify-center gap-1.5 cursor-pointer font-bold ${
              paymentMethod === "cod"
                ? "bg-[#2a2c24] text-white"
                : "bg-[#f7f5f0]"
            }`}
          >
            <Banknote size={16} /> Cash on Delivery
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod("instapay")}
            className={`p-3 rounded-xl border flex items-center justify-center gap-1.5 cursor-pointer font-bold ${
              paymentMethod === "instapay"
                ? "bg-[#2a2c24] text-white"
                : "bg-[#f7f5f0]"
            }`}
          >
            <CreditCard size={16} /> InstaPay
          </button>
        </div>
        {paymentMethod === "instapay" && (
          <InstaPayBox number={INSTAPAY_NUMBER} />
        )}
      </div>
    </div>
  );
}
