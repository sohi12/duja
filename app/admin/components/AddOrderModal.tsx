"use client";

import React, { useState } from "react";
import { useStore, OrderItem } from "../../context/StoreContext";
import { X, Plus, Trash2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AddOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  isArabic?: boolean;
}

export default function AddOrderModal({
  isOpen,
  onClose,
  isArabic = false,
}: AddOrderModalProps) {
  const { products, addOrder, settings } = useStore();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [city, setCity] = useState("Cairo");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "instapay">("cod");

  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || "");
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [quantity, setQuantity] = useState(1);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  if (!isOpen) return null;

  const handleAddItem = () => {
    const prod = products.find((p) => p.id === selectedProductId);
    if (!prod) return;

    setOrderItems((prev) => [
      ...prev,
      {
        id: prod.id,
        name: prod.name,
        price: prod.price,
        quantity,
        size: selectedSize,
        image: prod.image,
        color: prod.colors?.[0] || "Natural",
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setOrderItems((prev) => prev.filter((_, i) => i !== index));
  };

  const subtotal = orderItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const shippingFee =
    subtotal >= settings.freeShippingThreshold
      ? 0
      : city.toLowerCase().includes("cairo") || city.toLowerCase().includes("giza")
      ? settings.shippingFeeCairo
      : settings.shippingFeeGovernorates;
  const totalPrice = subtotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !address || orderItems.length === 0) return;

    addOrder({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim() || undefined,
      city,
      address: address.trim(),
      notes: notes.trim() || undefined,
      items: orderItems,
      subtotal,
      discountAmount: 0,
      shippingFee,
      totalPrice,
      paymentMethod,
      status: "Processing",
    });

    onClose();
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
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#6b705c]">
                {isArabic ? "إنشاء طلب يدوي" : "Manual Order Entry"}
              </span>
              <h2 className="text-xl font-serif font-bold text-[#2a2c24]">
                {isArabic ? "إضافة طلب جديد (Instagram / Phone)" : "Create Direct Customer Order"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#e2ded5]/40 text-[#3f4236] hover:bg-[#e2ded5] transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            {/* Customer Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                  {isArabic ? "اسم العميل *" : "Customer Name *"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isArabic ? "اسم العميل ثلاثي" : "Full Name"}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-white border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none text-[#2a2c24]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                  {isArabic ? "رقم الهاتف / الواتساب *" : "Phone / WhatsApp *"}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="010XXXXXXXX"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-white border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none text-[#2a2c24]"
                />
              </div>
            </div>

            {/* City & Address */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                  {isArabic ? "المدينة / المحافظة *" : "City / Governorate *"}
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-white border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none text-[#2a2c24]"
                >
                  <option value="Cairo">Cairo (القاهرة)</option>
                  <option value="Giza">Giza (الجيزة)</option>
                  <option value="Alexandria">Alexandria (الإسكندرية)</option>
                  <option value="Mansoura">Mansoura (المنصورة)</option>
                  <option value="Tanta">Tanta (طنطا)</option>
                  <option value="Other Governorates">Other Governorates (باقي المحافظات)</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                  {isArabic ? "العنوان التفصيلي *" : "Detailed Address *"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isArabic ? "الشارع، رقم العمارة، الشقة" : "Street, Building, Apt #"}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none text-[#2a2c24]"
                />
              </div>
            </div>

            {/* Item selector */}
            <div className="p-4 bg-white rounded-2xl border border-[#e2ded5] space-y-3">
              <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px] block">
                {isArabic ? "إضافة قطع للطلب" : "Add Items to Order"}
              </label>

              <div className="grid md:grid-cols-4 gap-2">
                <div className="md:col-span-2">
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full bg-[#f7f5f0] border border-[#e2ded5] p-2.5 rounded-xl outline-none text-[#2a2c24]"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} - {p.price} EGP
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full bg-[#f7f5f0] border border-[#e2ded5] p-2.5 rounded-xl outline-none text-[#2a2c24]"
                  >
                    <option value="S">Size S</option>
                    <option value="M">Size M</option>
                    <option value="L">Size L</option>
                    <option value="XL">Size XL</option>
                  </select>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="w-full bg-[#3f4236] hover:bg-[#2a2c24] text-white p-2.5 rounded-xl font-bold flex items-center justify-center gap-1 cursor-pointer transition"
                  >
                    <Plus size={14} /> {isArabic ? "إضافة" : "Add Item"}
                  </button>
                </div>
              </div>

              {/* Items List */}
              {orderItems.length > 0 ? (
                <div className="divide-y divide-[#e2ded5] border-t border-[#e2ded5] pt-2">
                  {orderItems.map((item, idx) => (
                    <div key={idx} className="py-2 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-[#2a2c24]">{item.name}</span>
                        <span className="text-[#6b705c] ml-2">
                          ({item.size}) x{item.quantity} = {item.price * item.quantity} EGP
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="text-red-600 hover:text-red-800 p-1 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#6b705c] text-[11px] py-2 text-center">
                  {isArabic ? "لم تتم إضافة أي قطع بعد" : "No items added yet."}
                </p>
              )}
            </div>

            {/* Payment Method */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                  {isArabic ? "طريقة الدفع" : "Payment Method"}
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex-1 py-2.5 rounded-xl font-bold border transition cursor-pointer ${
                      paymentMethod === "cod"
                        ? "bg-[#2a2c24] text-white border-[#2a2c24]"
                        : "bg-white text-[#3f4236] border-[#e2ded5]"
                    }`}
                  >
                    {isArabic ? "الدفع عند الاستلام" : "Cash on Delivery"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("instapay")}
                    className={`flex-1 py-2.5 rounded-xl font-bold border transition cursor-pointer ${
                      paymentMethod === "instapay"
                        ? "bg-[#2a2c24] text-white border-[#2a2c24]"
                        : "bg-white text-[#3f4236] border-[#e2ded5]"
                    }`}
                  >
                    InstaPay
                  </button>
                </div>
              </div>

              {/* Financial Totals */}
              <div className="p-3 bg-[#e2ded5]/40 rounded-xl border border-[#e2ded5] text-xs space-y-1">
                <div className="flex justify-between text-[#3f4236]">
                  <span>{isArabic ? "المجموع:" : "Subtotal:"}</span>
                  <span className="font-bold">{subtotal} EGP</span>
                </div>
                <div className="flex justify-between text-[#3f4236]">
                  <span>{isArabic ? "الشحن:" : "Shipping:"}</span>
                  <span className="font-bold">{shippingFee} EGP</span>
                </div>
                <div className="flex justify-between text-[#2a2c24] font-bold pt-1 border-t border-[#d3cec4]">
                  <span>{isArabic ? "الإجمالي الكلي:" : "Total:"}</span>
                  <span className="font-mono text-sm">{totalPrice} EGP</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#e2ded5]">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl border border-[#e2ded5] text-[#3f4236] font-bold hover:bg-[#e2ded5]/40 transition cursor-pointer"
              >
                {isArabic ? "إلغاء" : "Cancel"}
              </button>
              <button
                type="submit"
                disabled={orderItems.length === 0}
                className="px-6 py-3 rounded-xl bg-[#2a2c24] text-[#f4f1de] font-bold hover:bg-[#3f4236] disabled:opacity-50 transition cursor-pointer shadow-md flex items-center gap-2"
              >
                <ShoppingBag size={14} />
                {isArabic ? "تسجيل الطلب" : "Place Order"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
