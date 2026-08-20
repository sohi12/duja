"use client";

import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  User,
  MessageSquare,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Order Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Order Inquiry",
        message: "",
      });
    }, 4000);
  };

  const faqs = [
    {
      q: "What is your average delivery timeframe?",
      a: "Orders within Greater Cairo and Giza are delivered within 2-3 business days. Other governorates across Egypt take 3-5 business days.",
    },
    {
      q: "Can I request custom sleeve or hem length adjustments?",
      a: "Yes! We offer complimentary minor length tailoring on selected organic linen blouses. Mention your request in the order notes or contact us before shipping.",
    },
    {
      q: "How should I care for 100% Egyptian flax linen?",
      a: "Hand wash or gentle machine wash in cold water with mild detergent. Air dry in shade to preserve the natural plant fibers and rich earthy dye.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 pt-12 pb-20 space-y-16">
      {/* 1. Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-3 max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-3">
          <span className="w-8 h-[1px] bg-[#6b705c]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6b705c]">
            Duja Styling Concierge
          </span>
          <span className="w-8 h-[1px] bg-[#6b705c]" />
        </div>

        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2a2c24]">
          We’re Here for You
        </h1>

        <p className="text-xs md:text-sm text-[#3f4236]/80 leading-relaxed">
          Whether you need assistance with custom measurements, order updates, or garment care recommendations, our team is at your service.
        </p>
      </motion.div>

      {/* 2. Main Contact Grid */}
      <div className="grid md:grid-cols-5 gap-8 items-stretch">
        {/* Left Column: Dark Studio Card (2 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-2 bg-[#2a2c24] text-[#f4f1de] p-8 rounded-3xl border border-[#3f4236] flex flex-col justify-between space-y-8 shadow-xl relative overflow-hidden"
        >
          {/* Subtle Aesthetic Glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#ddb892]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#ddb892]">
                Cairo Studio
              </span>
              <h3 className="font-serif font-bold text-2xl text-white mt-1">
                Direct Contact
              </h3>
              <p className="text-xs text-[#ddb892]/80 leading-relaxed mt-2">
                Available Saturday to Thursday from 10:00 AM to 8:00 PM (Cairo Time).
              </p>
            </div>

            <div className="space-y-5 text-xs">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#3f4236] rounded-2xl text-[#ddb892] shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="font-bold text-white uppercase text-[10px] tracking-wider">
                    Email Support
                  </p>
                  <a
                    href="mailto:hello@dujabrand.com"
                    className="text-[#ddb892]/90 hover:text-white mt-0.5 block transition font-medium"
                  >
                    hello@dujabrand.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#3f4236] rounded-2xl text-[#ddb892] shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="font-bold text-white uppercase text-[10px] tracking-wider">
                    WhatsApp & Phone
                  </p>
                  <a
                    href="https://wa.me/201000000000"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#ddb892]/90 hover:text-white mt-0.5 block transition font-medium"
                  >
                    +20 100 000 0000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#3f4236] rounded-2xl text-[#ddb892] shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="font-bold text-white uppercase text-[10px] tracking-wider">
                    Atelier Location
                  </p>
                  <p className="text-[#ddb892]/90 mt-0.5 font-medium">
                    22 Brasil Street, Zamalek, Cairo
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#3f4236] flex items-center justify-between text-[10px] text-[#ddb892]/70">
            <span className="flex items-center gap-1.5">
              <Clock size={13} /> Avg response: &lt; 2 hours
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles size={13} /> Tailored Advice
            </span>
          </div>
        </motion.div>

        {/* Right Column: Clean Form Container (3 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="md:col-span-3 bg-white p-8 md:p-10 rounded-3xl border border-[#e2ded5] shadow-xs flex flex-col justify-between"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 text-center space-y-4"
            >
              <div className="w-16 h-16 bg-[#e8ebe0] text-[#6b705c] rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#2a2c24]">
                Message Sent Successfully!
              </h3>
              <p className="text-xs text-[#3f4236]/80 max-w-xs mx-auto leading-relaxed">
                Thank you for contacting Duja. Your inquiry has been routed to our concierge team and we will respond via email/WhatsApp shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-xl text-[#2a2c24]">
                  Send Us a Note
                </h3>
                <p className="text-xs text-[#3f4236]/70">
                  Fill out the form below and we will get back to you promptly.
                </p>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5 text-left">
                <label className="font-bold text-[11px] uppercase tracking-wider text-[#3f4236] flex items-center gap-1.5">
                  <User size={13} className="text-[#6b705c]" /> Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Layla Ahmed"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#fdfbf7] border border-[#e2ded5] focus:border-[#2a2c24] focus:bg-white rounded-xl px-4 py-3 text-xs text-[#2a2c24] outline-none transition shadow-2xs placeholder:text-[#3f4236]/40"
                />
              </div>

              {/* Email & Phone Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="font-bold text-[11px] uppercase tracking-wider text-[#3f4236] flex items-center gap-1.5">
                    <Mail size={13} className="text-[#6b705c]" /> Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="layla@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#fdfbf7] border border-[#e2ded5] focus:border-[#2a2c24] focus:bg-white rounded-xl px-4 py-3 text-xs text-[#2a2c24] outline-none transition shadow-2xs placeholder:text-[#3f4236]/40"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="font-bold text-[11px] uppercase tracking-wider text-[#3f4236] flex items-center gap-1.5">
                    <Phone size={13} className="text-[#6b705c]" /> Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+20 100 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#fdfbf7] border border-[#e2ded5] focus:border-[#2a2c24] focus:bg-white rounded-xl px-4 py-3 text-xs text-[#2a2c24] outline-none transition shadow-2xs placeholder:text-[#3f4236]/40"
                  />
                </div>
              </div>

              {/* Subject Dropdown */}
              <div className="space-y-1.5 text-left">
                <label className="font-bold text-[11px] uppercase tracking-wider text-[#3f4236] flex items-center gap-1.5">
                  <HelpCircle size={13} className="text-[#6b705c]" /> How can we help?
                </label>
                <div className="relative">
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#fdfbf7] border border-[#e2ded5] focus:border-[#2a2c24] focus:bg-white rounded-xl px-4 py-3 text-xs text-[#2a2c24] outline-none transition cursor-pointer appearance-none shadow-2xs"
                  >
                    <option value="Order Inquiry">Order Inquiry & Shipment Tracking</option>
                    <option value="Custom Sizing">Custom Fit & Sleeves Tailoring</option>
                    <option value="Return / Exchange">Return or Size Exchange Request</option>
                    <option value="General Brand Question">General Customer Care</option>
                  </select>
                  <ChevronDown
                    size={15}
                    className="absolute right-3.5 top-3.5 text-[#6b705c] pointer-events-none"
                  />
                </div>
              </div>

              {/* Message Textarea */}
              <div className="space-y-1.5 text-left">
                <label className="font-bold text-[11px] uppercase tracking-wider text-[#3f4236] flex items-center gap-1.5">
                  <MessageSquare size={13} className="text-[#6b705c]" /> Your Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details about your request..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#fdfbf7] border border-[#e2ded5] focus:border-[#2a2c24] focus:bg-white rounded-xl px-4 py-3 text-xs text-[#2a2c24] outline-none transition resize-none shadow-2xs placeholder:text-[#3f4236]/40"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#2a2c24] text-[#fcfbf9] py-3.5 rounded-xl text-xs font-semibold uppercase tracking-widest hover:bg-[#3f4236] transition duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                Send Message <Send size={14} />
              </button>
            </form>
          )}
        </motion.div>
      </div>

      {/* 3. Quick FAQ Accordion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto space-y-6 pt-6 border-t border-[#e2ded5]"
      >
        <div className="text-center space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#6b705c]">
            Quick Assistance
          </span>
          <h3 className="font-serif font-bold text-2xl text-[#2a2c24]">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#e2ded5] rounded-2xl overflow-hidden transition"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-4 flex justify-between items-center text-left font-serif font-bold text-xs text-[#2a2c24] cursor-pointer hover:text-[#6b705c] transition"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 text-[#6b705c] ${
                    activeFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4 text-xs text-[#3f4236]/80 leading-relaxed border-t border-[#f7f5f0] pt-2"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
