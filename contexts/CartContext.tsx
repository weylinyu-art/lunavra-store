"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const CART_LEGACY_KEY = "nilechic_cart_count";
const CART_STORAGE_KEY = "nilechic_cart_v2";

export type CartLine = {
  /** Stable key: productId + size */
  id: string;
  productId: string;
  size: string;
  qty: number;
};

function lineId(productId: string, size: string): string {
  return `${productId}::${size}`;
}

interface CartContextType {
  items: CartLine[];
  /** Sum of line quantities */
  itemCount: number;
  addItem: (productId: string, size: string, qty?: number) => void;
  updateQty: (lineId: string, qty: number) => void;
  removeLine: (lineId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function parseCart(raw: string | null): CartLine[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    return data.filter(
      (row): row is CartLine =>
        typeof row === "object" &&
        row !== null &&
        typeof (row as CartLine).id === "string" &&
        typeof (row as CartLine).productId === "string" &&
        typeof (row as CartLine).size === "string" &&
        typeof (row as CartLine).qty === "number" &&
        (row as CartLine).qty > 0
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        setItems(parseCart(raw));
      } else {
        const legacy = localStorage.getItem(CART_LEGACY_KEY);
        if (legacy && parseInt(legacy, 10) > 0) {
          localStorage.removeItem(CART_LEGACY_KEY);
        }
      }
    } catch {
      setItems([]);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, mounted]);

  const addItem = useCallback((productId: string, size: string, qty = 1) => {
    const id = lineId(productId, size);
    setItems((prev) => {
      const idx = prev.findIndex((l) => l.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { id, productId, size, qty }];
    });
  }, []);

  const updateQty = useCallback((lineId: string, qty: number) => {
    if (qty < 1) {
      setItems((prev) => prev.filter((l) => l.id !== lineId));
      return;
    }
    setItems((prev) => prev.map((l) => (l.id === lineId ? { ...l, qty } : l)));
  }, []);

  const removeLine = useCallback((lineId: string) => {
    setItems((prev) => prev.filter((l) => l.id !== lineId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = useMemo(() => items.reduce((s, l) => s + l.qty, 0), [items]);

  return (
    <CartContext.Provider
      value={{ items, itemCount, addItem, updateQty, removeLine, clearCart }}
    >
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
