"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CartItem = {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  size: string;
  color?: string;
};

export type UserProfile = {
  name: string;
  email: string;
} | null;

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string | number, size: string) => void;
  updateQuantity: (id: string | number, size: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  user: UserProfile;
  login: (email: string, name?: string) => void;
  logout: () => void;
  totalPrice: number;
  totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<UserProfile>(null);

  // Load cart & user from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("duja_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedUser = localStorage.getItem("duja_user");
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch (e) {
      console.error("Failed to load local storage state", e);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("duja_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to local storage", e);
    }
  }, [cart]);

  const addToCart = (product: Omit<CartItem, "quantity">, quantity: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.size === product.size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string | number, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id: string | number, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const login = (email: string, name?: string) => {
    const newUser = {
      name: name || email.split("@")[0],
      email,
    };
    setUser(newUser);
    try {
      localStorage.setItem("duja_user", JSON.stringify(newUser));
    } catch (e) {
      console.error(e);
    }
    setIsAuthOpen(false);
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("duja_user");
    } catch (e) {
      console.error(e);
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isAuthOpen,
        setIsAuthOpen,
        user,
        login,
        logout,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
