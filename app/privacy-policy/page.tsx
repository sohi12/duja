"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye } from "lucide-react";

export default function PrivacyPolicyPage() {
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
          Legal & Transparency
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2a2c24]">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#3f4236]/70">Last updated: August 2026</p>
      </div>

      <div className="space-y-6 text-xs leading-relaxed text-[#3f4236]">
        <section className="space-y-2">
          <h2 className="text-base font-serif font-bold text-[#2a2c24] flex items-center gap-2">
            <ShieldCheck size={18} className="text-[#6b705c]" /> 1. Commitment to Your Privacy
          </h2>
          <p>
            At <strong>Duja Naturals</strong>, we value your privacy as much as we value sustainable slow fashion. This Privacy Policy explains how we collect, use, and protect your personal information when visiting our website or ordering from our minimalist collection.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-serif font-bold text-[#2a2c24] flex items-center gap-2">
            <Lock size={18} className="text-[#6b705c]" /> 2. Information We Collect
          </h2>
          <p>We collect essential information necessary to deliver your orders securely:</p>
          <ul className="list-disc pl-5 space-y-1 text-[#6b705c]">
            <li>Contact details: Name, phone number, shipping address, and email.</li>
            <li>Order specifications: Garment sizing, items purchased, and payment method selected.</li>
            <li>Communication history: Inquiries sent via our contact form or official WhatsApp support.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-serif font-bold text-[#2a2c24] flex items-center gap-2">
            <Eye size={18} className="text-[#6b705c]" /> 3. Data Protection & Payments
          </h2>
          <p>
            We do not store credit card details on our servers. For InstaPay transfers or Cash on Delivery orders, transactions are processed directly with authorized financial institutions in Egypt. Your address and contact numbers are exclusively shared with accredited courier partners to complete delivery.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-serif font-bold text-[#2a2c24]">
            4. Your Rights & Inquiries
          </h2>
          <p>
            You have full right to request access to, correction, or deletion of your personal data at any time. For questions regarding privacy, email us at <strong className="text-[#2a2c24]">privacy@dujabrand.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
