"use client";

import React, { useState } from "react";
import { Order, OrderStatus } from "../../context/StoreContext";
import {
  X,
  Phone,
  MapPin,
  Clock,
  Send,
  CreditCard,
  Banknote,
  CheckCircle,
  Truck,
  Package,
  Check,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
  isArabic?: boolean;
}

const STATUS_OPTIONS: OrderStatus[] = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function OrderDetailsModal({
  isOpen,
  onClose,
  order,
  onStatusChange,
  isArabic = false,
}: OrderDetailsModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(
    order?.status || "Pending"
  );
  const [copied, setCopied] = useState(false);

  if (!isOpen || !order) return null;

  const handleStatusUpdate = (status: OrderStatus) => {
    setSelectedStatus(status);
    onStatusChange(order.id, status);
  };

  const cleanPhone = order.customerPhone.replace(/[^0-9]/g, "");
  const formattedWhatsAppPhone = cleanPhone.startsWith("20")
    ? cleanPhone
    : cleanPhone.startsWith("0")
    ? `20${cleanPhone.slice(1)}`
    : `20${cleanPhone}`;

  // WhatsApp Message Generator
  const getWhatsAppMessage = () => {
    if (isArabic) {
      return `مرحباً ${order.customerName} 🌿\nبخصوص طلبك رقم *${order.orderNumber}* من براند *Duja*:\n\nحالة طلبك الحالية: *${
        selectedStatus === "Pending"
          ? "قيد المراجعة"
          : selectedStatus === "Processing"
          ? "جاري التجهيز والتفصيل"
          : selectedStatus === "Shipped"
          ? "تم الشحن ومع مندوب التوصيل"
          : selectedStatus === "Delivered"
          ? "تم التسليم بنجاح"
          : "تم الإلغاء"
      }*\n\nإجمالي الطلب: *${order.totalPrice} ج.م*\nطريقة الدفع: *${
        order.paymentMethod === "instapay" ? "InstaPay" : "الدفع عند الاستلام"
      }*\n\nشكراً لاختيارك Duja! إذا كان لديك أي استفسار يسعدنا تواصلك.`;
    }
    return `Hello ${order.customerName} 🌿\nRegarding your Duja order *${order.orderNumber}*:\n\nCurrent Status: *${selectedStatus}*\nTotal Amount: *${order.totalPrice} EGP*\nPayment: *${
      order.paymentMethod === "instapay" ? "InstaPay" : "Cash on Delivery"
    }*\n\nThank you for choosing Duja Slow Fashion!`;
  };

  const handleSendWhatsApp = () => {
    const msg = getWhatsAppMessage();
    window.open(
      `https://wa.me/${formattedWhatsAppPhone}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  const copyOrderDetails = () => {
    const text = `Order: ${order.orderNumber}\nCustomer: ${order.customerName} (${order.customerPhone})\nAddress: ${order.address}, ${order.city}\nTotal: ${order.totalPrice} EGP\nItems:\n${order.items.map((i) => `- ${i.name} (${i.size}) x${i.quantity} = ${i.price * i.quantity} EGP`).join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#2a2c24]/70 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`relative w-full max-w-2xl bg-[#f7f5f0] border border-[#e2ded5] rounded-3xl p-6 md:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto my-8 ${
            isArabic ? "text-right" : "text-left"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#e2ded5] pb-4 mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs bg-[#2a2c24] text-[#ddb892] px-3 py-1 rounded-full">
                  {order.orderNumber}
                </span>
                <span className="text-[10px] text-[#6b705c] flex items-center gap-1">
                  <Clock size={12} />
                  {new Date(order.createdAt).toLocaleString(
                    isArabic ? "ar-EG" : "en-US",
                    { dateStyle: "medium", timeStyle: "short" }
                  )}
                </span>
              </div>
              <h2 className="text-xl font-serif font-bold text-[#2a2c24]">
                {isArabic ? "تفاصيل الطلب والفاتورة" : "Order & Invoice Details"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#e2ded5]/40 text-[#3f4236] hover:bg-[#e2ded5] transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-6 text-xs">
            {/* Status Switcher & WhatsApp Trigger */}
            <div className="p-4 bg-white rounded-2xl border border-[#e2ded5] space-y-3">
              <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px] block">
                {isArabic ? "تحديث حالة الطلب" : "Update Order Status"}
              </label>
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((st) => {
                  const isActive = order.status === st;
                  let colorClass = "bg-white border-[#e2ded5] text-[#3f4236]";
                  if (isActive) {
                    if (st === "Pending") colorClass = "bg-amber-600 text-white border-amber-600 shadow-xs";
                    if (st === "Processing") colorClass = "bg-[#3f4236] text-white border-[#3f4236] shadow-xs";
                    if (st === "Shipped") colorClass = "bg-[#6b705c] text-white border-[#6b705c] shadow-xs";
                    if (st === "Delivered") colorClass = "bg-emerald-700 text-white border-emerald-700 shadow-xs";
                    if (st === "Cancelled") colorClass = "bg-rose-700 text-white border-rose-700 shadow-xs";
                  }
                  return (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusUpdate(st)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 ${colorClass}`}
                    >
                      {isActive && <Check size={13} />}
                      {st === "Pending" && (isArabic ? "قيد المراجعة" : "Pending")}
                      {st === "Processing" && (isArabic ? "جاري التجهيز" : "Processing")}
                      {st === "Shipped" && (isArabic ? "تم الشحن" : "Shipped")}
                      {st === "Delivered" && (isArabic ? "تم التسليم" : "Delivered")}
                      {st === "Cancelled" && (isArabic ? "ملغي" : "Cancelled")}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white py-2.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition shadow-xs"
                >
                  <Send size={14} />
                  {isArabic
                    ? "إرسال تحديث للعميل عبر WhatsApp"
                    : "Send WhatsApp Status Update"}
                </button>
                <button
                  type="button"
                  onClick={copyOrderDetails}
                  className="bg-[#e2ded5]/60 hover:bg-[#e2ded5] text-[#2a2c24] py-2.5 px-4 rounded-xl font-bold flex items-center justify-center gap-1.5 cursor-pointer transition"
                >
                  {copied ? <Check size={14} className="text-emerald-700" /> : null}
                  {copied
                    ? isArabic
                      ? "تم النسخ!"
                      : "Copied!"
                    : isArabic
                    ? "نسخ بيانات الطلب"
                    : "Copy Order Info"}
                </button>
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-[#e2ded5] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#6b705c]">
                  {isArabic ? "بيانات العميل" : "Customer Info"}
                </span>
                <h3 className="font-serif font-bold text-sm text-[#2a2c24]">
                  {order.customerName}
                </h3>
                <div className="space-y-1 text-[#3f4236] text-xs">
                  <p className="flex items-center gap-1.5 font-mono">
                    <Phone size={13} className="text-[#6b705c]" />
                    <a href={`tel:${order.customerPhone}`} className="hover:underline">
                      {order.customerPhone}
                    </a>
                  </p>
                  {order.customerEmail && (
                    <p className="text-[11px] text-[#6b705c]">{order.customerEmail}</p>
                  )}
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#e2ded5] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#6b705c]">
                  {isArabic ? "عنوان التوصيل" : "Shipping Destination"}
                </span>
                <div className="space-y-1 text-xs text-[#3f4236]">
                  <p className="font-bold text-[#2a2c24] flex items-center gap-1.5">
                    <MapPin size={14} className="text-[#6b705c]" />
                    {order.city}
                  </p>
                  <p className="text-[#6b705c] leading-relaxed">{order.address}</p>
                  {order.notes && (
                    <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200 mt-2">
                      <strong>{isArabic ? "ملاحظات العميل: " : "Notes: "}</strong>
                      {order.notes}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Ordered Items List */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#2a2c24]">
                {isArabic ? "القطع المطلوبة" : "Ordered Garments"} ({order.items.length})
              </span>
              <div className="bg-white rounded-2xl border border-[#e2ded5] divide-y divide-[#e2ded5] overflow-hidden">
                {order.items.map((item, idx) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#f6f7f3] border border-[#e2ded5] overflow-hidden shrink-0">
                        {item.image ? (
                          <img src={item.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <Package size={20} className="m-auto text-[#6b705c] mt-3" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-xs text-[#2a2c24]">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-[#6b705c] mt-0.5">
                          <span>
                            {isArabic ? "المقاس:" : "Size:"} <strong>{item.size}</strong>
                          </span>
                          {item.color && (
                            <>
                              <span>•</span>
                              <span>
                                {isArabic ? "اللون:" : "Color:"} {item.color}
                              </span>
                            </>
                          )}
                          <span>•</span>
                          <span>
                            {isArabic ? "الكمية:" : "Qty:"} {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-xs text-[#2a2c24]">
                        {item.price * item.quantity} EGP
                      </span>
                      <span className="block text-[10px] text-[#6b705c]">
                        {item.price} EGP / item
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Breakdown / Receipt */}
            <div className="p-4 bg-[#e2ded5]/40 rounded-2xl border border-[#e2ded5] space-y-2 text-xs">
              <div className="flex justify-between text-[#3f4236]">
                <span>{isArabic ? "المجموع الفرعي:" : "Subtotal:"}</span>
                <span className="font-mono font-bold">{order.subtotal} EGP</span>
              </div>

              {order.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>
                    {isArabic ? "كوبون الخصم" : "Discount"} ({order.couponCode}):
                  </span>
                  <span className="font-mono">-{order.discountAmount} EGP</span>
                </div>
              )}

              <div className="flex justify-between text-[#3f4236]">
                <span>{isArabic ? "تكلفة الشحن:" : "Shipping Fee:"}</span>
                <span className="font-mono font-bold">
                  {order.shippingFee === 0
                    ? isArabic
                      ? "مجاني"
                      : "Free"
                    : `${order.shippingFee} EGP`}
                </span>
              </div>

              <div className="pt-2 border-t border-[#d3cec4] flex justify-between items-center text-sm">
                <span className="font-serif font-bold text-[#2a2c24]">
                  {isArabic ? "الإجمالي الكلي:" : "Total Amount:"}
                </span>
                <span className="font-mono font-bold text-base text-[#2a2c24]">
                  {order.totalPrice} EGP
                </span>
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-[#6b705c]">
                <span>{isArabic ? "طريقة السداد:" : "Payment Method:"}</span>
                <span className="font-bold text-[#2a2c24] flex items-center gap-1">
                  {order.paymentMethod === "instapay" ? (
                    <>
                      <CreditCard size={12} className="text-purple-700" />
                      InstaPay Transfer
                    </>
                  ) : (
                    <>
                      <Banknote size={12} className="text-amber-700" />
                      Cash on Delivery (COD)
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
