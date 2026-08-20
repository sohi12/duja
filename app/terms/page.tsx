"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle } from "lucide-react";

export default function TermsPage() {
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
          Agreement & Guidelines
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2a2c24]">
          Terms of Service
        </h1>
        <p className="text-xs text-[#3f4236]/70">Last updated: August 2026</p>
      </div>

      <div className="space-y-6 text-xs leading-relaxed text-[#3f4236]">
        <section className="space-y-2">
          <h2 className="text-base font-serif font-bold text-[#2a2c24] flex items-center gap-2">
            <FileText size={18} className="text-[#6b705c]" /> 1. Acceptance of Terms
          </h2>
          <p>
            By accessing or ordering from <strong>Duja Brand</strong>, you agree to comply with our purchasing terms. Our garments are produced using natural raw fibers and handcrafted procedures, which means slight variations in natural linen grain or plant dye shades are authentic marks of craft.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-serif font-bold text-[#2a2c24]">
            2. Orders & Order Placement
          </h2>
          <p>
            Orders placed via our website or official WhatsApp channel are confirmed once details are validated. We reserve the right to cancel or modify orders in case of fabric stock unavailability or pricing typographical errors.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-serif font-bold text-[#2a2c24]">
            3. Pricing & Payment Options
          </h2>
          <p>
            All prices listed on Duja are in Egyptian Pounds (EGP). Payments can be completed seamlessly via <strong>Cash on Delivery (COD)</strong> or instant wallet transfer via <strong>InstaPay</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
