"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Lock, ArrowRight, CheckCircle2, LogOut } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, user, login, logout } = useCart();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      login(email, mode === "register" ? name : undefined);
      setSubmitted(false);
      setEmail("");
      setPassword("");
      setName("");
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAuthOpen(false)}
          className="fixed inset-0 bg-[#2a2c24]/60 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-[#f7f5f0] border border-[#e2ded5] rounded-3xl p-6 md:p-8 shadow-2xl z-10 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsAuthOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#e2ded5]/40 text-[#3f4236] hover:bg-[#e2ded5] transition cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* User Profile View if logged in */}
          {user ? (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 bg-[#2a2c24] text-[#ddb892] rounded-full flex items-center justify-center mx-auto text-2xl font-serif font-bold shadow-md">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-serif font-bold text-[#2a2c24]">
                  Welcome, {user.name}
                </h3>
                <p className="text-xs text-[#6b705c]">{user.email}</p>
              </div>

              <div className="p-4 bg-[#e2ded5]/40 rounded-2xl border border-[#e2ded5] text-left text-xs space-y-2">
                <div className="flex justify-between text-[#3f4236]">
                  <span className="font-semibold">Account Status:</span>
                  <span className="text-[#6b705c] font-bold">Active Member</span>
                </div>
                <div className="flex justify-between text-[#3f4236]">
                  <span className="font-semibold">Sustainability Points:</span>
                  <span className="font-bold text-[#2a2c24]">150 pts</span>
                </div>
              </div>

              <button
                onClick={logout}
                className="w-full bg-[#3f4236] text-[#f4f1de] py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-800 transition duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          ) : (
            <>
              {/* Brand Header */}
              <div className="text-center space-y-2 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#6b705c]">
                  Duja Naturals
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#2a2c24]">
                  {mode === "login" ? "Welcome Back" : "Join Duja"}
                </h2>
                <p className="text-xs text-[#3f4236]/70">
                  {mode === "login"
                    ? "Access your minimalist wardrobe & order status."
                    : "Create an account for personalized styling & order tracking."}
                </p>
              </div>

              {/* Mode Tabs */}
              <div className="flex bg-[#e2ded5]/50 p-1 rounded-2xl mb-6 border border-[#e2ded5]">
                <button
                  onClick={() => setMode("login")}
                  className={`flex-1 py-2 text-xs font-semibold rounded-xl transition duration-200 cursor-pointer ${
                    mode === "login"
                      ? "bg-[#2a2c24] text-white shadow-xs"
                      : "text-[#3f4236] hover:text-[#2a2c24]"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setMode("register")}
                  className={`flex-1 py-2 text-xs font-semibold rounded-xl transition duration-200 cursor-pointer ${
                    mode === "register"
                      ? "bg-[#2a2c24] text-white shadow-xs"
                      : "text-[#3f4236] hover:text-[#2a2c24]"
                  }`}
                >
                  Create Account
                </button>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-3">
                  <CheckCircle2 size={40} className="mx-auto text-[#6b705c]" />
                  <h3 className="font-serif font-bold text-lg text-[#2a2c24]">
                    Success!
                  </h3>
                  <p className="text-xs text-[#3f4236]/70">Logging you in...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {mode === "register" && (
                    <div className="space-y-1 text-left">
                      <label className="font-bold text-[11px] uppercase tracking-wider text-[#3f4236]">
                        Full Name
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-3.5 top-3 text-[#6b705c]" />
                        <input
                          type="text"
                          required
                          placeholder="Elena Rostova"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-[#fcfbf9] border border-[#e2ded5] focus:border-[#3f4236] focus:ring-1 focus:ring-[#3f4236] rounded-xl pl-10 pr-4 py-2.5 outline-none transition text-[#2a2c24]"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1 text-left">
                    <label className="font-bold text-[11px] uppercase tracking-wider text-[#3f4236]">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-3 text-[#6b705c]" />
                      <input
                        type="email"
                        required
                        placeholder="elena@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#fcfbf9] border border-[#e2ded5] focus:border-[#3f4236] focus:ring-1 focus:ring-[#3f4236] rounded-xl pl-10 pr-4 py-2.5 outline-none transition text-[#2a2c24]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="font-bold text-[11px] uppercase tracking-wider text-[#3f4236]">
                      Password
                    </label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-3 text-[#6b705c]" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#fcfbf9] border border-[#e2ded5] focus:border-[#3f4236] focus:ring-1 focus:ring-[#3f4236] rounded-xl pl-10 pr-4 py-2.5 outline-none transition text-[#2a2c24]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#3f4236] text-[#f4f1de] py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#6b705c] transition duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2"
                  >
                    {mode === "login" ? "Sign In" : "Register"}
                    <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
