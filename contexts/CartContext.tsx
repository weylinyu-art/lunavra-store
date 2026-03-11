"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const CART_KEY = "nilechic_cart_count";

interface CartContextType {
  count: number;
  addItem: (qty?: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      setCount(stored ? parseInt(stored, 10) : 0);
    } catch {
      setCount(0);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(CART_KEY, String(count));
    } catch {
      /* ignore */
    }
  }, [count, mounted]);

  const addItem = (qty = 1) => {
    setCount((prev) => prev + qty);
  };

  return (
    <CartContext.Provider value={{ count, addItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
