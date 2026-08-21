"use client";

import React, { useState } from "react";
import { useStore, Customer } from "../../context/StoreContext";
import {
  Search,
  Users,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Send,
  Star,
  Edit3,
  Check,
  Award,
} from "lucide-react";

interface CustomersTabProps {
  isArabic: boolean;
}

export default function CustomersTab({ isArabic }: CustomersTabProps) {
  const { customers, updateCustomerNote, toggleCustomerVip } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [editingNoteKey, setEditingNoteKey] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState("");

  const filteredCustomers = customers.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.email && c.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const handleStartEditNote = (customer: Customer) => {
    const key = customer.phone.trim() || customer.name.trim().toLowerCase();
    setEditingNoteKey(key);
    setTempNote(customer.notes || "");
  };

  const handleSaveNote = (customer: Customer) => {
    const key = customer.phone.trim() || customer.name.trim().toLowerCase();
    updateCustomerNote(key, tempNote);
    setEditingNoteKey(null);
  };

  const handleWhatsApp = (phone: string, name: string) => {
    const clean = phone.replace(/[^0-9]/g, "");
    const formatted = clean.startsWith("20")
      ? clean
      : clean.startsWith("0")
      ? `20${clean.slice(1)}`
      : `20${clean}`;

    const msg = isArabic
      ? `مرحباً ${name} 🌿 من براند Duja للملابس المستدامة. يسعدنا دائماً تواصلك معنا.`
      : `Hello ${name} 🌿 from Duja Slow Fashion team. Hope you are loving your pieces!`;

    window.open(`https://wa.me/${formatted}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#e2ded5] shadow-xs">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#6b705c]">
            {isArabic ? "سجل العملاء والعلاقات" : "Customer Directory & CRM"}
          </span>
          <h2 className="text-2xl font-serif font-bold text-[#2a2c24]">
            {isArabic ? "قاعدة عملاء Duja" : "Customer Base"} ({customers.length})
          </h2>
        </div>

        {/* Search */}
        <div className="w-full sm:w-72 relative">
          <Search size={16} className="absolute left-3.5 top-3.5 text-[#6b705c]" />
          <input
            type="text"
            placeholder={isArabic ? "ابحث باسم العميل، الهاتف، المدينة..." : "Search customer, phone, city..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#f7f5f0] border border-[#e2ded5] focus:border-[#2a2c24] pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none text-[#2a2c24]"
          />
        </div>
      </div>

      {/* Customer Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCustomers.map((customer) => {
          const key = customer.phone.trim() || customer.name.trim().toLowerCase();
          const isEditing = editingNoteKey === key;

          return (
            <div
              key={customer.id}
              className="bg-white rounded-3xl border border-[#e2ded5] p-6 flex flex-col justify-between shadow-xs space-y-5"
            >
              {/* Header: Name, VIP, and City */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#2a2c24] text-[#ddb892] flex items-center justify-center font-serif font-bold text-lg shadow-sm">
                      {customer.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-serif font-bold text-sm text-[#2a2c24]">
                          {customer.name}
                        </h3>
                        {customer.isVip && (
                          <span className="bg-[#ddb892]/30 text-[#2a2c24] border border-[#ddb892] px-2 py-0.5 rounded-full text-[9px] font-bold flex items-center gap-1">
                            <Star size={9} className="fill-[#ddb892] text-[#ddb892]" /> VIP
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#6b705c] flex items-center gap-1 mt-0.5">
                        <MapPin size={11} /> {customer.city}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleCustomerVip(key)}
                    className={`p-2 rounded-full transition cursor-pointer ${
                      customer.isVip
                        ? "text-[#ddb892] bg-[#2a2c24]"
                        : "text-[#6b705c] hover:bg-[#e2ded5]/40"
                    }`}
                    title={customer.isVip ? "Remove VIP" : "Mark as VIP"}
                  >
                    <Star size={15} className={customer.isVip ? "fill-[#ddb892]" : ""} />
                  </button>
                </div>

                {/* Contact numbers */}
                <div className="space-y-1 text-xs text-[#3f4236] bg-[#f7f5f0] p-3 rounded-2xl border border-[#e2ded5]">
                  <div className="flex items-center justify-between font-mono">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Phone size={12} className="text-[#6b705c]" />
                      {customer.phone}
                    </span>
                    <button
                      onClick={() => handleWhatsApp(customer.phone, customer.name)}
                      className="text-emerald-700 hover:text-emerald-900 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Send size={10} /> WhatsApp
                    </button>
                  </div>
                  {customer.email && (
                    <div className="flex items-center gap-1 text-[10px] text-[#6b705c] pt-1">
                      <Mail size={11} />
                      <span className="truncate">{customer.email}</span>
                    </div>
                  )}
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-[#e2ded5]/30 rounded-xl">
                    <span className="block font-bold text-[#2a2c24] font-mono">
                      {customer.totalOrders}
                    </span>
                    <span className="text-[9px] text-[#6b705c] uppercase">
                      {isArabic ? "الطلبات" : "Orders"}
                    </span>
                  </div>
                  <div className="p-2.5 bg-[#e2ded5]/30 rounded-xl">
                    <span className="block font-bold text-[#2a2c24] font-mono text-[11px]">
                      {customer.totalSpent} EGP
                    </span>
                    <span className="text-[9px] text-[#6b705c] uppercase">
                      {isArabic ? "المشتريات" : "Spent"}
                    </span>
                  </div>
                  <div className="p-2.5 bg-[#e2ded5]/30 rounded-xl">
                    <span className="block font-bold text-emerald-800 font-mono">
                      {customer.sustainabilityPoints}
                    </span>
                    <span className="text-[9px] text-[#6b705c] uppercase">
                      {isArabic ? "نقاط ولاء" : "Points"}
                    </span>
                  </div>
                </div>

                {/* Notes section */}
                <div className="pt-2">
                  <div className="flex justify-between items-center text-[10px] text-[#6b705c] mb-1">
                    <span className="font-bold uppercase tracking-wider">
                      {isArabic ? "ملاحظات وتفضيلات العميل:" : "Preferences & Notes:"}
                    </span>
                    {!isEditing ? (
                      <button
                        onClick={() => handleStartEditNote(customer)}
                        className="text-[#2a2c24] hover:underline flex items-center gap-0.5 cursor-pointer"
                      >
                        <Edit3 size={10} /> {isArabic ? "تعديل" : "Edit"}
                      </button>
                    ) : null}
                  </div>

                  {isEditing ? (
                    <div className="space-y-1.5">
                      <textarea
                        rows={2}
                        value={tempNote}
                        onChange={(e) => setTempNote(e.target.value)}
                        placeholder={isArabic ? "مثال: يفضل مقاس M دائماً، عنوان التوصيل سريع" : "e.g. Always wears size M..."}
                        className="w-full bg-[#f7f5f0] border border-[#e2ded5] p-2 rounded-xl text-xs outline-none text-[#2a2c24]"
                      />
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => setEditingNoteKey(null)}
                          className="px-2 py-1 rounded-lg text-[10px] text-[#6b705c] hover:bg-[#e2ded5]/40"
                        >
                          {isArabic ? "إلغاء" : "Cancel"}
                        </button>
                        <button
                          onClick={() => handleSaveNote(customer)}
                          className="px-3 py-1 bg-[#2a2c24] text-white rounded-lg text-[10px] font-bold flex items-center gap-1"
                        >
                          <Check size={10} /> {isArabic ? "حفظ" : "Save"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[11px] text-[#6b705c] italic bg-[#f7f5f0] p-2 rounded-xl min-h-[32px]">
                      {customer.notes || (isArabic ? "لا توجد ملاحظات خاصة." : "No specific notes saved.")}
                    </p>
                  )}
                </div>
              </div>

              {/* Last order date footer */}
              <div className="pt-3 border-t border-[#e2ded5] text-[10px] text-[#6b705c] flex justify-between">
                <span>{isArabic ? "آخر عملية شراء:" : "Last ordered:"}</span>
                <span className="font-semibold text-[#2a2c24]">
                  {new Date(customer.lastOrderDate).toLocaleDateString(
                    isArabic ? "ar-EG" : "en-US",
                    { dateStyle: "medium" }
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
