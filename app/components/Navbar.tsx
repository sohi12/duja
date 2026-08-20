"use client";

import React, { useState } from "react";
import Link from "next/link";
import NavbarActions from "./NavbarActions";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-4 z-40 px-4 md:px-8 max-w-5xl mx-auto w-full">
      <div className="bg-[#2a2c24]/95 backdrop-blur-md border border-[#3f4236] rounded-2xl md:rounded-full px-5 py-2.5 shadow-lg flex justify-between items-center transition-all duration-300">
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#ddb892] hover:text-white p-1 cursor-pointer"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold tracking-widest text-white uppercase flex items-center gap-1"
        >
          Duja<span className="text-[#ddb892] text-xl leading-none">.</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7 text-[11px] uppercase font-semibold tracking-widest text-[#ddb892]">
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
        </nav>

        {/* Bag Button */}
        <NavbarActions />
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-[#2a2c24] border border-[#3f4236] rounded-2xl p-5 shadow-xl space-y-4 text-center">
          <nav className="flex flex-col space-y-3 text-xs uppercase font-semibold tracking-widest text-[#ddb892]">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="hover:text-white py-1"
            >
              Home
            </Link>
            <Link
              href="/collection"
              onClick={() => setIsOpen(false)}
              className="hover:text-white py-1"
            >
              Collection
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="hover:text-white py-1"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="hover:text-white py-1"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
