"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { PRODUCTS, type Product } from "../data/products";
export type { Product };

export interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color?: string;
  image?: string;
}

export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  city: string;
  address: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  shippingFee: number;
  totalPrice: number;
  paymentMethod: "cod" | "instapay";
  status: OrderStatus;
  createdAt: string; // ISO String
}

export interface Coupon {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number; // e.g. 15 for 15% or 100 for 100 EGP
  minOrderAmount?: number;
  usageCount: number;
  maxUses?: number;
  isActive: boolean;
  expiresAt?: string;
}

export interface StoreSettings {
  storeName: string;
  currency: string;
  whatsappNumber: string;
  instapayNumber: string;
  supportEmail: string;
  shippingFeeCairo: number;
  shippingFeeGovernorates: number;
  freeShippingThreshold: number;
  announcementActive: boolean;
  announcementText: string;
  announcementTextAr: string;
  heroBadgeText: string;
  adminPin: string;
  isPinRequired: boolean;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  sustainabilityPoints: number;
  isVip: boolean;
  notes?: string;
  lastOrderDate: string;
}

// Initial Sample Orders
const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-101",
    orderNumber: "DUJA-8492",
    customerName: "Nouran Mansour",
    customerPhone: "01012345678",
    customerEmail: "nouran.m@gmail.com",
    city: "Cairo (Zamalek)",
    address: "14 Brazil St, Apt 3B",
    notes: "Please call before delivery",
    items: [
      {
        id: "1",
        name: "Sand Minimalist Linen Blouse",
        price: 1100,
        quantity: 1,
        size: "M",
        color: "Sand",
        image: "/products/1.jpeg",
      },
      {
        id: "6",
        name: "Sand Wide-Leg Linen Trousers",
        price: 1350,
        quantity: 1,
        size: "M",
        color: "Sand",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
      },
    ],
    subtotal: 2450,
    discountAmount: 245,
    couponCode: "DUJA10",
    shippingFee: 0,
    totalPrice: 2205,
    paymentMethod: "instapay",
    status: "Processing",
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
  },
  {
    id: "ord-102",
    orderNumber: "DUJA-8491",
    customerName: "Youssef El-Husseiny",
    customerPhone: "01198765432",
    customerEmail: "youssef.h@outlook.com",
    city: "Giza (Sheikh Zayed)",
    address: "Allegria Compound, Villa 42",
    items: [
      {
        id: "5",
        name: "Natural Raw Linen Maxi Dress",
        price: 1650,
        quantity: 1,
        size: "S",
        color: "Natural",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
      },
    ],
    subtotal: 1650,
    discountAmount: 0,
    shippingFee: 50,
    totalPrice: 1700,
    paymentMethod: "cod",
    status: "Shipped",
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
  },
  {
    id: "ord-103",
    orderNumber: "DUJA-8490",
    customerName: "Salma Abdelkader",
    customerPhone: "01234567890",
    customerEmail: "salma.kader@yahoo.com",
    city: "Alexandria (Kafr Abdo)",
    address: "22 Ismaileya St, 4th Floor",
    items: [
      {
        id: "3",
        name: "Terracotta Wrap Linen Blouse",
        price: 1050,
        quantity: 2,
        size: "L",
        color: "Terracotta",
        image: "/products/3.jpeg",
      },
    ],
    subtotal: 2100,
    discountAmount: 315,
    couponCode: "WELCOME15",
    shippingFee: 70,
    totalPrice: 1855,
    paymentMethod: "instapay",
    status: "Delivered",
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
  },
  {
    id: "ord-104",
    orderNumber: "DUJA-8489",
    customerName: "Farida El-Gazzar",
    customerPhone: "01055566778",
    city: "Cairo (New Cairo)",
    address: "Fifth Settlement, District 5",
    items: [
      {
        id: "2",
        name: "Olive Earth Cotton Blouse",
        price: 980,
        quantity: 1,
        size: "S",
        color: "Olive",
        image: "/products/2.jpeg",
      },
    ],
    subtotal: 980,
    discountAmount: 0,
    shippingFee: 50,
    totalPrice: 1030,
    paymentMethod: "cod",
    status: "Pending",
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
];

// Initial Sample Coupons
const INITIAL_COUPONS: Coupon[] = [
  {
    id: "c-1",
    code: "DUJA10",
    discountType: "percentage",
    discountValue: 10,
    minOrderAmount: 1000,
    usageCount: 24,
    isActive: true,
  },
  {
    id: "c-2",
    code: "WELCOME15",
    discountType: "percentage",
    discountValue: 15,
    minOrderAmount: 800,
    usageCount: 42,
    isActive: true,
  },
  {
    id: "c-3",
    code: "LINEN20",
    discountType: "percentage",
    discountValue: 20,
    minOrderAmount: 2500,
    usageCount: 11,
    isActive: true,
  },
  {
    id: "c-4",
    code: "SAVEEGP100",
    discountType: "fixed",
    discountValue: 100,
    minOrderAmount: 1200,
    usageCount: 8,
    isActive: true,
  },
];

// Default Settings
const DEFAULT_SETTINGS: StoreSettings = {
  storeName: "Duja Slow Fashion",
  currency: "EGP",
  whatsappNumber: "+201000000000",
  instapayNumber: "01000000000",
  supportEmail: "care@dujabrand.com",
  shippingFeeCairo: 50,
  shippingFeeGovernorates: 75,
  freeShippingThreshold: 2000,
  announcementActive: true,
  announcementText: "🌿 Complimentary shipping across Egypt on orders above 2,000 EGP | Use code DUJA10 for 10% off",
  announcementTextAr: "🌿 شحن مجاني لجميع محافظات مصر للطلبات فوق 2000 ج.م | كود الخصم: DUJA10",
  heroBadgeText: "Editorial Capsule 2026",
  adminPin: "1234",
  isPinRequired: false,
};

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleStock: (id: string) => void;
  toggleFeatured: (id: string) => void;
  getProductById: (id: string) => Product | undefined;

  // Orders
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "orderNumber" | "createdAt">) => Order;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  deleteOrder: (id: string) => void;

  // Coupons
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, "id" | "usageCount">) => Coupon;
  updateCoupon: (id: string, updates: Partial<Coupon>) => void;
  toggleCoupon: (id: string) => void;
  deleteCoupon: (id: string) => void;
  validateCoupon: (code: string, subtotal: number) => { valid: boolean; discountAmount: number; message: string; coupon?: Coupon };

  // Settings
  settings: StoreSettings;
  updateSettings: (updates: Partial<StoreSettings>) => void;
  resetToDefaults: () => void;

  // Customers
  customers: Customer[];
  updateCustomerNote: (id: string, note: string) => void;
  toggleCustomerVip: (id: string) => void;

  // Global State Helpers
  isInitialized: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
  const [customerNotes, setCustomerNotes] = useState<Record<string, { notes?: string; isVip?: boolean }>>({});

  // 1. Initial Load from LocalStorage
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem("duja_products");
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      } else {
        setProducts(PRODUCTS);
        localStorage.setItem("duja_products", JSON.stringify(PRODUCTS));
      }

      const savedOrders = localStorage.getItem("duja_orders");
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        setOrders(INITIAL_ORDERS);
        localStorage.setItem("duja_orders", JSON.stringify(INITIAL_ORDERS));
      }

      const savedCoupons = localStorage.getItem("duja_coupons");
      if (savedCoupons) {
        setCoupons(JSON.parse(savedCoupons));
      } else {
        setCoupons(INITIAL_COUPONS);
        localStorage.setItem("duja_coupons", JSON.stringify(INITIAL_COUPONS));
      }

      const savedSettings = localStorage.getItem("duja_settings");
      if (savedSettings) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) });
      } else {
        setSettings(DEFAULT_SETTINGS);
        localStorage.setItem("duja_settings", JSON.stringify(DEFAULT_SETTINGS));
      }

      const savedCustomerNotes = localStorage.getItem("duja_customer_metadata");
      if (savedCustomerNotes) {
        setCustomerNotes(JSON.parse(savedCustomerNotes));
      }
    } catch (e) {
      console.error("Failed to load store data from localStorage", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // 2. Persist state changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("duja_products", JSON.stringify(products));
    } catch (e) {
      console.error("Failed to save products", e);
    }
  }, [products, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("duja_orders", JSON.stringify(orders));
    } catch (e) {
      console.error("Failed to save orders", e);
    }
  }, [orders, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("duja_coupons", JSON.stringify(coupons));
    } catch (e) {
      console.error("Failed to save coupons", e);
    }
  }, [coupons, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("duja_settings", JSON.stringify(settings));
    } catch (e) {
      console.error("Failed to save settings", e);
    }
  }, [settings, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("duja_customer_metadata", JSON.stringify(customerNotes));
    } catch (e) {
      console.error("Failed to save customer metadata", e);
    }
  }, [customerNotes, isInitialized]);

  // Product Operations
  const addProduct = (productData: Omit<Product, "id">): Product => {
    const newId = (products.length + 1 + Math.floor(Math.random() * 1000)).toString();
    const newProduct: Product = {
      ...productData,
      id: newId,
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleStock = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const toggleFeatured = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  // Order Operations
  const addOrder = (orderData: Omit<Order, "id" | "orderNumber" | "createdAt">): Order => {
    const id = `ord-${Date.now()}`;
    const orderNumber = `DUJA-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      ...orderData,
      id,
      orderNumber,
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);

    // If coupon was used, increment coupon usage
    if (newOrder.couponCode) {
      setCoupons((prev) =>
        prev.map((c) =>
          c.code.toUpperCase() === newOrder.couponCode?.toUpperCase()
            ? { ...c, usageCount: c.usageCount + 1 }
            : c
        )
      );
    }

    return newOrder;
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  // Coupon Operations
  const addCoupon = (couponData: Omit<Coupon, "id" | "usageCount">): Coupon => {
    const newCoupon: Coupon = {
      ...couponData,
      id: `c-${Date.now()}`,
      usageCount: 0,
      code: couponData.code.trim().toUpperCase(),
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    return newCoupon;
  };

  const updateCoupon = (id: string, updates: Partial<Coupon>) => {
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              ...updates,
              code: updates.code ? updates.code.trim().toUpperCase() : c.code,
            }
          : c
      )
    );
  };

  const toggleCoupon = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  const validateCoupon = (
    code: string,
    subtotal: number
  ): { valid: boolean; discountAmount: number; message: string; coupon?: Coupon } => {
    if (!code || !code.trim()) {
      return { valid: false, discountAmount: 0, message: "Please enter a coupon code" };
    }

    const trimmed = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === trimmed);

    if (!found) {
      return { valid: false, discountAmount: 0, message: "Invalid coupon code" };
    }

    if (!found.isActive) {
      return { valid: false, discountAmount: 0, message: "This coupon is currently inactive" };
    }

    if (found.expiresAt && new Date(found.expiresAt) < new Date()) {
      return { valid: false, discountAmount: 0, message: "This coupon has expired" };
    }

    if (found.maxUses && found.usageCount >= found.maxUses) {
      return { valid: false, discountAmount: 0, message: "Coupon usage limit reached" };
    }

    if (found.minOrderAmount && subtotal < found.minOrderAmount) {
      return {
        valid: false,
        discountAmount: 0,
        message: `Minimum order for this coupon is ${found.minOrderAmount} EGP`,
      };
    }

    let discountAmount = 0;
    if (found.discountType === "percentage") {
      discountAmount = Math.round((subtotal * found.discountValue) / 100);
    } else {
      discountAmount = Math.min(found.discountValue, subtotal);
    }

    return {
      valid: true,
      discountAmount,
      message: `Coupon ${found.code} applied! (-${discountAmount} EGP)`,
      coupon: found,
    };
  };

  // Settings Operations
  const updateSettings = (updates: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const resetToDefaults = () => {
    setProducts(PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setCoupons(INITIAL_COUPONS);
    setSettings(DEFAULT_SETTINGS);
    setCustomerNotes({});
    try {
      localStorage.setItem("duja_products", JSON.stringify(PRODUCTS));
      localStorage.setItem("duja_orders", JSON.stringify(INITIAL_ORDERS));
      localStorage.setItem("duja_coupons", JSON.stringify(INITIAL_COUPONS));
      localStorage.setItem("duja_settings", JSON.stringify(DEFAULT_SETTINGS));
      localStorage.removeItem("duja_customer_metadata");
    } catch (e) {
      console.error(e);
    }
  };

  // Derived Customers Directory
  const customers: Customer[] = useMemo(() => {
    const map = new Map<string, Customer>();

    orders.forEach((order) => {
      const key = order.customerPhone.trim() || order.customerName.trim().toLowerCase();
      const existing = map.get(key);
      const isDeliveredOrProcessing = order.status !== "Cancelled";
      const orderAmount = isDeliveredOrProcessing ? order.totalPrice : 0;
      const points = isDeliveredOrProcessing ? Math.floor(order.totalPrice / 20) : 0;

      if (!existing) {
        map.set(key, {
          id: `cust-${key.replace(/[^a-zA-Z0-9]/g, "")}`,
          name: order.customerName,
          phone: order.customerPhone,
          email: order.customerEmail,
          city: order.city,
          totalOrders: 1,
          totalSpent: orderAmount,
          sustainabilityPoints: points + 50, // 50 welcome points
          isVip: customerNotes[key]?.isVip || false,
          notes: customerNotes[key]?.notes || "",
          lastOrderDate: order.createdAt,
        });
      } else {
        existing.totalOrders += 1;
        existing.totalSpent += orderAmount;
        existing.sustainabilityPoints += points;
        if (new Date(order.createdAt) > new Date(existing.lastOrderDate)) {
          existing.lastOrderDate = order.createdAt;
        }
      }
    });

    return Array.from(map.values()).sort((a, b) => b.totalSpent - a.totalSpent);
  }, [orders, customerNotes]);

  const updateCustomerNote = (key: string, note: string) => {
    setCustomerNotes((prev) => ({
      ...prev,
      [key]: { ...prev[key], notes: note },
    }));
  };

  const toggleCustomerVip = (key: string) => {
    setCustomerNotes((prev) => ({
      ...prev,
      [key]: { ...prev[key], isVip: !prev[key]?.isVip },
    }));
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStock,
        toggleFeatured,
        getProductById,

        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,

        coupons,
        addCoupon,
        updateCoupon,
        toggleCoupon,
        deleteCoupon,
        validateCoupon,

        settings,
        updateSettings,
        resetToDefaults,

        customers,
        updateCustomerNote,
        toggleCustomerVip,

        isInitialized,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
