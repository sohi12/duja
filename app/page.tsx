"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-[85vh] flex flex-col justify-center px-6 py-10 max-w-5xl mx-auto space-y-10 text-center">
      {/* Top Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-4 max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-3">
          <span className="w-6 h-[1px] bg-[#6b705c]"></span>
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#6b705c]">
            Duja Naturals 26
          </span>
          <span className="w-6 h-[1px] bg-[#6b705c]"></span>
        </div>

        <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#2a2c24] leading-[1.15]">
          Silence{" "}
          <span className="text-[#6b705c] italic font-normal">
            in Every Stitch
          </span>
        </h1>
      </motion.div>

      {/* Centered Wide Hanger Image Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative w-full"
      >
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
          className="w-full h-[320px] md:h-[420px] rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl bg-[#e8ebe0] relative group cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1200"
            alt="Minimalist Wide Hanger Banner"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700"
          />

          {/* Floating Badges inside Banner */}
          <div className="absolute top-6 left-6 bg-white/85 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest text-[#2a2c24] uppercase border border-white/50 shadow-xs">
            Editorial Piece
          </div>

          <div className="absolute bottom-6 left-6 right-6 md:right-auto bg-white/85 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/50 flex items-center justify-between gap-6 shadow-xs">
            <span className="font-serif text-xs font-bold text-[#2a2c24]">
              100% Organic Linen Capsule
            </span>
            <span className="text-[10px] font-bold text-[#6b705c] uppercase tracking-wider">
              Handcrafted
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Description & CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="space-y-6 max-w-md mx-auto pt-2"
      >
        <p className="text-[#3f4236]/80 text-xs md:text-sm leading-relaxed">
          Thoughtfully curated garments in natural earthy shades. Minimalist
          designs tailored to seamlessly match your lifestyle.
        </p>

        <div className="flex justify-center">
          <Link
            href="/collection"
            className="group bg-[#3f4236] text-[#fcfbf9] px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-[#6b705c] transition duration-300 flex items-center gap-2 shadow-md"
          >
            Explore Collection
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
