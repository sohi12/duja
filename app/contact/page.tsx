"use client";

import React, { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 pt-12 pb-20 space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-3 max-w-xl mx-auto"
      >
        <div className="inline-flex items-center gap-3">
          <span className="w-6 h-[1px] bg-[#6b705c]"></span>
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#6b705c]">
            Get In Touch
          </span>
          <span className="w-6 h-[1px] bg-[#6b705c]"></span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2a2c24]">
          We’d Love to Hear From You
        </h1>
        <p className="text-xs md:text-sm text-[#3f4236]/80 leading-relaxed">
          Have a question about your order, sizing, or custom styling? Drop us a
          line below.
        </p>
      </motion.div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-5 gap-8 items-start">
        {/* Left Info Card (2 Columns) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-2 bg-[#2a2c24] text-[#f4f1de] p-8 rounded-3xl border border-[#3f4236] space-y-8 shadow-xl"
        >
          <div>
            <h3 className="font-serif font-bold text-xl text-white mb-2">
              Customer Care
            </h3>
            <p className="text-xs text-[#ddb892]/80 leading-relaxed">
              Our team is available Saturday to Thursday to assist you with any
              inquiries.
            </p>
          </div>

          <div className="space-y-6 text-xs">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-[#3f4236] rounded-xl text-[#ddb892]">
                <Mail size={18} />
              </div>
              <div>
                <p className="font-bold text-white uppercase text-[10px] tracking-wider">
                  Email Us
                </p>
                <p className="text-[#ddb892]/90 mt-0.5">hello@dujabrand.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-[#3f4236] rounded-xl text-[#ddb892]">
                <Phone size={18} />
              </div>
              <div>
                <p className="font-bold text-white uppercase text-[10px] tracking-wider">
                  Call / WhatsApp
                </p>
                <p className="text-[#ddb892]/90 mt-0.5">+20 100 000 0000</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-[#3f4236] rounded-xl text-[#ddb892]">
                <MapPin size={18} />
              </div>
              <div>
                <p className="font-bold text-white uppercase text-[10px] tracking-wider">
                  Design Studio
                </p>
                <p className="text-[#ddb892]/90 mt-0.5">Cairo, Egypt</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#3f4236] text-[10px] text-[#ddb892]/60">
            Response time: Within 24 hours.
          </div>
        </motion.div>

        {/* Right Form Card (3 Columns) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="md:col-span-3 bg-[#e2ded5]/40 p-8 rounded-3xl border border-[#e2ded5] shadow-xs"
        >
          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <CheckCircle2 size={48} className="mx-auto text-[#6b705c]" />
              <h3 className="font-serif font-bold text-2xl text-[#2a2c24]">
                Message Sent!
              </h3>
              <p className="text-xs text-[#3f4236]/80 max-w-xs mx-auto">
                Thank you for reaching out to Duja. Weve received your note and
                will reply shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#3f4236]">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane"
                    className="w-full bg-[#f7f5f0] border border-[#e2ded5] focus:border-[#3f4236] rounded-xl px-4 py-2.5 text-xs text-[#2a2c24] outline-none transition"
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#3f4236]">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Doe"
                    className="w-full bg-[#f7f5f0] border border-[#e2ded5] focus:border-[#3f4236] rounded-xl px-4 py-2.5 text-xs text-[#2a2c24] outline-none transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#3f4236]">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="jane@example.com"
                  className="w-full bg-[#f7f5f0] border border-[#e2ded5] focus:border-[#3f4236] rounded-xl px-4 py-2.5 text-xs text-[#2a2c24] outline-none transition"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#3f4236]">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help you?"
                  className="w-full bg-[#f7f5f0] border border-[#e2ded5] focus:border-[#3f4236] rounded-xl px-4 py-2.5 text-xs text-[#2a2c24] outline-none transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#3f4236] text-[#fcfbf9] py-3.5 rounded-xl text-xs font-semibold uppercase tracking-widest hover:bg-[#6b705c] transition duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                Send Message <Send size={14} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
