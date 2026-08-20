"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavbarActions from "./NavbarActions";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collection", href: "/collection" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-4 z-40 px-4 md:px-8 max-w-5xl mx-auto w-full">
      <div className="bg-[#2a2c24]/90 backdrop-blur-md border border-[#3f4236]/80 rounded-2xl md:rounded-full px-5 py-2.5 shadow-xl flex justify-between items-center transition-all duration-300">
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#ddb892] hover:text-white p-1.5 rounded-lg focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold tracking-widest text-white uppercase flex items-center gap-1 group"
        >
          Duja
          <span className="text-[#ddb892] text-xl leading-none group-hover:scale-125 transition-transform duration-300">
            .
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7 text-[11px] uppercase font-semibold tracking-widest text-[#ddb892]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition duration-200 ${
                  isActive ? "text-white font-bold" : "hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ddb892] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bag & User Actions */}
        <NavbarActions />
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-[#2a2c24]/95 backdrop-blur-md border border-[#3f4236] rounded-2xl p-5 shadow-2xl space-y-4 text-center">
          <nav className="flex flex-col space-y-3 text-xs uppercase font-semibold tracking-widest text-[#ddb892]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`hover:text-white py-1.5 rounded-lg transition ${
                  pathname === link.href ? "bg-[#3f4236] text-white" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
