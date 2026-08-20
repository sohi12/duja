"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Ruler } from "lucide-react";

export default function SizeGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8 text-left">
      <Link
        href="/collection"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6b705c] hover:underline"
      >
        <ArrowLeft size={14} /> Back to Collection
      </Link>

      <div className="space-y-3 border-b border-[#e2ded5] pb-6">
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#6b705c]">
          Fit & Measurements
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2a2c24]">
          Size Chart & Fit Guide
        </h1>
        <p className="text-xs text-[#3f4236]/70">
          Our garments feature a relaxed, effortless minimalist silhouette.
        </p>
      </div>

      {/* Size Chart Table */}
      <div className="overflow-x-auto bg-white rounded-2xl border border-[#e2ded5] p-4 shadow-xs">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-[#e2ded5] text-[#2a2c24] font-serif font-bold">
              <th className="py-3 px-4">Size</th>
              <th className="py-3 px-4">Bust (cm)</th>
              <th className="py-3 px-4">Waist (cm)</th>
              <th className="py-3 px-4">Hips (cm)</th>
              <th className="py-3 px-4">Fit Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2ded5] text-[#3f4236]">
            <tr>
              <td className="py-3 px-4 font-bold text-[#2a2c24]">S (Small)</td>
              <td className="py-3 px-4">84 - 88</td>
              <td className="py-3 px-4">66 - 70</td>
              <td className="py-3 px-4">90 - 94</td>
              <td className="py-3 px-4 text-[#6b705c]">Relaxed Fit</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-bold text-[#2a2c24]">M (Medium)</td>
              <td className="py-3 px-4">89 - 94</td>
              <td className="py-3 px-4">71 - 76</td>
              <td className="py-3 px-4">95 - 100</td>
              <td className="py-3 px-4 text-[#6b705c]">Standard Linen Cut</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-bold text-[#2a2c24]">L (Large)</td>
              <td className="py-3 px-4">95 - 100</td>
              <td className="py-3 px-4">77 - 82</td>
              <td className="py-3 px-4">101 - 106</td>
              <td className="py-3 px-4 text-[#6b705c]">Flowy Fit</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-bold text-[#2a2c24]">XL (Extra Large)</td>
              <td className="py-3 px-4">101 - 108</td>
              <td className="py-3 px-4">83 - 90</td>
              <td className="py-3 px-4">107 - 114</td>
              <td className="py-3 px-4 text-[#6b705c]">Oversized Comfort</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="p-5 bg-[#e2ded5]/30 rounded-2xl border border-[#e2ded5] space-y-2 text-xs text-[#3f4236]">
        <div className="flex items-center gap-2 font-bold text-[#2a2c24]">
          <Ruler size={16} className="text-[#6b705c]" />
          <span>Need Custom Sizing?</span>
        </div>
        <p className="text-[#3f4236]/80 leading-relaxed text-[11px]">
          We offer complimentary sleeve or hem length adjustments on select linen blouses. Mention your measurements during checkout or reach out via our contact page.
        </p>
      </div>
    </div>
  );
}
