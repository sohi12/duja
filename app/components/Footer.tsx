import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#2a2c24] border-t border-[#3f4236] text-[#f4f1de] py-6 mt-16 w-full">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#ddb892]">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <span className="font-serif font-bold text-sm tracking-widest text-white uppercase flex items-center gap-1">
            Duja<span className="text-[#ddb892] text-xl leading-none">.</span>
          </span>
          <span className="text-[10px] text-[#ddb892]/60 hidden sm:inline">
            | Minimalist Naturals
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-[11px] font-semibold tracking-wider">
          <Link href="/" className="hover:text-white transition duration-200">
            Home
          </Link>
          <Link
            href="/collection"
            className="hover:text-white transition duration-200"
          >
            Collection
          </Link>
          <Link
            href="/about"
            className="hover:text-white transition duration-200"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="hover:text-white transition duration-200"
          >
            Contact
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-[10px] text-[#ddb892]/60">
          © {new Date().getFullYear()} Duja Brand. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
