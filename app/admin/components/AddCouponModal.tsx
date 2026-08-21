"use client";

import React, { useState } from "react";
import { Coupon } from "../../context/StoreContext";
import { X, Tag, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AddCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (coupon: Omit<Coupon, "id" | "usageCount">) => void;
  isArabic?: boolean;
}

export default function AddCouponModal({
  isOpen,
  onClose,
  onSave,
  isArabic = false,
}: AddCouponModalProps) {
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [discountValue, setDiscountValue] = useState<number>(10);
  const [minOrderAmount, setMinOrderAmount] = useState<number | "">(1000);
  const [maxUses, setMaxUses] = useState<number | "">("");
  const [expiresAt, setExpiresAt] = useState("");
  const [isActive, setIsActive] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !discountValue) return;

    onSave({
      code: code.trim().toUpperCase(),
      discountType,
      discountValue: Number(discountValue),
      minOrderAmount: minOrderAmount ? Number(minOrderAmount) : undefined,
      maxUses: maxUses ? Number(maxUses) : undefined,
      expiresAt: expiresAt ? new Date(expiresAt).toISOString() : undefined,
      isActive,
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
          className={`relative w-full max-w-lg bg-[#f7f5f0] border border-[#e2ded5] rounded-3xl p-6 md:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto my-8 ${
            isArabic ? "text-right" : "text-left"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#e2ded5] pb-4 mb-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#6b705c]">
                {isArabic ? "العروض والتخفيضات" : "Marketing & Promotions"}
              </span>
              <h2 className="text-xl font-serif font-bold text-[#2a2c24]">
                {isArabic ? "إنشاء كود خصم جديد" : "Create New Promo Coupon"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#e2ded5]/40 text-[#3f4236] hover:bg-[#e2ded5] transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Code */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                {isArabic ? "رمز الكود (Coupon Code) *" : "Coupon Code *"}
              </label>
              <div className="relative">
                <Tag size={16} className="absolute left-3.5 top-3.5 text-[#6b705c]" />
                <input
                  type="text"
                  required
                  placeholder="e.g. SUMMER20, DUJA15"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full bg-white border border-[#e2ded5] focus:border-[#2a2c24] pl-10 pr-4 py-3 rounded-xl font-mono uppercase font-bold text-[#2a2c24] outline-none"
                />
              </div>
            </div>

            {/* Discount Type & Value */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                  {isArabic ? "نوع الخصم" : "Discount Type"}
                </label>
                <div className="flex bg-[#e2ded5]/50 p-1 rounded-xl border border-[#e2ded5]">
                  <button
                    type="button"
                    onClick={() => setDiscountType("percentage")}
                    className={`flex-1 py-2 rounded-lg font-bold transition cursor-pointer ${
                      discountType === "percentage"
                        ? "bg-[#2a2c24] text-white shadow-xs"
                        : "text-[#3f4236]"
                    }`}
                  >
                    % {isArabic ? "نسبة مئوية" : "Percentage"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDiscountType("fixed")}
                    className={`flex-1 py-2 rounded-lg font-bold transition cursor-pointer ${
                      discountType === "fixed"
                        ? "bg-[#2a2c24] text-white shadow-xs"
                        : "text-[#3f4236]"
                    }`}
                  >
                    EGP {isArabic ? "مبلغ ثابت" : "Fixed EGP"}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                  {discountType === "percentage"
                    ? isArabic
                      ? "قيمة الخصم (%) *"
                      : "Discount (%) *"
                    : isArabic
                    ? "قيمة الخصم (ج.م) *"
                    : "Discount (EGP) *"}
                </label>
                <input
                  type="number"
                  min="1"
                  max={discountType === "percentage" ? 100 : 10000}
                  required
                  value={discountValue}
                  onChange={(e) => setDiscountValue(Number(e.target.value))}
                  className="w-full bg-white border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl font-bold outline-none text-[#2a2c24]"
                />
              </div>
            </div>

            {/* Min Order & Max Uses */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                  {isArabic ? "الحد الأدنى للطلب (ج.م)" : "Min Order (EGP)"}
                </label>
                <input
                  type="number"
                  placeholder="e.g. 1000"
                  value={minOrderAmount}
                  onChange={(e) =>
                    setMinOrderAmount(e.target.value === "" ? "" : Number(e.target.value))
                  }
                  className="w-full bg-white border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none text-[#2a2c24]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                  {isArabic ? "أقصى عدد استخدامات" : "Max Redemptions"}
                </label>
                <input
                  type="number"
                  placeholder={isArabic ? "غير محدود" : "Unlimited"}
                  value={maxUses}
                  onChange={(e) =>
                    setMaxUses(e.target.value === "" ? "" : Number(e.target.value))
                  }
                  className="w-full bg-white border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none text-[#2a2c24]"
                />
              </div>
            </div>

            {/* Expiry Date */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                {isArabic ? "تاريخ الانتهاء (اختياري)" : "Expiry Date (Optional)"}
              </label>
              <input
                type="date"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="w-full bg-white border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none text-[#2a2c24]"
              />
            </div>

            {/* Active Switch */}
            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer p-3 bg-white rounded-xl border border-[#e2ded5]">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 accent-[#2a2c24]"
                />
                <span className="font-bold text-[#2a2c24]">
                  {isArabic ? "تفعيل الكود فور الإنشاء" : "Activate coupon immediately"}
                </span>
              </label>
            </div>

            {/* Submit buttons */}
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
                className="px-6 py-3 rounded-xl bg-[#2a2c24] text-[#f4f1de] font-bold hover:bg-[#3f4236] transition cursor-pointer shadow-md flex items-center gap-2"
              >
                <Sparkles size={14} className="text-[#ddb892]" />
                {isArabic ? "حفظ وتفعيل الكود" : "Save Coupon"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
