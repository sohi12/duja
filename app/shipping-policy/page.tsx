"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Truck, ShieldCheck, MapPin } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8 text-left">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6b705c] hover:underline"
      >
        <ArrowLeft size={14} /> Back to Home
      </Link>

      <div className="space-y-3 border-b border-[#e2ded5] pb-6">
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#6b705c]">
          Delivery Information
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2a2c24]">
          Shipping & Delivery Rates
        </h1>
        <p className="text-xs text-[#3f4236]/70">Nationwide Express Delivery across Egypt</p>
      </div>

      <div className="space-y-6 text-xs leading-relaxed text-[#3f4236]">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-[#e2ded5] space-y-2">
            <MapPin className="text-[#6b705c]" size={20} />
            <h3 className="font-serif font-bold text-sm text-[#2a2c24]">Greater Cairo & Giza</h3>
            <p className="text-[#6b705c]">2 - 3 Business Days</p>
            <span className="font-bold text-[#2a2c24] block">60 EGP</span>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#e2ded5] space-y-2">
            <Truck className="text-[#6b705c]" size={20} />
            <h3 className="font-serif font-bold text-sm text-[#2a2c24]">Alexandria & Delta</h3>
            <p className="text-[#6b705c]">3 - 4 Business Days</p>
            <span className="font-bold text-[#2a2c24] block">75 EGP</span>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#e2ded5] space-y-2">
            <ShieldCheck className="text-[#6b705c]" size={20} />
            <h3 className="font-serif font-bold text-sm text-[#2a2c24]">Upper Egypt & Red Sea</h3>
            <p className="text-[#6b705c]">4 - 5 Business Days</p>
            <span className="font-bold text-[#2a2c24] block">90 EGP</span>
          </div>
        </div>

        <div className="p-4 bg-[#2a2c24] text-[#f4f1de] rounded-2xl border border-[#3f4236] text-center font-bold">
          🎉 Free shipping on all orders over 2,000 EGP nationwide!
        </div>
      </div>
    </div>
  );
}
