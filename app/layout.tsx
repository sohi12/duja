import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";
import AuthModal from "./components/AuthModal";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Duja | Sustainable Minimalist Fashion",
  description: "Earthy tones, natural aesthetics, and timeless linen fashion handcrafted in Egypt.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f7f5f0] text-[#2a2c24] font-sans antialiased min-h-screen flex flex-col justify-between selection:bg-[#6b705c] selection:text-white">
        <CartProvider>
          {/* Sticky Glassmorphic Navbar */}
          <Navbar />

          {/* Slide-out Cart Drawer */}
          <CartDrawer />

          {/* Minimalist Auth Modal */}
          <AuthModal />

          {/* Dynamic Page Contents */}
          <main className="flex-grow">{children}</main>

          {/* Global Footer with Newsletter & Legal links */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
