import React from "react";
import {
  ShoppingBag,
  ArrowUpRight,
  Leaf,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export default function Home() {
  return (
    <div className="bg-[#fcfbf9] text-[#2a2c24] min-h-screen font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fcfbf9]/90 backdrop-blur-sm border-b border-[#e8ebe0] px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-widest text-[#3f4236] uppercase">
          Duja<span className="text-[#6b705c]">.</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-[#3f4236]">
          <a href="#hero" className="hover:text-[#6b705c] transition">
            Home
          </a>
          <a href="#about" className="hover:text-[#6b705c] transition">
            About
          </a>
          <a href="#services" className="hover:text-[#6b705c] transition">
            Services
          </a>
          <a href="#collection" className="hover:text-[#6b705c] transition">
            Collection
          </a>
        </div>
        <button className="bg-[#3f4236] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#6b705c] transition flex items-center gap-2">
          <ShoppingBag size={16} /> Shop Now
        </button>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 min-h-[85vh]"
      >
        <div className="flex-1 space-y-6 text-left">
          <span className="inline-block bg-[#e8ebe0] text-[#3f4236] px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
            Naturals Collection
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#2a2c24] leading-tight">
            Embrace Nature <br /> in Every Detail with{" "}
            <span className="text-[#6b705c]">Duja</span>
          </h1>
          <p className="text-[#3f4236]/80 text-lg max-w-lg leading-relaxed">
            Thoughtfully crafted pieces designed for simple elegance. Earthy
            tones, premium quality, and a touch of nature.
          </p>
          <div className="flex gap-4 pt-4">
            <a
              href="#collection"
              className="bg-[#3f4236] text-white px-7 py-3 rounded-full font-medium hover:bg-[#6b705c] transition flex items-center gap-2"
            >
              Explore Collection <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        <div className="flex-1 w-full flex justify-center">
          <div className="w-80 h-96 md:w-96 md:h-[450px] bg-[#e8ebe0] rounded-2xl overflow-hidden shadow-xs border-4 border-white flex items-center justify-center text-[#3f4236] font-medium">
            [ Hero Image Here ]
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-[#f4f1de]/30 border-y border-[#e8ebe0]"
      >
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <Leaf className="mx-auto text-[#6b705c]" size={32} />
          <h2 className="text-3xl font-serif font-bold text-[#2a2c24]">
            About Duja
          </h2>
          <p className="text-[#3f4236]/80 leading-relaxed text-lg max-w-2xl mx-auto">
            Born from a passion for simplicity and natural aesthetics. We
            believe elegance need complexity—it lies in pure materials, calm
            palettes, and timeless craft.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-[#2a2c24]">
            Why Choose Us
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl border border-[#e8ebe0] text-center space-y-3">
            <Leaf className="mx-auto text-[#6b705c]" size={28} />
            <h3 className="font-bold text-[#2a2c24]">Organic Materials</h3>
            <p className="text-sm text-[#3f4236]/70">
              We carefully source sustainable and soft fabrics for everyday
              comfort.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-[#e8ebe0] text-center space-y-3">
            <Sparkles className="mx-auto text-[#6b705c]" size={28} />
            <h3 className="font-bold text-[#2a2c24]">Minimalist Design</h3>
            <p className="text-sm text-[#3f4236]/70">
              Every piece is curated to complement a clean and sophisticated
              lifestyle.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl border border-[#e8ebe0] text-center space-y-3">
            <ShieldCheck className="mx-auto text-[#6b705c]" size={28} />
            <h3 className="font-bold text-[#2a2c24]">Premium Quality</h3>
            <p className="text-sm text-[#3f4236]/70">
              Meticulous attention to detail ensures a seamless and lasting
              experience.
            </p>
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section
        id="collection"
        className="py-20 px-6 max-w-6xl mx-auto border-t border-[#e8ebe0]"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-[#2a2c24]">
            The New Collection
          </h2>
          <p className="text-[#3f4236]/70 mt-2">
            Discover our signature Naturals series
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl border border-[#e8ebe0] overflow-hidden group"
            >
              <div className="h-64 bg-[#f6f7f3] flex items-center justify-center text-[#3f4236]/50 group-hover:bg-[#e8ebe0] transition">
                [ Product Image {item} ]
              </div>
              <div className="p-5 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-[#2a2c24]">
                    Duja Essential #{item}
                  </h3>
                  <span className="text-sm text-[#6b705c] font-semibold">
                    EGP 450
                  </span>
                </div>
                <button className="p-2 bg-[#3f4236] text-white rounded-full hover:bg-[#6b705c] transition">
                  <ShoppingBag size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
