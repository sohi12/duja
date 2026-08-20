"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";

export default function ReturnPolicyPage() {
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
          Customer Satisfaction
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2a2c24]">
          Return & Exchange Policy
        </h1>
        <p className="text-xs text-[#3f4236]/70">Hassle-free 14-Day Returns</p>
      </div>

      <div className="space-y-6 text-xs leading-relaxed text-[#3f4236]">
        <div className="p-4 bg-[#e2ded5]/40 rounded-2xl border border-[#e2ded5] flex items-center gap-3 text-[#2a2c24]">
          <RefreshCw size={24} className="text-[#6b705c] shrink-0" />
          <p className="text-xs">
            We want you to love your Duja pieces. If a size or fit isn&apos;t perfect, you can request an exchange or return within <strong>14 days of delivery</strong>.
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-serif font-bold text-[#2a2c24] flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#6b705c]" /> Conditions for Eligibility
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-[#6b705c]">
            <li>Garments must be unworn, unwashed, and in original condition with tags attached.</li>
            <li>Proof of purchase (order reference number or phone number used during checkout) is required.</li>
            <li>Exchanges for different sizes are subject to fabric stock availability.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-serif font-bold text-[#2a2c24] flex items-center gap-2">
            <AlertCircle size={18} className="text-[#6b705c]" /> Process & Courier Pickup
          </h2>
          <p>
            To initiate a return or exchange, message our customer concierge on WhatsApp or contact us at <strong className="text-[#2a2c24]">hello@dujabrand.com</strong>. Our courier will pick up the item within 2-4 business days.
          </p>
        </section>
      </div>
    </div>
  );
}
