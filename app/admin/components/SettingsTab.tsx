"use client";

import React, { useState } from "react";
import { useStore, StoreSettings } from "../../context/StoreContext";
import {
  Settings,
  Save,
  RotateCcw,
  Download,
  Upload,
  Lock,
  Truck,
  Sparkles,
  Phone,
  CreditCard,
  Mail,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface SettingsTabProps {
  isArabic: boolean;
}

export default function SettingsTab({ isArabic }: SettingsTabProps) {
  const { settings, updateSettings, resetToDefaults, products, orders, coupons } =
    useStore();

  const [formData, setFormData] = useState<StoreSettings>(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Export JSON Backup
  const handleExportData = () => {
    const backup = {
      version: "1.0",
      exportDate: new Date().toISOString(),
      products,
      orders,
      coupons,
      settings: formData,
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `duja-store-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON Backup
  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        if (parsed.products) {
          localStorage.setItem("duja_products", JSON.stringify(parsed.products));
        }
        if (parsed.orders) {
          localStorage.setItem("duja_orders", JSON.stringify(parsed.orders));
        }
        if (parsed.coupons) {
          localStorage.setItem("duja_coupons", JSON.stringify(parsed.coupons));
        }
        if (parsed.settings) {
          localStorage.setItem("duja_settings", JSON.stringify(parsed.settings));
        }
        window.location.reload();
      } catch (err) {
        alert(isArabic ? "ملف النسخة الاحتياطية غير صالح" : "Invalid backup file format");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#e2ded5] shadow-xs">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#6b705c]">
            {isArabic ? "تخصيص وإعدادات المنظومة" : "Store Configuration & Controls"}
          </span>
          <h2 className="text-2xl font-serif font-bold text-[#2a2c24]">
            {isArabic ? "إعدادات متجر Duja" : "Store Settings"}
          </h2>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-100 px-4 py-2 rounded-xl font-bold border border-emerald-300">
            <CheckCircle size={15} />
            <span>{isArabic ? "تم حفظ التعديلات بنجاح!" : "Settings saved successfully!"}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Section 1: Contact & Payment Info */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#e2ded5] shadow-xs space-y-5">
          <div className="flex items-center gap-2 border-b border-[#e2ded5] pb-3">
            <Phone size={18} className="text-[#6b705c]" />
            <h3 className="font-serif font-bold text-base text-[#2a2c24]">
              {isArabic ? "قنوات التواصل واستلام المدفوعات" : "Contact & Payment Gateway Details"}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                {isArabic ? "اسم العلامة التجارية" : "Brand Store Name"}
              </label>
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full bg-[#f7f5f0] border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none font-medium text-[#2a2c24]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                {isArabic ? "عملة المتجر الرئيسية" : "Store Currency"}
              </label>
              <input
                type="text"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full bg-[#f7f5f0] border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none font-medium text-[#2a2c24]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Phone size={13} className="text-emerald-700" />
                {isArabic ? "رقم استقبال طلبات الواتساب *" : "WhatsApp Order Receiver Phone *"}
              </label>
              <input
                type="text"
                required
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full bg-[#f7f5f0] border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none font-mono text-[#2a2c24]"
              />
              <span className="text-[10px] text-[#6b705c]">
                {isArabic
                  ? "الرقم الذي يتم توجيه رسائل إتمام الطلب إليه بصيغة دولية (+20...)"
                  : "Number where customers send their checkout order summaries (+20...)"}
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <CreditCard size={13} className="text-purple-700" />
                {isArabic ? "رقم حساب إنستاباي (InstaPay Number) *" : "InstaPay Account Number *"}
              </label>
              <input
                type="text"
                required
                value={formData.instapayNumber}
                onChange={(e) => setFormData({ ...formData, instapayNumber: e.target.value })}
                className="w-full bg-[#f7f5f0] border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none font-mono text-[#2a2c24]"
              />
              <span className="text-[10px] text-[#6b705c]">
                {isArabic
                  ? "الرقم الذي يظهر للمشتري في صفحة الدفع للتحويل عليه"
                  : "Number displayed to customers during InstaPay checkout selection"}
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Shipping & Delivery Rates */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#e2ded5] shadow-xs space-y-5">
          <div className="flex items-center gap-2 border-b border-[#e2ded5] pb-3">
            <Truck size={18} className="text-[#6b705c]" />
            <h3 className="font-serif font-bold text-base text-[#2a2c24]">
              {isArabic ? "رسوم الشحن والتوصيل" : "Shipping & Delivery Rates"}
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                {isArabic ? "شحن القاهرة والجيزة (ج.م)" : "Cairo & Giza Rate (EGP)"}
              </label>
              <input
                type="number"
                min="0"
                value={formData.shippingFeeCairo}
                onChange={(e) =>
                  setFormData({ ...formData, shippingFeeCairo: Number(e.target.value) })
                }
                className="w-full bg-[#f7f5f0] border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none font-mono text-[#2a2c24]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                {isArabic ? "شحن باقي المحافظات (ج.م)" : "Other Governorates Rate (EGP)"}
              </label>
              <input
                type="number"
                min="0"
                value={formData.shippingFeeGovernorates}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    shippingFeeGovernorates: Number(e.target.value),
                  })
                }
                className="w-full bg-[#f7f5f0] border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none font-mono text-[#2a2c24]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                {isArabic ? "حد الشحن المجاني (ج.م)" : "Free Shipping Threshold (EGP)"}
              </label>
              <input
                type="number"
                min="0"
                value={formData.freeShippingThreshold}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    freeShippingThreshold: Number(e.target.value),
                  })
                }
                className="w-full bg-[#f7f5f0] border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none font-mono text-[#2a2c24]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Announcement Bar & Banners */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#e2ded5] shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#e2ded5] pb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[#6b705c]" />
              <h3 className="font-serif font-bold text-base text-[#2a2c24]">
                {isArabic ? "شريط الإعلانات أعلى الموقع" : "Storefront Announcement Banner"}
              </h3>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.announcementActive}
                onChange={(e) =>
                  setFormData({ ...formData, announcementActive: e.target.checked })
                }
                className="w-4 h-4 accent-[#2a2c24]"
              />
              <span className="font-bold text-xs text-[#2a2c24]">
                {isArabic ? "تفعيل الشريط" : "Show Banner"}
              </span>
            </label>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                {isArabic ? "نص الإعلان (الإنجليزية)" : "Announcement Text (English)"}
              </label>
              <input
                type="text"
                value={formData.announcementText}
                onChange={(e) =>
                  setFormData({ ...formData, announcementText: e.target.value })
                }
                className="w-full bg-[#f7f5f0] border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none text-[#2a2c24]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                {isArabic ? "شارة البانر الرئيسية (Hero Badge)" : "Hero Capsule Badge"}
              </label>
              <input
                type="text"
                value={formData.heroBadgeText}
                onChange={(e) =>
                  setFormData({ ...formData, heroBadgeText: e.target.value })
                }
                className="w-full bg-[#f7f5f0] border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none text-[#2a2c24]"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Security & PIN Code */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#e2ded5] shadow-xs space-y-5">
          <div className="flex items-center gap-2 border-b border-[#e2ded5] pb-3">
            <Lock size={18} className="text-[#6b705c]" />
            <h3 className="font-serif font-bold text-base text-[#2a2c24]">
              {isArabic ? "حماية لوحة التحكم ورمز الأمان" : "Dashboard Security & Access PIN"}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4 items-center">
            <div className="space-y-1.5">
              <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                {isArabic ? "رمز الأمان السريع (Admin PIN)" : "Admin PIN Code"}
              </label>
              <input
                type="password"
                maxLength={8}
                value={formData.adminPin}
                onChange={(e) => setFormData({ ...formData, adminPin: e.target.value })}
                className="w-full bg-[#f7f5f0] border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none font-mono text-center tracking-widest text-lg font-bold text-[#2a2c24]"
              />
            </div>

            <div className="pt-4">
              <label className="flex items-center gap-2.5 cursor-pointer p-3 bg-[#f7f5f0] rounded-2xl border border-[#e2ded5]">
                <input
                  type="checkbox"
                  checked={formData.isPinRequired}
                  onChange={(e) =>
                    setFormData({ ...formData, isPinRequired: e.target.checked })
                  }
                  className="w-4 h-4 accent-[#2a2c24]"
                />
                <span className="font-bold text-[#2a2c24]">
                  {isArabic
                    ? "طلب رمز الأمان عند الدخول للوحة التحكم"
                    : "Require PIN prompt before entering Admin Portal"}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-[#2a2c24] text-[#f4f1de] hover:bg-[#3f4236] px-8 py-3.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <Save size={16} className="text-[#ddb892]" />
            {isArabic ? "حفظ كافة الإعدادات" : "Save All Changes"}
          </button>
        </div>
      </form>

      {/* Section 5: Data Backup & Reset */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#e2ded5] shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-[#e2ded5] pb-3">
          <Download size={18} className="text-[#6b705c]" />
          <h3 className="font-serif font-bold text-base text-[#2a2c24]">
            {isArabic ? "النسخ الاحتياطي وإدارة البيانات" : "Data Management & Backups"}
          </h3>
        </div>

        <p className="text-xs text-[#6b705c]">
          {isArabic
            ? "يمكنك تصدير نسخة كاملة من بيانات المنتجات والطلبات والكوبونات كملف JSON أو استرجاع بيانات العرض الافتراضية."
            : "Export complete store catalog, orders, and promo codes as JSON backup, or restore to fresh demo defaults."}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={handleExportData}
            className="bg-[#f7f5f0] hover:bg-[#e2ded5] text-[#2a2c24] border border-[#e2ded5] px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer transition text-xs"
          >
            <Download size={14} />
            {isArabic ? "تصدير نسخة JSON" : "Export JSON Backup"}
          </button>

          <label className="bg-[#f7f5f0] hover:bg-[#e2ded5] text-[#2a2c24] border border-[#e2ded5] px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer transition text-xs">
            <Upload size={14} />
            <span>{isArabic ? "استيراد نسخة سابقة" : "Import JSON"}</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportData}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={() => setResetConfirmOpen(true)}
            className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer transition text-xs"
          >
            <RotateCcw size={14} />
            {isArabic ? "إعادة تعيين البيانات الافتراضية" : "Reset to Defaults"}
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setResetConfirmOpen(false)}
            className="fixed inset-0 bg-[#2a2c24]/70 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-sm bg-[#f7f5f0] border border-[#e2ded5] rounded-3xl p-6 shadow-2xl z-10 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <RotateCcw size={22} />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2a2c24]">
              {isArabic ? "إعادة تعيين البيانات بالكامل؟" : "Reset All Store Data?"}
            </h3>
            <p className="text-xs text-[#6b705c] leading-relaxed">
              {isArabic
                ? "سيتم استرجاع المنتجات والطلبات النموذجية الأصلية وحذف التعديلات المحلية."
                : "This will reset products, orders, and coupons back to fresh factory state."}
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#e2ded5] font-bold text-xs text-[#3f4236] hover:bg-[#e2ded5]/40 transition cursor-pointer"
              >
                {isArabic ? "إلغاء" : "Cancel"}
              </button>
              <button
                onClick={() => {
                  resetToDefaults();
                  setResetConfirmOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 font-bold text-xs text-white transition cursor-pointer shadow-md"
              >
                {isArabic ? "نعم، إعادة التعيين" : "Confirm Reset"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
