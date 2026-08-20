"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function InstaPayBox({ number }: { number: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#2a2c24] text-[#f4f1de] p-4 rounded-xl space-y-2.5 text-xs mt-3">
      <p className="text-[11px] text-[#ddb892]">
        Transfer total amount to the number below & attach receipt via WhatsApp:
      </p>
      <div className="flex items-center justify-between bg-[#3f4236] px-3.5 py-2 rounded-lg border border-[#6b705c]">
        <span className="font-mono font-bold text-white">{number}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 text-[10px] text-[#ddb892] cursor-pointer"
        >
          {copied ? (
            <Check size={12} className="text-green-400" />
          ) : (
            <Copy size={12} />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
