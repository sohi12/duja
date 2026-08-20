"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2, Globe } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#2a2c24] border-t border-[#3f4236] text-[#f4f1de] pt-14 pb-8 mt-20 w-full">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-xs">
        {/* Column 1: Brand & Bio */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-xl tracking-widest text-white uppercase flex items-center gap-1">
              Duja<span className="text-[#ddb892] text-2xl leading-none">.</span>
            </span>
          </div>
          <p className="text-[#ddb892]/80 leading-relaxed text-[11px]">
            Minimalist natural apparel designed for slow, mindful living. Handcrafted from 100% organic Egyptian linen & natural fibers.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-2 text-[#ddb892]">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-[#3f4236] rounded-full hover:bg-[#6b705c] hover:text-white transition cursor-pointer"
              aria-label="Instagram"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-[#3f4236] rounded-full hover:bg-[#6b705c] hover:text-white transition cursor-pointer"
              aria-label="Facebook"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://dujabrand.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-[#3f4236] rounded-full hover:bg-[#6b705c] hover:text-white transition cursor-pointer"
              aria-label="Website"
            >
              <Globe size={15} />
            </a>
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-white uppercase tracking-wider text-[11px] text-[#ddb892]">
            Explore Duja
          </h4>
          <ul className="space-y-2 text-[#f4f1de]/80 text-[11px]">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home Capsule
              </Link>
            </li>
            <li>
              <Link href="/collection" className="hover:text-white transition">
                All Collections
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition">
                Our Sustainability Story
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Studio & Contact
              </Link>
            </li>
            <li>
              <Link href="/size-guide" className="hover:text-white transition">
                Size Chart & Fit Guide
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Legal & Policies */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold uppercase tracking-wider text-[11px] text-[#ddb892]">
            Legal & Customer Care
          </h4>
          <ul className="space-y-2 text-[#f4f1de]/80 text-[11px]">
            <li>
              <Link href="/privacy-policy" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/return-policy" className="hover:text-white transition">
                Return & Exchange Policy
              </Link>
            </li>
            <li>
              <Link href="/shipping-policy" className="hover:text-white transition">
                Shipping & Delivery Rates
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter Subscription */}
        <div className="space-y-3 md:col-span-1">
          <h4 className="font-serif font-bold uppercase tracking-wider text-[11px] text-[#ddb892]">
            The Natural Journal
          </h4>
          <p className="text-[11px] text-[#ddb892]/80 leading-relaxed">
            Subscribe for early access to new seasonal capsule drops & slow fashion stories.
          </p>

          {subscribed ? (
            <div className="flex items-center gap-2 text-xs text-[#ddb892] bg-[#3f4236] p-3 rounded-xl border border-[#ddb892]/30">
              <CheckCircle2 size={16} />
              <span>Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#3f4236]/80 border border-[#3f4236] focus:border-[#ddb892] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none placeholder:text-[#ddb892]/50 transition"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#ddb892] text-[#2a2c24] hover:bg-white rounded-lg text-xs font-bold transition flex items-center justify-center cursor-pointer"
                  aria-label="Subscribe"
                >
                  <Send size={13} />
                </button>
              </div>
              <span className="text-[9px] text-[#ddb892]/50 block">
                We respect your privacy. Unsubscribe anytime.
              </span>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-6xl mx-auto px-6 mt-12 pt-6 border-t border-[#3f4236] flex flex-col sm:flex-row justify-between items-center text-[10px] text-[#ddb892]/60 gap-3">
        <div>© {new Date().getFullYear()} Duja Brand. All rights reserved.</div>
        <div className="flex space-x-4">
          <span>100% Egyptian Linen</span>
          <span>•</span>
          <span>Zero Fast Fashion</span>
        </div>
      </div>
    </footer>
  );
}
