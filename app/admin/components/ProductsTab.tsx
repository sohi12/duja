"use client";

import React, { useState, useMemo } from "react";
import { useStore } from "../../context/StoreContext";
import { Product } from "../../data/products";
import {
  Plus,
  Search,
  SlidersHorizontal,
  Edit2,
  Trash2,
  ExternalLink,
  Sparkles,
  Check,
  X,
  Package,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AddEditProductModal from "./AddEditProductModal";
import Link from "next/link";

interface ProductsTabProps {
  isArabic: boolean;
}

export default function ProductsTab({ isArabic }: ProductsTabProps) {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleStock,
    toggleFeatured,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [stockFilter, setStockFilter] = useState<"all" | "inStock" | "outOfStock">("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Product | null>(null);

  const categories = ["All", "Blouses", "Tops", "Dresses", "Trousers", "Outerwear"];

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCat = selectedCategory === "All" || product.category === selectedCategory;

        const matchesStock =
          stockFilter === "all"
            ? true
            : stockFilter === "inStock"
            ? product.inStock
            : !product.inStock;

        return matchesSearch && matchesCat && matchesStock;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, searchQuery, selectedCategory, stockFilter, sortBy]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (productData: any) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
  };

  const confirmDelete = () => {
    if (deleteCandidate) {
      deleteProduct(deleteCandidate.id);
      setDeleteCandidate(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#e2ded5] shadow-xs">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#6b705c]">
            {isArabic ? "كتالوج القطع والمخزون" : "Garment Catalog & Inventory"}
          </span>
          <h2 className="text-2xl font-serif font-bold text-[#2a2c24]">
            {isArabic ? "إدارة تشكيلة الملابس" : "Manage Collections"}
          </h2>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#2a2c24] text-[#f4f1de] hover:bg-[#3f4236] px-5 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md"
        >
          <Plus size={16} className="text-[#ddb892]" />
          {isArabic ? "إضافة قطعة جديدة" : "Add New Garment"}
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-5 rounded-3xl border border-[#e2ded5] shadow-xs space-y-4">
        <div className="grid md:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search size={16} className="absolute left-3.5 top-3.5 text-[#6b705c]" />
            <input
              type="text"
              placeholder={isArabic ? "ابحث باسم القطعة، الخامة، التصنيف..." : "Search garment, fabric, category..."}
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

          {/* Stock filter */}
          <div className="md:col-span-4 flex bg-[#f7f5f0] p-1 rounded-xl border border-[#e2ded5] text-xs">
            <button
              onClick={() => setStockFilter("all")}
              className={`flex-1 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                stockFilter === "all" ? "bg-[#2a2c24] text-white" : "text-[#3f4236]"
              }`}
            >
              {isArabic ? "الكل" : "All"} ({products.length})
            </button>
            <button
              onClick={() => setStockFilter("inStock")}
              className={`flex-1 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                stockFilter === "inStock" ? "bg-[#2a2c24] text-white" : "text-[#3f4236]"
              }`}
            >
              {isArabic ? "متوفر" : "In Stock"} ({products.filter((p) => p.inStock).length})
            </button>
            <button
              onClick={() => setStockFilter("outOfStock")}
              className={`flex-1 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                stockFilter === "outOfStock" ? "bg-[#2a2c24] text-white" : "text-[#3f4236]"
              }`}
            >
              {isArabic ? "نفد" : "Out of Stock"}
            </button>
          </div>

          {/* Sort By */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-[#f7f5f0] border border-[#e2ded5] focus:border-[#2a2c24] p-2.5 rounded-xl text-xs outline-none text-[#2a2c24] cursor-pointer"
            >
              <option value="featured">{isArabic ? "الترتيب: المميز أولاً" : "Sort: Featured First"}</option>
              <option value="price-asc">{isArabic ? "السعر: من الأقل للأعلى" : "Price: Low to High"}</option>
              <option value="price-desc">{isArabic ? "السعر: من الأعلى للأقل" : "Price: High to Low"}</option>
              <option value="name">{isArabic ? "الاسم: أبجدياً" : "Name: A to Z"}</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-[#e2ded5]">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                  isSelected
                    ? "bg-[#6b705c] text-white shadow-xs"
                    : "bg-[#f7f5f0] text-[#3f4236] hover:bg-[#e2ded5]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Table / Cards Grid */}
      <div className="bg-white rounded-3xl border border-[#e2ded5] shadow-xs overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <Package size={40} className="mx-auto text-[#6b705c]" />
            <h3 className="font-serif font-bold text-lg text-[#2a2c24]">
              {isArabic ? "لم يتم العثور على قطع تطابق البحث" : "No garments found"}
            </h3>
            <p className="text-xs text-[#6b705c]">
              {isArabic ? "جرّب تغيير كلمات البحث أو الفلاتر" : "Try adjusting your search terms or filters."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-[#f7f5f0] text-[#6b705c] uppercase text-[10px] tracking-wider border-b border-[#e2ded5]">
                <tr>
                  <th className="py-3.5 px-4 font-bold">{isArabic ? "القطعة" : "Garment"}</th>
                  <th className="py-3.5 px-4 font-bold">{isArabic ? "التصنيف" : "Category"}</th>
                  <th className="py-3.5 px-4 font-bold">{isArabic ? "السعر" : "Price"}</th>
                  <th className="py-3.5 px-4 font-bold">{isArabic ? "المقاسات" : "Sizes"}</th>
                  <th className="py-3.5 px-4 font-bold">{isArabic ? "الحالة بالمخزن" : "Stock"}</th>
                  <th className="py-3.5 px-4 font-bold">{isArabic ? "مميز" : "Featured"}</th>
                  <th className="py-3.5 px-4 font-bold text-right">{isArabic ? "إجراءات" : "Actions"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2ded5]">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-[#f7f5f0]/60 transition">
                    {/* Garment Image & Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#f6f7f3] border border-[#e2ded5] overflow-hidden shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-xs text-[#2a2c24]">
                            {product.name}
                          </h4>
                          <span className="text-[10px] text-[#6b705c] font-mono">
                            ID: #{product.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="bg-[#e2ded5]/50 text-[#2a2c24] px-2.5 py-1 rounded-full text-[10px] font-bold">
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-bold text-[#2a2c24] font-mono text-xs">
                      {product.price} EGP
                    </td>

                    {/* Sizes */}
                    <td className="py-3.5 px-4">
                      <div className="flex gap-1">
                        {product.sizes.map((s) => (
                          <span
                            key={s}
                            className="w-5 h-5 rounded-md bg-[#e2ded5]/40 text-[#2a2c24] text-[9px] font-bold flex items-center justify-center"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Stock Status Switch */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleStock(product.id)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold transition cursor-pointer flex items-center gap-1 ${
                          product.inStock
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-rose-100 text-rose-800 hover:bg-rose-200"
                        }`}
                        title={isArabic ? "انقر للتبديل" : "Click to toggle"}
                      >
                        {product.inStock ? (
                          <>
                            <Check size={10} />
                            {isArabic ? "متوفر" : "In Stock"}
                          </>
                        ) : (
                          <>
                            <X size={10} />
                            {isArabic ? "نفد" : "Out of Stock"}
                          </>
                        )}
                      </button>
                    </td>

                    {/* Featured toggle */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleFeatured(product.id)}
                        className={`p-1.5 rounded-lg transition cursor-pointer ${
                          product.featured
                            ? "bg-[#2a2c24] text-[#ddb892]"
                            : "text-[#6b705c] hover:bg-[#e2ded5]/40"
                        }`}
                        title={product.featured ? "Featured in capsule" : "Mark as featured"}
                      >
                        <Sparkles size={14} />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/collection/${product.id}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-[#e2ded5]/40 hover:bg-[#e2ded5] text-[#3f4236] transition cursor-pointer"
                          title={isArabic ? "معاينة بالمتجر" : "Preview in Store"}
                        >
                          <ExternalLink size={13} />
                        </Link>
                        <button
                          onClick={() => handleOpenEdit(product)}
                          className="p-1.5 rounded-lg bg-[#e2ded5]/40 hover:bg-[#2a2c24] hover:text-white text-[#3f4236] transition cursor-pointer"
                          title={isArabic ? "تعديل" : "Edit"}
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => setDeleteCandidate(product)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 transition cursor-pointer"
                          title={isArabic ? "حذف" : "Delete"}
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <AddEditProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProduct}
          initialProduct={editingProduct}
          isArabic={isArabic}
        />
      )}

      {/* Delete Confirmation Modal */}
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
              {isArabic ? "تأكيد حذف القطعة" : "Delete Garment?"}
            </h3>
            <p className="text-xs text-[#6b705c] leading-relaxed">
              {isArabic
                ? `هل أنت متأكد من رغبتك في حذف "${deleteCandidate.name}" من الكتالوج؟`
                : `Are you sure you want to remove "${deleteCandidate.name}" from your collection?`}
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeleteCandidate(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#e2ded5] font-bold text-xs text-[#3f4236] hover:bg-[#e2ded5]/40 transition cursor-pointer"
              >
                {isArabic ? "إلغاء" : "Cancel"}
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 font-bold text-xs text-white transition cursor-pointer shadow-md"
              >
                {isArabic ? "نعم، حذف" : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
