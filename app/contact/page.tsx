import React from "react";
import { Leaf, Heart, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-16 pb-20 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="bg-[#e8ebe0] text-[#3f4236] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest">
          Our Story
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2a2c24]">
          About Duja
        </h1>
        <p className="text-base text-[#6b705c] max-w-xl mx-auto leading-relaxed">
          Inspired by nature, created for simple everyday elegance.
        </p>
      </div>

      {/* Main Narrative */}
      <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#e8ebe0] space-y-6 text-[#3f4236] leading-relaxed text-base">
        <p>
          Founded with a passion for minimalist design and natural textures,{" "}
          <strong className="text-[#2a2c24]">Duja</strong> is a brand built on
          the philosophy that true elegance lies in simplicity.
        </p>
        <p>
          We curate versatile pieces with neutral, earthy shades—from olive
          green to warm sand. Every piece in our collection is carefully
          selected to offer maximum comfort, effortless style, and sustainable
          quality.
        </p>
      </div>

      {/* Values Grid */}
      <div className="grid md:grid-cols-3 gap-6 pt-4">
        <div className="p-6 bg-[#f6f7f3] rounded-2xl border border-[#e8ebe0] text-center space-y-2">
          <Leaf className="mx-auto text-[#6b705c]" size={28} />
          <h3 className="font-serif font-bold text-[#2a2c24]">
            Eco Philosophy
          </h3>
          <p className="text-xs text-[#3f4236]/70">
            Prioritizing natural fibers and conscious sourcing.
          </p>
        </div>
        <div className="p-6 bg-[#f6f7f3] rounded-2xl border border-[#e8ebe0] text-center space-y-2">
          <Heart className="mx-auto text-[#6b705c]" size={28} />
          <h3 className="font-serif font-bold text-[#2a2c24]">
            Crafted with Love
          </h3>
          <p className="text-xs text-[#3f4236]/70">
            Meticulous detail in every stitch and silhouette.
          </p>
        </div>
        <div className="p-6 bg-[#f6f7f3] rounded-2xl border border-[#e8ebe0] text-center space-y-2">
          <Sparkles className="mx-auto text-[#6b705c]" size={28} />
          <h3 className="font-serif font-bold text-[#2a2c24]">
            Timeless Style
          </h3>
          <p className="text-xs text-[#3f4236]/70">
            Designed to last beyond fast fashion trends.
          </p>
        </div>
      </div>
    </div>
  );
}
