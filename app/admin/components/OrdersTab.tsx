"use client";

import React, { useState, useMemo } from "react";
import { useStore, Order, OrderStatus } from "../../context/StoreContext";
import {
  Search,
  Plus,
  Phone,
  Send,
  Eye,
  Trash2,
  CreditCard,
  Banknote,
  Clock,
  CheckCircle,
  Package,
  MapPin,
  X,
  Filter,
} from "lucide-react";
import OrderDetailsModal from "./OrderDetailsModal";
import AddOrderModal from "./AddOrderModal";

interface OrdersTabProps {
  isArabic: boolean;
  selectedOrder?: Order | null;
  onClearSelectedOrder?: () => void;
}

const STATUSES: { id: string; labelEn: string; labelAr: string }[] = [
  { id: "All", labelEn: "All Orders", labelAr: "كل الطلبات" },
  { id: "Pending", labelEn: "Pending", labelAr: "قيد المراجعة" },
  { id: "Processing", labelEn: "Processing", labelAr: "جاري التجهيز" },
  { id: "Shipped", labelEn: "Shipped", labelAr: "تم الشحن" },
  { id: "Delivered", labelEn: "Delivered", labelAr: "تم التسليم" },
  { id: "Cancelled", labelEn: "Cancelled", labelAr: "ملغي" },
];

export default function OrdersTab({
  isArabic,
  selectedOrder: externalSelectedOrder,
  onClearSelectedOrder,
}: OrdersTabProps) {
  const { orders, updateOrderStatus, deleteOrder } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState<"all" | "cod" | "instapay">("all");

  const [inspectOrder, setInspectOrder] = useState<Order | null>(
    externalSelectedOrder || null
  );
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState<Order | null>(null);

  // Sync external selected order if provided
  React.useEffect(() => {
    if (externalSelectedOrder) {
      setInspectOrder(externalSelectedOrder);
    }
  }, [externalSelectedOrder]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerPhone.includes(searchQuery) ||
        order.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = selectedStatus === "All" || order.status === selectedStatus;

      const matchesPayment =
        paymentFilter === "all" || order.paymentMethod === paymentFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [orders, searchQuery, selectedStatus, paymentFilter]);

  const filteredRevenue = filteredOrders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const handleQuickStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    if (inspectOrder && inspectOrder.id === orderId) {
      setInspectOrder({ ...inspectOrder, status: newStatus });
    }
  };

  const handleQuickWhatsApp = (order: Order) => {
    const cleanPhone = order.customerPhone.replace(/[^0-9]/g, "");
    const formatted = cleanPhone.startsWith("20")
      ? cleanPhone
      : cleanPhone.startsWith("0")
      ? `20${cleanPhone.slice(1)}`
      : `20${cleanPhone}`;

    const msg = isArabic
      ? `مرحباً ${order.customerName} 🌿\nبخصوص طلبك رقم *${order.orderNumber}* بقيمة *${order.totalPrice} ج.م* من Duja:\nطلبك الآن في حالة: *${order.status}*.\nنشكرك لاختيارك Duja Slow Fashion!`
      : `Hello ${order.customerName} 🌿\nRegarding your Duja order *${order.orderNumber}* (${order.totalPrice} EGP):\nCurrent status is *${order.status}*.\nThank you for choosing Duja!`;

    window.open(`https://wa.me/${formatted}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#e2ded5] shadow-xs">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#6b705c]">
            {isArabic ? "إدارة الطلبات والشحن" : "Order Fulfillment & Logistics"}
          </span>
          <h2 className="text-2xl font-serif font-bold text-[#2a2c24]">
            {isArabic ? "طلبات الزبائن والمبيعات" : "Customer Orders"}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddOrderOpen(true)}
            className="bg-[#2a2c24] text-[#f4f1de] hover:bg-[#3f4236] px-5 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Plus size={16} className="text-[#ddb892]" />
            {isArabic ? "إنشاء طلب يدوي" : "Direct / Manual Order"}
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-[#e2ded5] shadow-xs space-y-4">
        <div className="grid md:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="md:col-span-6 relative">
            <Search size={16} className="absolute left-3.5 top-3.5 text-[#6b705c]" />
            <input
              type="text"
              placeholder={isArabic ? "ابحث برقم الطلب، اسم العميل، الهاتف، المدينة..." : "Search by order #, name, phone, city..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#f7f5f0] border border-[#e2ded5] focus:border-[#2a2c24] pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none text-[#2a2c24]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3 text-[#6b705c] hover:text-[#2a2c24]"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Payment Method filter */}
          <div className="md:col-span-6 flex bg-[#f7f5f0] p-1 rounded-xl border border-[#e2ded5] text-xs">
            <button
              onClick={() => setPaymentFilter("all")}
              className={`flex-1 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                paymentFilter === "all" ? "bg-[#2a2c24] text-white" : "text-[#3f4236]"
              }`}
            >
              {isArabic ? "كل طرق الدفع" : "All Payment"}
            </button>
            <button
              onClick={() => setPaymentFilter("instapay")}
              className={`flex-1 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center justify-center gap-1 ${
                paymentFilter === "instapay" ? "bg-[#2a2c24] text-white" : "text-[#3f4236]"
              }`}
            >
              <CreditCard size={13} /> InstaPay
            </button>
            <button
              onClick={() => setPaymentFilter("cod")}
              className={`flex-1 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center justify-center gap-1 ${
                paymentFilter === "cod" ? "bg-[#2a2c24] text-white" : "text-[#3f4236]"
              }`}
            >
              <Banknote size={13} /> COD (كاش)
            </button>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-[#e2ded5]">
          {STATUSES.map((st) => {
            const isSelected = selectedStatus === st.id;
            const count =
              st.id === "All"
                ? orders.length
                : orders.filter((o) => o.status === st.id).length;

            return (
              <button
                key={st.id}
                onClick={() => setSelectedStatus(st.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#2a2c24] text-[#ddb892] shadow-xs"
                    : "bg-[#f7f5f0] text-[#3f4236] hover:bg-[#e2ded5]"
                }`}
              >
                <span>{isArabic ? st.labelAr : st.labelEn}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-[#3f4236] text-white" : "bg-[#e2ded5] text-[#2a2c24]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-[#e2ded5] shadow-xs overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <Package size={40} className="mx-auto text-[#6b705c]" />
            <h3 className="font-serif font-bold text-lg text-[#2a2c24]">
              {isArabic ? "لا توجد طلبات تطابق هذا التصنيف" : "No orders found"}
            </h3>
            <p className="text-xs text-[#6b705c]">
              {isArabic ? "اختر تصنيفاً آخر أو قم بإنشاء طلب جديد" : "Select another status or create a new order."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-[#f7f5f0] text-[#6b705c] uppercase text-[10px] tracking-wider border-b border-[#e2ded5]">
                <tr>
                  <th className="py-3.5 px-4 font-bold">{isArabic ? "رقم الطلب والتاريخ" : "Order & Date"}</th>
                  <th className="py-3.5 px-4 font-bold">{isArabic ? "العميل والموقع" : "Customer & City"}</th>
                  <th className="py-3.5 px-4 font-bold">{isArabic ? "القطع" : "Items"}</th>
                  <th className="py-3.5 px-4 font-bold">{isArabic ? "الإجمالي" : "Total (EGP)"}</th>
                  <th className="py-3.5 px-4 font-bold">{isArabic ? "الدفع" : "Payment"}</th>
                  <th className="py-3.5 px-4 font-bold">{isArabic ? "حالة الطلب" : "Status"}</th>
                  <th className="py-3.5 px-4 font-bold text-right">{isArabic ? "إجراءات" : "Actions"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2ded5]">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#f7f5f0]/60 transition">
                    {/* Order ID & Date */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <button
                          onClick={() => setInspectOrder(order)}
                          className="font-mono font-bold text-xs text-[#2a2c24] hover:text-[#6b705c] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          {order.orderNumber}
                        </button>
                        <span className="text-[10px] text-[#6b705c] block">
                          {new Date(order.createdAt).toLocaleDateString(
                            isArabic ? "ar-EG" : "en-US",
                            { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }
                          )}
                        </span>
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <span className="font-serif font-bold text-xs text-[#2a2c24] block">
                          {order.customerName}
                        </span>
                        <span className="text-[11px] text-[#6b705c] flex items-center gap-1">
                          <MapPin size={11} /> {order.city}
                        </span>
                      </div>
                    </td>

                    {/* Items badge */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <span className="font-bold text-[11px] text-[#2a2c24]">
                          {order.items.reduce((acc, i) => acc + i.quantity, 0)} {isArabic ? "قطع" : "pcs"}
                        </span>
                        <div className="text-[10px] text-[#6b705c] line-clamp-1">
                          {order.items.map((i) => i.name).join(", ")}
                        </div>
                      </div>
                    </td>

                    {/* Total Price */}
                    <td className="py-3.5 px-4 font-mono font-bold text-xs text-[#2a2c24]">
                      {order.totalPrice} EGP
                    </td>

                    {/* Payment Method */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-bold text-[10px] uppercase tracking-wider text-[#3f4236]">
                        {order.paymentMethod === "instapay" ? (
                          <>
                            <CreditCard size={12} className="text-purple-700" /> InstaPay
                          </>
                        ) : (
                          <>
                            <Banknote size={12} className="text-amber-700" /> COD
                          </>
                        )}
                      </span>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleQuickStatusChange(order.id, e.target.value as OrderStatus)
                        }
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border outline-none cursor-pointer ${
                          order.status === "Pending"
                            ? "bg-amber-50 text-amber-900 border-amber-300"
                            : order.status === "Processing"
                            ? "bg-stone-100 text-stone-900 border-stone-300"
                            : order.status === "Shipped"
                            ? "bg-blue-50 text-blue-900 border-blue-300"
                            : order.status === "Delivered"
                            ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                            : "bg-rose-50 text-rose-900 border-rose-300"
                        }`}
                      >
                        <option value="Pending">{isArabic ? "قيد المراجعة" : "Pending"}</option>
                        <option value="Processing">{isArabic ? "جاري التجهيز" : "Processing"}</option>
                        <option value="Shipped">{isArabic ? "تم الشحن" : "Shipped"}</option>
                        <option value="Delivered">{isArabic ? "تم التسليم" : "Delivered"}</option>
                        <option value="Cancelled">{isArabic ? "ملغي" : "Cancelled"}</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleQuickWhatsApp(order)}
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 transition cursor-pointer"
                          title={isArabic ? "مراسلة العميل واتساب" : "WhatsApp Customer"}
                        >
                          <Send size={13} />
                        </button>
                        <button
                          onClick={() => setInspectOrder(order)}
                          className="p-1.5 rounded-lg bg-[#e2ded5]/40 hover:bg-[#2a2c24] hover:text-white text-[#3f4236] transition cursor-pointer"
                          title={isArabic ? "معاينة الفاتورة والتفاصيل" : "Inspect Order"}
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          onClick={() => setDeleteCandidate(order)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 transition cursor-pointer"
                          title={isArabic ? "حذف الطلب" : "Delete Order"}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {inspectOrder && (
        <OrderDetailsModal
          isOpen={!!inspectOrder}
          onClose={() => {
            setInspectOrder(null);
            if (onClearSelectedOrder) onClearSelectedOrder();
          }}
          order={inspectOrder}
          onStatusChange={handleQuickStatusChange}
          isArabic={isArabic}
        />
      )}

      {/* Add Manual Order Modal */}
      {isAddOrderOpen && (
        <AddOrderModal
          isOpen={isAddOrderOpen}
          onClose={() => setIsAddOrderOpen(false)}
          isArabic={isArabic}
        />
      )}

      {/* Delete Confirmation */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setDeleteCandidate(null)}
            className="fixed inset-0 bg-[#2a2c24]/70 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-sm bg-[#f7f5f0] border border-[#e2ded5] rounded-3xl p-6 shadow-2xl z-10 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <Trash2 size={22} />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2a2c24]">
              {isArabic ? "حذف سجل الطلب" : "Delete Order Record?"}
            </h3>
            <p className="text-xs text-[#6b705c] leading-relaxed">
              {isArabic
                ? `هل أنت متأكد من حذف الطلب رقم "${deleteCandidate.orderNumber}"؟`
                : `Are you sure you want to remove order "${deleteCandidate.orderNumber}" from system?`}
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeleteCandidate(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#e2ded5] font-bold text-xs text-[#3f4236] hover:bg-[#e2ded5]/40 transition cursor-pointer"
              >
                {isArabic ? "إلغاء" : "Cancel"}
              </button>
              <button
                onClick={() => {
                  deleteOrder(deleteCandidate.id);
                  setDeleteCandidate(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 font-bold text-xs text-white transition cursor-pointer shadow-md"
              >
                {isArabic ? "تأكيد الحذف" : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
