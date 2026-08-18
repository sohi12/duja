import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";
import NavbarActions from "./components/NavbarActions";

export const metadata: Metadata = {
  title: "Duja | Minimalist Naturals",
  description: "Earthy tones, natural aesthetics, and timeless fashion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#fcfbf9] text-[#2a2c24] font-sans antialiased min-h-screen flex flex-col justify-between">
        <CartProvider>
          {/* Header / Navbar */}
          <header className="sticky top-0 z-40 bg-[#fcfbf9]/90 backdrop-blur-md border-b border-[#e8ebe0]">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
              <Link
                href="/"
                className="text-2xl font-bold tracking-widest text-[#3f4236] uppercase"
              >
                Duja<span className="text-[#6b705c]">.</span>
              </Link>

              <nav className="hidden md:flex space-x-8 text-sm font-medium text-[#3f4236]">
                <Link href="/" className="hover:text-[#6b705c] transition">
                  Home
                </Link>
                <Link
                  href="/collection"
                  className="hover:text-[#6b705c] transition"
                >
                  Collection
                </Link>
                <Link href="/about" className="hover:text-[#6b705c] transition">
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="hover:text-[#6b705c] transition"
                >
                  Contact
                </Link>
              </nav>

              <NavbarActions />
            </div>
          </header>

          <CartDrawer />

          {/* Dynamic Page Contents */}
          <main className="flex-grow">{children}</main>

          {/* Footer */}
          <footer className="bg-[#2a2c24] text-[#f4f1de] py-12 border-t border-[#3f4236] mt-20">
            <div className="max-w-6xl mx-auto px-6 text-center text-xs text-[#ddb892]">
              © {new Date().getFullYear()} Duja Brand. All rights reserved.
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
