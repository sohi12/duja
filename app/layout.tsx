import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
      <body className="bg-[#f7f5f0] text-[#2a2c24] font-sans antialiased min-h-screen flex flex-col justify-between">
        <CartProvider>
          {/* Top Full-Width Clean Navbar */}
          <Navbar />

          <CartDrawer />

          {/* Dynamic Page Contents */}
          <main className="flex-grow">{children}</main>

          {/* Bottom Full-Width Clean Footer */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
