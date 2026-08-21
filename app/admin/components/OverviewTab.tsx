"use client";

import React, { useState } from "react";
import { useStore, Order, OrderStatus } from "../../context/StoreContext";
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Package,
  Users,
  AlertTriangle,
  ArrowUpRight,
  Plus,
  Tag,
  Clock,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

interface OverviewTabProps {
  isArabic: boolean;
  onNavigateTab: (tab: string) => void;
  onOpenAddProduct: () => void;
  onOpenAddOrder: () => void;
  onOpenAddCoupon: () => void;
  onSelectOrder: (order: Order) => void;
}

export default function OverviewTab({
  isArabic,
  onNavigateTab,
  onOpenAddProduct,
  onOpenAddOrder,
  onOpenAddCoupon,
  onSelectOrder,
}: OverviewTabProps) {
  const { products, orders, customers, coupons, settings } = useStore();
  const [timeframe, setTimeframe] = useState<"week" | "month" | "year">("month");

  // Calculations
  const nonCancelledOrders = orders.filter((o) => o.status !== "Cancelled");
  const totalRevenue = nonCancelledOrders.reduce((sum, o) => sum + o.totalPrice, 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === "Pending").length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / (nonCancelledOrders.length || 1)) : 0;
  const inStockCount = products.filter((p) => p.inStock).length;
  const totalCustomersCount = customers.length;

  // Chart Data (Mock dynamic trend calculation based on store orders)
  const chartData = [
    { label: isArabic ? "السبت" : "Sat", revenue: 4200, orders: 3 },
    { label: isArabic ? "الأحد" : "Sun", revenue: 6800, orders: 5 },
    { label: isArabic ? "الإثنين" : "Mon", revenue: 5100, orders: 4 },
    { label: isArabic ? "الثلاثاء" : "Tue", revenue: 8900, orders: 7 },
    { label: isArabic ? "الأربعاء" : "Wed", revenue: 7400, orders: 6 },
    { label: isArabic ? "الخميس" : "Thu", revenue: 11200, orders: 9 },
    { label: isArabic ? "الجمعة" : "Fri", revenue: 14500, orders: 12 },
  ];

  const maxRevenue = Math.max(...chartData.map((d) => d.revenue));

  // Category Distribution
  const categoryCounts: Record<string, number> = {};
  products.forEach((p) => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  return (
    <div className="space-y-8">
      {/* Top Welcome & Quick Actions Banner */}
      <div className="bg-[#2a2c24] text-[#f4f1de] rounded-3xl p-6 md:p-8 border border-[#3f4236] shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-[#3f4236] px-3.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest text-[#ddb892]">
              <Sparkles size={12} />
              {isArabic ? "لوحة الإدارة والمبيعات الحية" : "Live Executive Portal"}
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-white">
              {isArabic ? "مرحباً بك في إدارة Duja Slow Fashion" : "Welcome to Duja Operations"}
            </h1>
            <p className="text-xs text-[#ddb892]/80 leading-relaxed">
              {isArabic
                ? `المتجر نشط بالكامل. لديك ${pendingOrdersCount} طلبات جديدة قيد المراجعة وإجمالي ${products.length} قطعة في الكتالوج.`
                : `Storefront is live & synced. You have ${pendingOrdersCount} pending orders and ${products.length} garments in stock.`}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={onOpenAddProduct}
              className="bg-[#ddb892] text-[#2a2c24] hover:bg-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus size={15} />
              {isArabic ? "إضافة قطعة جديدة" : "Add Garment"}
            </button>
            <button
              onClick={onOpenAddOrder}
              className="bg-[#3f4236] hover:bg-[#6b705c] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-white/10"
            >
              <ShoppingBag size={15} />
              {isArabic ? "تسجيل طلب يدوي" : "Direct Order"}
            </button>
            <button
              onClick={onOpenAddCoupon}
              className="bg-[#3f4236] hover:bg-[#6b705c] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-white/10"
            >
              <Tag size={15} />
              {isArabic ? "كوبون خصم" : "New Promo"}
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#6b705c]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {/* Total Revenue */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white p-5 rounded-2xl border border-[#e2ded5] shadow-xs space-y-3"
        >
          <div className="flex justify-between items-center text-[#6b705c]">
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {isArabic ? "إجمالي المبيعات" : "Total Revenue"}
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#e2ded5]/40 flex items-center justify-center text-[#2a2c24]">
              <DollarSign size={16} />
            </div>
          </div>
          <div>
            <span className="text-xl md:text-2xl font-serif font-bold text-[#2a2c24]">
              {totalRevenue.toLocaleString()} <span className="text-xs font-sans text-[#6b705c]">{settings.currency}</span>
            </span>
            <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold mt-1">
              <TrendingUp size={12} />
              <span>+18.4% {isArabic ? "هذا الأسبوع" : "this week"}</span>
            </div>
          </div>
        </motion.div>

        {/* Orders Count */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white p-5 rounded-2xl border border-[#e2ded5] shadow-xs space-y-3"
        >
          <div className="flex justify-between items-center text-[#6b705c]">
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {isArabic ? "إجمالي الطلبات" : "Total Orders"}
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#e2ded5]/40 flex items-center justify-center text-[#2a2c24]">
              <ShoppingBag size={16} />
            </div>
          </div>
          <div>
            <span className="text-xl md:text-2xl font-serif font-bold text-[#2a2c24]">
              {totalOrdersCount} <span className="text-xs font-sans text-[#6b705c]">{isArabic ? "طلب" : "orders"}</span>
            </span>
            <div className="flex items-center gap-1 text-[10px] text-amber-700 font-bold mt-1">
              <Clock size={12} />
              <span>{pendingOrdersCount} {isArabic ? "قيد المراجعة" : "pending review"}</span>
            </div>
          </div>
        </motion.div>

        {/* Average Order Value */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white p-5 rounded-2xl border border-[#e2ded5] shadow-xs space-y-3"
        >
          <div className="flex justify-between items-center text-[#6b705c]">
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {isArabic ? "متوسط السلة (AOV)" : "Average Order"}
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#e2ded5]/40 flex items-center justify-center text-[#2a2c24]">
              <TrendingUp size={16} />
            </div>
          </div>
          <div>
            <span className="text-xl md:text-2xl font-serif font-bold text-[#2a2c24]">
              {avgOrderValue.toLocaleString()} <span className="text-xs font-sans text-[#6b705c]">{settings.currency}</span>
            </span>
            <span className="block text-[10px] text-[#6b705c] mt-1">
              {isArabic ? "أعلى من متوسط السوق" : "Healthy cart size"}
            </span>
          </div>
        </motion.div>

        {/* Active Customers */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white p-5 rounded-2xl border border-[#e2ded5] shadow-xs space-y-3"
        >
          <div className="flex justify-between items-center text-[#6b705c]">
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {isArabic ? "قاعدة العملاء" : "Customers"}
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#e2ded5]/40 flex items-center justify-center text-[#2a2c24]">
              <Users size={16} />
            </div>
          </div>
          <div>
            <span className="text-xl md:text-2xl font-serif font-bold text-[#2a2c24]">
              {totalCustomersCount} <span className="text-xs font-sans text-[#6b705c]">{isArabic ? "عميل" : "clients"}</span>
            </span>
            <span className="block text-[10px] text-[#6b705c] mt-1">
              {inStockCount}/{products.length} {isArabic ? "منتج متوفر بالمخزن" : "items in stock"}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Main Analytics & Visual Sales Graph */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Sales Trend Chart */}
        <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-[#e2ded5] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#6b705c]">
                {isArabic ? "أداء المبيعات الأسبوعي" : "Weekly Sales Revenue"}
              </span>
              <h3 className="font-serif font-bold text-lg text-[#2a2c24]">
                {isArabic ? "حركة المبيعات والطلبات" : "Revenue & Order Volume"}
              </h3>
            </div>

            <div className="flex bg-[#f7f5f0] p-1 rounded-xl border border-[#e2ded5] text-xs">
              <button
                onClick={() => setTimeframe("week")}
                className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  timeframe === "week" ? "bg-[#2a2c24] text-white" : "text-[#3f4236]"
                }`}
              >
                {isArabic ? "أسبوع" : "7 Days"}
              </button>
              <button
                onClick={() => setTimeframe("month")}
                className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  timeframe === "month" ? "bg-[#2a2c24] text-white" : "text-[#3f4236]"
                }`}
              >
                {isArabic ? "شهر" : "30 Days"}
              </button>
            </div>
          </div>

          {/* Bar Chart Visual */}
          <div className="h-56 flex items-end justify-between gap-3 pt-6 px-2 border-b border-[#e2ded5]">
            {chartData.map((item, idx) => {
              const heightPercent = Math.round((item.revenue / maxRevenue) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition duration-200 bg-[#2a2c24] text-white text-[10px] py-1 px-2 rounded-lg font-bold pointer-events-none mb-1 whitespace-nowrap shadow-md">
                    {item.revenue} EGP ({item.orders} ord)
                  </div>

                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[38px] bg-[#3f4236] group-hover:bg-[#6b705c] rounded-t-xl transition-all duration-300 relative"
                  >
                    <div className="w-full h-1.5 bg-[#ddb892] rounded-t-xl" />
                  </div>
                  <span className="text-[11px] font-bold text-[#6b705c] group-hover:text-[#2a2c24] transition">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-xs text-[#6b705c] pt-1">
            <span>
              {isArabic ? "ذروة المبيعات: يوم الجمعة (14,500 ج.م)" : "Peak Revenue: Friday (14,500 EGP)"}
            </span>
            <span className="font-bold text-[#2a2c24]">
              {isArabic ? "إجمالي الأسبوع: 58,100 ج.م" : "Week Total: 58,100 EGP"}
            </span>
          </div>
        </div>

        {/* Category Breakdown & Stock Health */}
        <div className="bg-white p-6 rounded-3xl border border-[#e2ded5] shadow-xs space-y-6 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#6b705c]">
              {isArabic ? "توزيع الكتالوج" : "Catalog Distribution"}
            </span>
            <h3 className="font-serif font-bold text-lg text-[#2a2c24]">
              {isArabic ? "التشكيلة حسب الفئة" : "Stock by Category"}
            </h3>
          </div>

          <div className="space-y-3.5">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const percent = Math.round((count / products.length) * 100);
              return (
                <div key={cat} className="space-y-1 text-xs">
                  <div className="flex justify-between font-bold text-[#2a2c24]">
                    <span>{cat}</span>
                    <span className="text-[#6b705c]">{count} ({percent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-[#f7f5f0] rounded-full overflow-hidden border border-[#e2ded5]">
                    <div
                      style={{ width: `${percent}%` }}
                      className="h-full bg-[#6b705c] rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-[#f7f5f0] rounded-2xl border border-[#e2ded5] text-xs space-y-2">
            <div className="flex items-center gap-2 text-[#2a2c24] font-bold">
              <CheckCircle size={15} className="text-emerald-700" />
              <span>{isArabic ? "صحة المخزون ممتازة" : "Inventory Health: Optimal"}</span>
            </div>
            <p className="text-[11px] text-[#6b705c]">
              {isArabic
                ? "لا توجد قطع نفدت بالكامل بدون بدائل متوفرة."
                : "All major capsule lines have healthy size variations."}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders & Featured Staples Table */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Recent Orders Feed */}
        <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-[#e2ded5] shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-[#e2ded5] pb-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#6b705c]">
                {isArabic ? "الطلبات الواردة مؤخراً" : "Recent Orders Feed"}
              </span>
              <h3 className="font-serif font-bold text-lg text-[#2a2c24]">
                {isArabic ? "أحدث طلبات المتجر" : "Latest Purchases"}
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab("orders")}
              className="text-xs font-bold text-[#6b705c] hover:text-[#2a2c24] flex items-center gap-1 cursor-pointer transition"
            >
              {isArabic ? "عرض كل الطلبات" : "View All"} <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="divide-y divide-[#e2ded5] overflow-x-auto">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                onClick={() => onSelectOrder(order)}
                className="py-3.5 flex items-center justify-between gap-4 hover:bg-[#f7f5f0] p-2 rounded-xl transition cursor-pointer"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#2a2c24]">
                      {order.orderNumber}
                    </span>
                    <span className="text-xs text-[#3f4236] font-semibold">
                      • {order.customerName}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#6b705c]">
                    {order.city} • {order.items.length} {isArabic ? "قطع" : "items"}
                  </span>
                </div>

                <div className="text-right flex items-center gap-3">
                  <div>
                    <span className="font-bold text-xs text-[#2a2c24] block">
                      {order.totalPrice} EGP
                    </span>
                    <span className="text-[10px] text-[#6b705c] uppercase">
                      {order.paymentMethod}
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      order.status === "Pending"
                        ? "bg-amber-100 text-amber-800"
                        : order.status === "Processing"
                        ? "bg-stone-200 text-stone-800"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "Delivered"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Selling Products */}
        <div className="bg-white p-6 rounded-3xl border border-[#e2ded5] shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-[#e2ded5] pb-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#6b705c]">
                {isArabic ? "الأعلى مبيعاً" : "Top Staples"}
              </span>
              <h3 className="font-serif font-bold text-lg text-[#2a2c24]">
                {isArabic ? "الأكثر طلباً" : "Popular Items"}
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab("products")}
              className="text-xs font-bold text-[#6b705c] hover:text-[#2a2c24] flex items-center gap-1 cursor-pointer transition"
            >
              {isArabic ? "الكتالوج" : "Catalog"} <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {products.slice(0, 4).map((product, i) => (
              <div key={product.id} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#f6f7f3] border border-[#e2ded5] overflow-hidden shrink-0">
                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xs text-[#2a2c24] line-clamp-1">
                      {product.name}
                    </h4>
                    <span className="text-[10px] text-[#6b705c]">
                      {product.price} EGP • {product.category}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-bold bg-[#e2ded5]/40 text-[#2a2c24] px-2 py-1 rounded-lg shrink-0">
                  #{i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
