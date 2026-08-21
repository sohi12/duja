"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useStore } from "../context/StoreContext";
import { CreditCard, Banknote, Send, ArrowLeft, Tag, Check, X, Sparkles } from "lucide-react";
import Link from "next/link";
import OrderSummary from "./OrderSummary";
import InstaPayBox from "./InstaPayBox";

export default function CheckoutPage() {
  const { cart, clearCart, user } = useCart();
  const { addOrder, validateCoupon, settings } = useStore();

  const [paymentMethod, setPaymentMethod] = useState<"cod" | "instapay">("cod");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: "",
    email: user?.email || "",
    address: "",
    city: "Cairo",
    notes: "",
  });

  // Promo Code State
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountAmount: number;
  } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Dynamic Shipping calculation based on city & threshold
  const isCairoOrGiza =
    formData.city.toLowerCase().includes("cairo") ||
    formData.city.toLowerCase().includes("giza") ||
    formData.city.toLowerCase().includes("sheikh zayed") ||
    formData.city.toLowerCase().includes("new cairo");

  const shippingFee =
    subtotal >= settings.freeShippingThreshold
      ? 0
      : isCairoOrGiza
      ? settings.shippingFeeCairo
      : settings.shippingFeeGovernorates;

  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const totalPrice = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = () => {
    setCouponError(null);
    const res = validateCoupon(couponInput, subtotal);
    if (res.valid) {
      setAppliedCoupon({
        code: couponInput.trim().toUpperCase(),
        discountAmount: res.discountAmount,
      });
      setCouponInput("");
    } else {
      setCouponError(res.message);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // 1. Save order into reactive Store
    const newOrder = addOrder({
      customerName: formData.name.trim(),
      customerPhone: formData.phone.trim(),
      customerEmail: formData.email.trim() || undefined,
      city: formData.city.trim(),
      address: formData.address.trim(),
      notes: formData.notes.trim() || undefined,
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        image: item.image,
      })),
      subtotal,
      discountAmount,
      couponCode: appliedCoupon?.code,
      shippingFee,
      totalPrice,
      paymentMethod,
      status: "Pending",
    });

    // 2. Format WhatsApp Message
    const items = cart
      .map((i) => `- ${i.name} (${i.size}) x${i.quantity} = ${i.price * i.quantity} EGP`)
      .join("\n");

    const msg = `*New Order - Duja Slow Fashion* 🌿\n*Order Number:* ${newOrder.orderNumber}\n\n👤 *Name:* ${formData.name}\n📱 *Phone:* ${formData.phone}\n📍 *Address:* ${formData.address}, ${formData.city}\n\n*Items:*\n${items}\n\n🏷️ *Subtotal:* ${subtotal} EGP${
      discountAmount > 0 ? `\n🎁 *Discount (${appliedCoupon?.code}):* -${discountAmount} EGP` : ""
    }\n🚚 *Shipping:* ${shippingFee === 0 ? "Free" : `${shippingFee} EGP`}\n💰 *Total:* ${totalPrice} EGP\n💳 *Payment:* ${paymentMethod === "cod" ? "Cash on Delivery" : "InstaPay Transfer"}${
      formData.notes ? `\n\n📝 *Notes:* ${formData.notes}` : ""
    }`;

    const cleanWhatsapp = settings.whatsappNumber.replace(/[^0-9]/g, "");
    const targetWhatsapp = cleanWhatsapp.startsWith("20")
      ? cleanWhatsapp
      : cleanWhatsapp.startsWith("0")
      ? `20${cleanWhatsapp.slice(1)}`
      : cleanWhatsapp || "201000000000";

    window.open(
      `https://wa.me/${targetWhatsapp}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );

    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4 px-4">
        <h2 className="font-serif font-bold text-2xl text-[#2a2c24]">
          Your Bag is Empty
        </h2>
        <p className="text-xs text-[#6b705c]">
          Discover our sustainable organic linen capsules.
        </p>
        <Link
          href="/collection"
          className="inline-block bg-[#2a2c24] text-[#f4f1de] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#3f4236] transition shadow-md"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 pt-6 pb-16 space-y-6 text-left">
      <Link
        href="/collection"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6b705c] hover:text-[#2a2c24] transition"
      >
        <ArrowLeft size={14} /> Back to Shop
      </Link>
      <h1 className="text-3xl font-serif font-bold text-[#2a2c24]">Checkout</h1>

      <div className="grid md:grid-cols-5 gap-6 items-start">
        <form
          onSubmit={handleSubmit}
          className="md:col-span-3 space-y-4 text-xs"
        >
          {/* Customer & Address Form */}
          <div className="bg-white p-6 rounded-3xl space-y-3.5 border border-[#e2ded5] shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#6b705c] block">
              1. Delivery Information
            </span>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#3f4236] uppercase tracking-wider">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-[#f7f5f0] border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none text-[#2a2c24]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#3f4236] uppercase tracking-wider">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="010XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full bg-[#f7f5f0] border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none text-[#2a2c24]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#3f4236] uppercase tracking-wider">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-[#f7f5f0] border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none text-[#2a2c24]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#3f4236] uppercase tracking-wider">
                  City / Governorate *
                </label>
                <select
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full bg-[#f7f5f0] border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none text-[#2a2c24] cursor-pointer font-medium"
                >
                  <option value="Cairo">Cairo (القاهرة)</option>
                  <option value="Giza">Giza (الجيزة)</option>
                  <option value="Alexandria">Alexandria (الإسكندرية)</option>
                  <option value="Mansoura">Mansoura (المنصورة)</option>
                  <option value="Tanta">Tanta (طنطا)</option>
                  <option value="Ismailia">Ismailia (الإسماعيلية)</option>
                  <option value="Other Governorates">Other Governorates (باقي المحافظات)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#3f4236] uppercase tracking-wider">
                  Detailed Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Street, Building, Apt #"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full bg-[#f7f5f0] border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none text-[#2a2c24]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#3f4236] uppercase tracking-wider">
                Order Notes / Special Requests
              </label>
              <input
                type="text"
                placeholder="e.g. Call before delivery, ring doorbell..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="w-full bg-[#f7f5f0] border border-[#e2ded5] focus:border-[#2a2c24] p-3 rounded-xl outline-none text-[#2a2c24]"
              />
            </div>
          </div>

          {/* Promo Code Box */}
          <div className="bg-white p-6 rounded-3xl space-y-3 border border-[#e2ded5] shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#6b705c] block">
              2. Promo Code / Voucher
            </span>

            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 p-3 rounded-2xl">
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-emerald-700" />
                  <div>
                    <span className="font-mono font-bold text-xs text-emerald-900">
                      {appliedCoupon.code}
                    </span>
                    <span className="text-[11px] text-emerald-700 ml-2 font-medium">
                      (-{appliedCoupon.discountAmount} EGP applied)
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  className="text-emerald-800 hover:text-red-700 font-bold text-xs cursor-pointer p-1"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3.5 top-3.5 text-[#6b705c]" />
                    <input
                      type="text"
                      placeholder="Try: DUJA10 or WELCOME15"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="w-full bg-[#f7f5f0] border border-[#e2ded5] focus:border-[#2a2c24] pl-9 pr-3 py-2.5 rounded-xl uppercase font-mono text-xs outline-none text-[#2a2c24]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="bg-[#2a2c24] hover:bg-[#3f4236] text-white px-5 py-2.5 rounded-xl font-bold transition cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-[11px] text-rose-700 font-semibold">{couponError}</p>
                )}
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-3xl space-y-3.5 border border-[#e2ded5] shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#6b705c] block">
              3. Payment Selection
            </span>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`p-3.5 rounded-2xl border font-bold flex items-center justify-center gap-2 cursor-pointer transition ${
                  paymentMethod === "cod"
                    ? "bg-[#2a2c24] text-white border-[#2a2c24] shadow-sm"
                    : "bg-[#f7f5f0] text-[#3f4236] border-[#e2ded5] hover:bg-[#e2ded5]/40"
                }`}
              >
                <Banknote size={16} /> Cash on Delivery
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("instapay")}
                className={`p-3.5 rounded-2xl border font-bold flex items-center justify-center gap-2 cursor-pointer transition ${
                  paymentMethod === "instapay"
                    ? "bg-[#2a2c24] text-white border-[#2a2c24] shadow-sm"
                    : "bg-[#f7f5f0] text-[#3f4236] border-[#e2ded5] hover:bg-[#e2ded5]/40"
                }`}
              >
                <CreditCard size={16} /> InstaPay
              </button>
            </div>

            {paymentMethod === "instapay" && (
              <InstaPayBox number={settings.instapayNumber || "01000000000"} />
            )}
          </div>

          {/* Place Order CTA Button */}
          <button
            type="submit"
            className="w-full bg-[#2a2c24] text-[#f4f1de] py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-[#3f4236] transition flex justify-center items-center gap-2 cursor-pointer shadow-xl text-xs"
          >
            Confirm & Send Order via WhatsApp <Send size={14} />
          </button>
        </form>

        <div className="md:col-span-2 sticky top-24">
          <OrderSummary
            discountAmount={discountAmount}
            couponCode={appliedCoupon?.code}
            shippingFee={shippingFee}
          />
        </div>
      </div>
    </div>
  );
}
