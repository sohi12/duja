"use client";

import React from "react";
import { useStore } from "../context/StoreContext";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AnnouncementBar() {
  const { settings, isInitialized } = useStore();

  if (!isInitialized || !settings.announcementActive || !settings.announcementText) {
    return null;
  }

  return (
    <div className="bg-[#2a2c24] text-[#ddb892] text-[11px] py-2 px-4 border-b border-[#3f4236] transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 text-center flex-wrap">
        <span className="inline-flex items-center gap-1.5 font-medium tracking-wide">
          <Sparkles size={12} className="text-[#ddb892] shrink-0" />
          <span>{settings.announcementText}</span>
        </span>
        <Link
          href="/collection"
          className="inline-flex items-center gap-0.5 text-white underline hover:text-[#ddb892] text-[10px] font-bold uppercase tracking-wider ml-1"
        >
          Shop Now <ArrowRight size={10} />
        </Link>
      </div>
    </div>
  );
}
