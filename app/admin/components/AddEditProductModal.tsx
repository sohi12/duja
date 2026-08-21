"use client";

import React, { useState, useEffect } from "react";
import { Product } from "../../data/products";
import { X, Plus, Trash2, Image as ImageIcon, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AddEditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, "id"> | Product) => void;
  initialProduct?: Product | null;
  isArabic?: boolean;
}

const CATEGORIES: Product["category"][] = [
  "Blouses",
  "Tops",
  "Dresses",
  "Trousers",
  "Outerwear",
];

const ALL_SIZES: ("S" | "M" | "L" | "XL")[] = ["S", "M", "L", "XL"];
const ALL_COLORS: ("Sand" | "Olive" | "Terracotta" | "Natural" | "Charcoal")[] = [
  "Sand",
  "Olive",
  "Terracotta",
  "Natural",
  "Charcoal",
];

const SAMPLE_IMAGE_OPTIONS = [
  "/products/1.jpeg",
  "/products/2.jpeg",
  "/products/3.jpeg",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=800",
];

export default function AddEditProductModal({
  isOpen,
  onClose,
  onSave,
  initialProduct,
  isArabic = false,
}: AddEditProductModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">(1100);
  const [category, setCategory] = useState<Product["category"]>("Blouses");
  const [sizes, setSizes] = useState<("S" | "M" | "L" | "XL")[]>(["S", "M", "L"]);
  const [colors, setColors] = useState<("Sand" | "Olive" | "Terracotta" | "Natural" | "Charcoal")[]>(["Sand"]);
  const [image, setImage] = useState("");
  const [hoverImage, setHoverImage] = useState("");
  const [description, setDescription] = useState("");
  const [detailInput, setDetailInput] = useState("");
  const [details, setDetails] = useState<string[]>([]);
  const [inStock, setInStock] = useState(true);
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setPrice(initialProduct.price);
      setCategory(initialProduct.category);
      setSizes(initialProduct.sizes || ["S", "M", "L"]);
      setColors(initialProduct.colors || ["Sand"]);
      setImage(initialProduct.image);
      setHoverImage(initialProduct.hoverImage || "");
      setDescription(initialProduct.description);
      setDetails(initialProduct.details || []);
      setInStock(initialProduct.inStock);
      setFeatured(!!initialProduct.featured);
    } else {
      setName("");
      setPrice(1200);
      setCategory("Blouses");
      setSizes(["S", "M", "L"]);
      setColors(["Sand"]);
      setImage("/products/1.jpeg");
      setHoverImage("");
      setDescription("Handcrafted from pure organic Egyptian linen with relaxed silhouette and natural drape.");
      setDetails(["100% Organic Egyptian Linen", "Natural breathable fibers", "Handmade in Cairo"]);
      setInStock(true);
      setFeatured(false);
    }
  }, [initialProduct, isOpen]);

  if (!isOpen) return null;

  const toggleSize = (size: "S" | "M" | "L" | "XL") => {
    if (sizes.includes(size)) {
      if (sizes.length > 1) setSizes(sizes.filter((s) => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  const toggleColor = (color: "Sand" | "Olive" | "Terracotta" | "Natural" | "Charcoal") => {
    if (colors.includes(color)) {
      if (colors.length > 1) setColors(colors.filter((c) => c !== color));
    } else {
      setColors([...colors, color]);
    }
  };

  const addDetailItem = () => {
    if (detailInput.trim()) {
      setDetails([...details, detailInput.trim()]);
      setDetailInput("");
    }
  };

  const removeDetailItem = (idx: number) => {
    setDetails(details.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price || !image.trim()) return;

    const payload = {
      name: name.trim(),
      price: Number(price),
      category,
      sizes,
      colors,
      image: image.trim(),
      hoverImage: hoverImage.trim() || undefined,
      description: description.trim(),
      details: details.length > 0 ? details : ["100% Organic Linen", "Handcrafted in Egypt"],
      inStock,
      featured,
      ...(initialProduct ? { id: initialProduct.id } : {}),
    };

    onSave(payload);
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
                {isArabic ? "كتالوج منتجات دوجا" : "Duja Catalog Management"}
              </span>
              <h2 className="text-xl font-serif font-bold text-[#2a2c24]">
                {initialProduct
                  ? isArabic
                    ? "تعديل بيانات القطعة"
                    : "Edit Garment"
                  : isArabic
                  ? "إضافة قطعة جديدة للتشكيلة"
                  : "Add New Garment to Collection"}
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
            {/* Name and Category */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                  {isArabic ? "اسم القطعة / الموديل *" : "Garment Name *"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isArabic ? "مثال: بلوزة كتان رملي طبيعي" : "e.g. Sand Minimalist Linen Blouse"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none font-medium text-[#2a2c24]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                  {isArabic ? "التصنيف *" : "Category *"}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Product["category"])}
                  className="w-full bg-white border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none font-medium text-[#2a2c24] cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price and Stock / Featured */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                  {isArabic ? "السعر (ج.م) *" : "Price (EGP) *"}
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full bg-white border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none font-medium text-[#2a2c24]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                  {isArabic ? "حالة التوفر" : "Stock Status"}
                </label>
                <button
                  type="button"
                  onClick={() => setInStock(!inStock)}
                  className={`w-full p-3 rounded-xl border font-bold flex items-center justify-center gap-2 cursor-pointer transition ${
                    inStock
                      ? "bg-[#6b705c] text-white border-[#6b705c]"
                      : "bg-[#e2ded5]/40 text-[#a5a58d] border-[#e2ded5]"
                  }`}
                >
                  {inStock
                    ? isArabic
                      ? "متوفر في المخزون"
                      : "In Stock"
                    : isArabic
                    ? "نفد من المخزون"
                    : "Out of Stock"}
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                  {isArabic ? "مميز في الرئيسية" : "Featured"}
                </label>
                <button
                  type="button"
                  onClick={() => setFeatured(!featured)}
                  className={`w-full p-3 rounded-xl border font-bold flex items-center justify-center gap-2 cursor-pointer transition ${
                    featured
                      ? "bg-[#2a2c24] text-[#ddb892] border-[#2a2c24]"
                      : "bg-white text-[#6b705c] border-[#e2ded5]"
                  }`}
                >
                  <Sparkles size={14} />
                  {featured
                    ? isArabic
                      ? "مميز بالرئيسية"
                      : "Featured"
                    : isArabic
                    ? "عادي"
                    : "Standard"}
                </button>
              </div>
            </div>

            {/* Sizes & Colors Selection */}
            <div className="grid md:grid-cols-2 gap-4 pt-2">
              {/* Sizes */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                  {isArabic ? "المقاسات المتوفرة" : "Available Sizes"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {ALL_SIZES.map((sz) => {
                    const isSelected = sizes.includes(sz);
                    return (
                      <button
                        type="button"
                        key={sz}
                        onClick={() => toggleSize(sz)}
                        className={`w-10 h-10 rounded-xl font-bold transition cursor-pointer flex items-center justify-center ${
                          isSelected
                            ? "bg-[#2a2c24] text-white shadow-xs"
                            : "bg-white border border-[#e2ded5] text-[#3f4236] hover:border-[#6b705c]"
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Colors */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                  {isArabic ? "الألوان المتوفرة" : "Available Colors"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {ALL_COLORS.map((clr) => {
                    const isSelected = colors.includes(clr);
                    return (
                      <button
                        type="button"
                        key={clr}
                        onClick={() => toggleColor(clr)}
                        className={`px-3 py-2 rounded-xl text-[11px] font-bold transition cursor-pointer ${
                          isSelected
                            ? "bg-[#6b705c] text-white shadow-xs"
                            : "bg-white border border-[#e2ded5] text-[#3f4236] hover:border-[#6b705c]"
                        }`}
                      >
                        {clr}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Image URLs with Preset Picker */}
            <div className="space-y-2 pt-2 border-t border-[#e2ded5]">
              <div className="flex items-center justify-between">
                <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <ImageIcon size={14} className="text-[#6b705c]" />
                  {isArabic ? "رابط الصورة الأساسية *" : "Main Image URL / Path *"}
                </label>
                <span className="text-[10px] text-[#6b705c]">
                  {isArabic ? "اختر صورة سريعة أو ضع رابطك" : "Pick preset or paste URL"}
                </span>
              </div>
              <input
                type="text"
                required
                placeholder="/products/1.jpeg or https://images.unsplash.com/..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-white border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none font-medium text-[#2a2c24]"
              />

              {/* Sample Images Ticker */}
              <div className="flex gap-2 overflow-x-auto py-1">
                {SAMPLE_IMAGE_OPTIONS.map((imgUrl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setImage(imgUrl)}
                    className={`w-12 h-12 shrink-0 rounded-lg overflow-hidden border-2 transition cursor-pointer ${
                      image === imgUrl ? "border-[#2a2c24] scale-105" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Hover Image */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                {isArabic ? "رابط صورة العرض الثاني (Hover Image - اختياري)" : "Hover Image URL (Optional)"}
              </label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={hoverImage}
                onChange={(e) => setHoverImage(e.target.value)}
                className="w-full bg-white border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none font-medium text-[#2a2c24]"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                {isArabic ? "وصف القطعة والتفاصيل" : "Description"}
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={isArabic ? "وصف نوع القماش والقصة..." : "Detailed fabric, cut, and fit description..."}
                className="w-full bg-white border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none font-medium text-[#2a2c24] resize-none"
              />
            </div>

            {/* Highlights list */}
            <div className="space-y-2">
              <label className="font-bold text-[#2a2c24] uppercase tracking-wider text-[11px]">
                {isArabic ? "مميزات الخامة والتصنيع" : "Craft & Fabric Highlights"}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={isArabic ? "مثال: كتان مصري طبيعي 100%" : "e.g. 100% Organic Linen"}
                  value={detailInput}
                  onChange={(e) => setDetailInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addDetailItem();
                    }
                  }}
                  className="flex-1 bg-white border border-[#e2ded5] focus:border-[#2a2c24] p-2.5 rounded-xl outline-none text-[#2a2c24]"
                />
                <button
                  type="button"
                  onClick={addDetailItem}
                  className="px-4 py-2.5 bg-[#3f4236] text-white rounded-xl hover:bg-[#2a2c24] transition font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={14} /> {isArabic ? "إضافة" : "Add"}
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {details.map((dt, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 bg-[#e2ded5]/60 text-[#2a2c24] px-3 py-1.5 rounded-full text-[11px] font-medium"
                  >
                    <span>{dt}</span>
                    <button
                      type="button"
                      onClick={() => removeDetailItem(i)}
                      className="text-red-700 hover:text-red-900 cursor-pointer"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
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
                {initialProduct
                  ? isArabic
                    ? "حفظ التعديلات"
                    : "Update Garment"
                  : isArabic
                  ? "إضافة للكتالوج"
                  : "Publish Garment"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
