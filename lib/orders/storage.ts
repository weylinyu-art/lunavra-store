import type { OrderSnapshot, StoredOrder } from "@/lib/orders/types";

const ORDERS_KEY = "nilechic_orders";

function readAll(): StoredOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw) as unknown;
    return Array.isArray(data) ? (data as StoredOrder[]) : [];
  } catch {
    return [];
  }
}

function writeAll(orders: StoredOrder[]) {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch {
    /* ignore */
  }
}

export function generateOrderId(): string {
  return `NC-${Date.now()}-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
}

/** Append order; returns new order id. */
export function saveOrder(snapshot: OrderSnapshot): string {
  const id = generateOrderId();
  const order: StoredOrder = {
    id,
    createdAt: new Date().toISOString(),
    status: "processing",
    snapshot,
  };
  const all = readAll();
  writeAll([order, ...all]);
  return id;
}

export function getOrderById(id: string): StoredOrder | null {
  if (!id) return null;
  return readAll().find((o) => o.id === id) ?? null;
}

export function listOrders(): StoredOrder[] {
  return readAll().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/** Match order number (id) or email (case-insensitive). */
export function searchOrders(query: string): StoredOrder[] {
  const q = query.trim().toLowerCase();
  if (!q) return listOrders();
  return listOrders().filter((o) => {
    if (o.id.toLowerCase().includes(q)) return true;
    const email = o.snapshot.formData.email?.toLowerCase() ?? "";
    return email.includes(q);
  });
}
