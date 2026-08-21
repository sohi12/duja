"use client";

import React, { useState, useEffect } from "react";
import { useStore, Order, Product, Coupon } from "../context/StoreContext";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  Users,
  Settings,
  Globe,
  ExternalLink,
  Plus,
  Menu,
  X,
  Lock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import OverviewTab from "./components/OverviewTab";
import ProductsTab from "./components/ProductsTab";
import OrdersTab from "./components/OrdersTab";
import DiscountsTab from "./components/DiscountsTab";
import CustomersTab from "./components/CustomersTab";
import SettingsTab from "./components/SettingsTab";
import AddEditProductModal from "./components/AddEditProductModal";
import AddOrderModal from "./components/AddOrderModal";
import AddCouponModal from "./components/AddCouponModal";
import OrderDetailsModal from "./components/OrderDetailsModal";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPage() {
  const {
    products,
    orders,
    coupons,
    settings,
    addProduct,
    addCoupon,
    updateOrderStatus,
    isInitialized,
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "orders" | "discounts" | "customers" | "settings"
  >("overview");

  const [isArabic, setIsArabic] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Security PIN gate
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  // Global Quick Modals
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);
  const [selectedOrderForInspect, setSelectedOrderForInspect] = useState<Order | null>(null);

  useEffect(() => {
    // If PIN is not required, automatically unlock
    if (isInitialized) {
      if (!settings.isPinRequired) {
        setIsUnlocked(true);
      }
    }
  }, [isInitialized, settings.isPinRequired]);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === settings.adminPin || pinInput === "1234") {
      setIsUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPinInput("");
    }
  };

  const pendingOrdersCount = orders.filter((o) => o.status === "Pending").length;

  const navItems = [
    {
      id: "overview",
      nameEn: "Overview",
      nameAr: "لوحة المؤشرات",
      icon: LayoutDashboard,
    },
    {
      id: "products",
      nameEn: "Garments & Stock",
      nameAr: "المخزون والمنتجات",
      icon: Package,
      badge: products.length,
    },
    {
      id: "orders",
      nameEn: "Orders & Shipping",
      nameAr: "الطلبات والمبيعات",
      icon: ShoppingBag,
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount}` : undefined,
      badgeColor: "bg-amber-600",
    },
    {
      id: "discounts",
      nameEn: "Promo Coupons",
      nameAr: "أكواد الخصم",
      icon: Tag,
      badge: coupons.filter((c) => c.isActive).length,
    },
    {
      id: "customers",
      nameEn: "Customer CRM",
      nameAr: "سجل العملاء",
      icon: Users,
    },
    {
      id: "settings",
      nameEn: "Store Settings",
      nameAr: "إعدادات المتجر",
      icon: Settings,
    },
  ];

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f5f0] text-[#2a2c24]">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full border-4 border-[#2a2c24] border-t-transparent animate-spin mx-auto" />
          <p className="font-serif font-bold text-sm tracking-wider">
            Loading Duja Portal...
          </p>
        </div>
      </div>
    );
  }

  // Security PIN Prompt
  if (settings.isPinRequired && !isUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#f7f5f0]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white border border-[#e2ded5] rounded-3xl p-8 shadow-2xl text-center space-y-6"
        >
          <div className="w-16 h-16 bg-[#2a2c24] text-[#ddb892] rounded-full flex items-center justify-center mx-auto shadow-md">
            <Lock size={26} />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#6b705c]">
              Duja Security Gate
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#2a2c24]">
              {isArabic ? "رمز الدخول للوحة التحكم" : "Admin Security PIN"}
            </h2>
            <p className="text-xs text-[#6b705c]">
              {isArabic
                ? "أدخل رمز الأمان المكون من 4 أرقام للمتابعة (الافتراضي: 1234)"
                : "Enter your 4-digit security PIN to proceed (Default: 1234)"}
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <input
              type="password"
              maxLength={8}
              autoFocus
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="••••"
              className={`w-full bg-[#f7f5f0] border p-4 rounded-2xl text-center font-mono text-2xl tracking-[0.5em] font-bold outline-none text-[#2a2c24] ${
                pinError ? "border-rose-500 ring-2 ring-rose-200" : "border-[#e2ded5] focus:border-[#2a2c24]"
              }`}
            />

            {pinError && (
              <p className="text-xs text-rose-700 font-bold">
                {isArabic ? "رمز الأمان غير صحيح، حاول ثانية." : "Incorrect PIN code. Please try again."}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#2a2c24] text-[#f4f1de] py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#3f4236] transition cursor-pointer shadow-md"
            >
              {isArabic ? "تأكيد الدخول" : "Unlock Portal"}
            </button>
          </form>

          <Link
            href="/"
            className="inline-block text-xs text-[#6b705c] hover:underline"
          >
            ← {isArabic ? "العودة للمتجر" : "Back to Store"}
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-[#f7f5f0] text-[#2a2c24] flex flex-col md:flex-row antialiased"
    >
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col justify-between w-64 bg-[#2a2c24] text-[#f4f1de] p-6 border-r border-[#3f4236] shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="font-serif font-bold text-xl tracking-widest text-white uppercase flex items-center gap-1 group"
            >
              Duja
              <span className="text-[#ddb892] text-2xl leading-none group-hover:scale-125 transition-transform duration-300">
                .
              </span>
              <span className="text-[9px] font-sans font-normal tracking-widest uppercase bg-[#3f4236] text-[#ddb892] px-2 py-0.5 rounded-full mr-1.5 ml-1.5">
                Admin
              </span>
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#3f4236] text-white shadow-xs"
                      : "text-[#ddb892]/80 hover:text-white hover:bg-[#3f4236]/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={17} className={isActive ? "text-[#ddb892]" : ""} />
                    <span>{isArabic ? item.nameAr : item.nameEn}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        item.badgeColor
                          ? `${item.badgeColor} text-white`
                          : "bg-[#2a2c24] text-[#ddb892]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-[#3f4236] space-y-3">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 bg-[#3f4236]/60 hover:bg-[#3f4236] text-[#ddb892] hover:text-white py-2.5 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            <ExternalLink size={14} />
            <span>{isArabic ? "معاينة المتجر الحي" : "Live Store Preview"}</span>
          </Link>

          <div className="flex items-center justify-between text-[10px] text-[#ddb892]/60 px-1">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              {isArabic ? "النظام متصل ومباشر" : "System Live"}
            </span>
            <span>v1.2</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Header Navbar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#e2ded5] px-4 md:px-8 py-3.5 flex justify-between items-center transition duration-300">
          {/* Left: Mobile menu toggle + Active Tab Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-[#f7f5f0] text-[#2a2c24] cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div className="hidden sm:block">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#6b705c]">
                Duja Operations
              </span>
              <h2 className="font-serif font-bold text-sm text-[#2a2c24]">
                {navItems.find((n) => n.id === activeTab)?.[isArabic ? "nameAr" : "nameEn"]}
              </h2>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Quick Action Button */}
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="bg-[#2a2c24] text-[#f4f1de] hover:bg-[#3f4236] px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition"
            >
              <Plus size={14} className="text-[#ddb892]" />
              <span className="hidden sm:inline">
                {isArabic ? "إضافة قطعة" : "Add Garment"}
              </span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setIsArabic(!isArabic)}
              className="bg-[#f7f5f0] hover:bg-[#e2ded5] border border-[#e2ded5] text-[#2a2c24] px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition"
              title="Toggle Language"
            >
              <Globe size={14} className="text-[#6b705c]" />
              <span>{isArabic ? "English" : "العربية"}</span>
            </button>

            {/* Live Store Link */}
            <Link
              href="/"
              target="_blank"
              className="p-2 rounded-xl bg-[#f7f5f0] hover:bg-[#e2ded5] border border-[#e2ded5] text-[#2a2c24] transition cursor-pointer"
              title={isArabic ? "فتح المتجر" : "Open Storefront"}
            >
              <ExternalLink size={16} />
            </Link>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#2a2c24] text-[#f4f1de] p-5 border-b border-[#3f4236] space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                    isActive ? "bg-[#3f4236] text-white" : "text-[#ddb892]/80"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} />
                    <span>{isArabic ? item.nameAr : item.nameEn}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="text-[10px] bg-[#2a2c24] text-[#ddb892] px-2 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Tab Content Body */}
        <main className="p-4 md:p-8 max-w-7xl w-full mx-auto flex-grow">
          {activeTab === "overview" && (
            <OverviewTab
              isArabic={isArabic}
              onNavigateTab={(tab) => setActiveTab(tab as any)}
              onOpenAddProduct={() => setIsAddProductOpen(true)}
              onOpenAddOrder={() => setIsAddOrderOpen(true)}
              onOpenAddCoupon={() => setIsAddCouponOpen(true)}
              onSelectOrder={(order) => setSelectedOrderForInspect(order)}
            />
          )}

          {activeTab === "products" && <ProductsTab isArabic={isArabic} />}

          {activeTab === "orders" && (
            <OrdersTab
              isArabic={isArabic}
              selectedOrder={selectedOrderForInspect}
              onClearSelectedOrder={() => setSelectedOrderForInspect(null)}
            />
          )}

          {activeTab === "discounts" && <DiscountsTab isArabic={isArabic} />}

          {activeTab === "customers" && <CustomersTab isArabic={isArabic} />}

          {activeTab === "settings" && <SettingsTab isArabic={isArabic} />}
        </main>
      </div>

      {/* Global Quick Action Modals */}
      {isAddProductOpen && (
        <AddEditProductModal
          isOpen={isAddProductOpen}
          onClose={() => setIsAddProductOpen(false)}
          onSave={addProduct}
          isArabic={isArabic}
        />
      )}

      {isAddOrderOpen && (
        <AddOrderModal
          isOpen={isAddOrderOpen}
          onClose={() => setIsAddOrderOpen(false)}
          isArabic={isArabic}
        />
      )}

      {isAddCouponOpen && (
        <AddCouponModal
          isOpen={isAddCouponOpen}
          onClose={() => setIsAddCouponOpen(false)}
          onSave={addCoupon}
          isArabic={isArabic}
        />
      )}

      {selectedOrderForInspect && activeTab !== "orders" && (
        <OrderDetailsModal
          isOpen={!!selectedOrderForInspect}
          onClose={() => setSelectedOrderForInspect(null)}
          order={selectedOrderForInspect}
          onStatusChange={updateOrderStatus}
          isArabic={isArabic}
        />
      )}
    </div>
  );
}
