"use client";

import React from "react";
import { Leaf, Sparkles, Heart, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-12 pb-20 space-y-20">
      {/* 1. Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4 max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-3">
          <span className="w-6 h-[1px] bg-[#6b705c]"></span>
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#6b705c]">
            The Origin Story
          </span>
          <span className="w-6 h-[1px] bg-[#6b705c]"></span>
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#2a2c24] leading-tight">
          Quiet Fashion for the <br />
          <span className="text-[#6b705c] italic font-normal">
            Mindful Soul
          </span>
        </h1>
      </motion.div>

      {/* 2. Visual Editorial Block (Text + Image Match) */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left Interactive Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="w-full h-[420px] rounded-[2.5rem] overflow-hidden border-8 border-[#f7f5f0] shadow-2xl bg-[#e8ebe0] relative group">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800"
              alt="Duja Craftsmanship"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute top-4 left-4 bg-[#2a2c24]/80 backdrop-blur-md text-[#f4f1de] text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full border border-[#3f4236]">
              Handmade Aesthetics
            </div>
          </div>
        </motion.div>

        {/* Right Story Text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6 text-left"
        >
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2a2c24] leading-snug">
            Sourced from Nature, <br />
            Crafted for Timeless Comfort.
          </h2>
          <p className="text-[#3f4236]/80 text-xs md:text-sm leading-relaxed">
            Founded with a passion for minimalist design and natural textures,{" "}
            <strong className="text-[#2a2c24]">Duja</strong> was born to strip
            away the noise of fast fashion. We believe that true luxury is
            feeling at home in what you wear.
          </p>
          <p className="text-[#3f4236]/80 text-xs md:text-sm leading-relaxed">
            Every piece is curated with neutral, earthy shades—from warm sand to
            muted olive—making daily dressing an effortless ritual of
            simplicity.
          </p>
        </motion.div>
      </div>

      {/* 3. Interactive Pillars Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid md:grid-cols-3 gap-6 pt-6"
      >
        <div className="p-8 bg-[#2a2c24] text-[#f4f1de] rounded-3xl border border-[#3f4236] space-y-4 shadow-xl hover:-translate-y-1.5 transition duration-300">
          <Leaf className="text-[#ddb892]" size={28} />
          <h3 className="font-serif font-bold text-lg text-white">
            Eco Philosophy
          </h3>
          <p className="text-xs text-[#ddb892]/80 leading-relaxed">
            Prioritizing 100% organic linen and breathable fibers that leave a
            soft footprint on the earth.
          </p>
        </div>

        <div className="p-8 bg-[#e2ded5]/40 rounded-3xl border border-[#e2ded5] space-y-4 hover:-translate-y-1.5 transition duration-300">
          <Heart className="text-[#6b705c]" size={28} />
          <h3 className="font-serif font-bold text-lg text-[#2a2c24]">
            Handcrafted Detail
          </h3>
          <p className="text-xs text-[#3f4236]/80 leading-relaxed">
            Meticulous attention in every stitch, ensuring relaxed fits that
            adapt gracefully to your lifestyle.
          </p>
        </div>

        <div className="p-8 bg-[#e2ded5]/40 rounded-3xl border border-[#e2ded5] space-y-4 hover:-translate-y-1.5 transition duration-300">
          <Sparkles className="text-[#6b705c]" size={28} />
          <h3 className="font-serif font-bold text-lg text-[#2a2c24]">
            Timeless Wardrobe
          </h3>
          <p className="text-xs text-[#3f4236]/80 leading-relaxed">
            Transcending seasonal trends to offer versatile staples built to
            last across years, not months.
          </p>
        </div>
      </motion.div>

      {/* 4. Bottom CTA Strip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center pt-8 space-y-4"
      >
        <h3 className="font-serif font-bold text-xl text-[#2a2c24]">
          Experience the Duja Touch
        </h3>
        <div className="flex justify-center">
          <Link
            href="/collection"
            className="group bg-[#3f4236] text-[#fcfbf9] px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-[#6b705c] transition duration-300 flex items-center gap-2 shadow-md"
          >
            Browse Collection
            <ArrowUpRight
              size={15}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition duration-300"
            />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
