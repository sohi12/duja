"use client";

import React, { useState } from "react";
import { useStore, Coupon } from "../../context/StoreContext";
import {
  Tag,
  Plus,
  Copy,
  Check,
  Trash2,
  Sparkles,
  Percent,
  Calendar,
  Layers,
} from "lucide-react";
import AddCouponModal from "./AddCouponModal";

interface DiscountsTabProps {
  isArabic: boolean;
}

export default function DiscountsTab({ isArabic }: DiscountsTabProps) {
  const { coupons, addCoupon, toggleCoupon, deleteCoupon } = useStore();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#e2ded5] shadow-xs">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#6b705c]">
            {isArabic ? "الحملات الترويجية والخصومات" : "Promotions & Offers"}
          </span>
          <h2 className="text-2xl font-serif font-bold text-[#2a2c24]">
            {isArabic ? "أكواد الخصم والقسائم" : "Promo Coupons"}
          </h2>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-[#2a2c24] text-[#f4f1de] hover:bg-[#3f4236] px-5 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md"
        >
          <Plus size={16} className="text-[#ddb892]" />
          {isArabic ? "إنشاء كود خصم جديد" : "Create New Coupon"}
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className={`bg-white rounded-3xl border p-6 flex flex-col justify-between shadow-xs transition duration-300 relative overflow-hidden ${
              coupon.isActive ? "border-[#e2ded5]" : "border-[#e2ded5]/60 opacity-60"
            }`}
          >
            {/* Top Row: Code and Status */}
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 bg-[#f7f5f0] border border-[#e2ded5] px-3.5 py-1.5 rounded-xl">
                    <Tag size={14} className="text-[#6b705c]" />
                    <span className="font-mono font-bold text-sm tracking-wider text-[#2a2c24]">
                      {coupon.code}
                    </span>
                    <button
                      onClick={() => handleCopy(coupon.code)}
                      className="text-[#6b705c] hover:text-[#2a2c24] ml-1 cursor-pointer transition"
                      title={isArabic ? "نسخ الكود" : "Copy Code"}
                    >
                      {copiedCode === coupon.code ? (
                        <Check size={14} className="text-emerald-700" />
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Active Toggle Switch */}
                <button
                  onClick={() => toggleCoupon(coupon.id)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold transition cursor-pointer ${
                    coupon.isActive
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-stone-200 text-stone-700"
                  }`}
                >
                  {coupon.isActive
                    ? isArabic
                      ? "نشط"
                      : "Active"
                    : isArabic
                    ? "معطل"
                    : "Disabled"}
                </button>
              </div>

              {/* Discount Details */}
              <div className="space-y-1">
                <div className="text-2xl font-serif font-bold text-[#2a2c24]">
                  {coupon.discountType === "percentage"
                    ? `${coupon.discountValue}% OFF`
                    : `${coupon.discountValue} EGP OFF`}
                </div>
                <p className="text-xs text-[#6b705c]">
                  {coupon.minOrderAmount
                    ? isArabic
                      ? `للطلبات التي تتجاوز ${coupon.minOrderAmount} ج.م`
                      : `On orders over ${coupon.minOrderAmount} EGP`
                    : isArabic
                    ? "يطبق على جميع الطلبات دون حد أدنى"
                    : "No minimum purchase requirement"}
                </p>
              </div>
            </div>

            {/* Bottom Meta & Actions */}
            <div className="pt-5 mt-5 border-t border-[#e2ded5] flex justify-between items-center text-[11px] text-[#6b705c]">
              <div className="space-y-0.5">
                <span className="block font-bold text-[#2a2c24]">
                  {coupon.usageCount} {isArabic ? "مرة استخدام" : "redemptions"}
                </span>
                {coupon.expiresAt && (
                  <span className="text-[10px] flex items-center gap-1">
                    <Calendar size={10} />
                    {new Date(coupon.expiresAt).toLocaleDateString()}
                  </span>
                )}
              </div>

              <button
                onClick={() => deleteCoupon(coupon.id)}
                className="p-2 rounded-xl bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 transition cursor-pointer"
                title={isArabic ? "حذف الكود" : "Delete Coupon"}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Coupon Modal */}
      {isAddOpen && (
        <AddCouponModal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onSave={addCoupon}
          isArabic={isArabic}
        />
      )}
    </div>
  );
}
