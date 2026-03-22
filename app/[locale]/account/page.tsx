"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";
import { listOrders, searchOrders } from "@/lib/orders/storage";
import type { StoredOrder } from "@/lib/orders/types";

export default function AccountPage() {
  const { t, path } = useLocale();
  const [query, setQuery] = useState("");
  const [orders, setOrders] = useState<StoredOrder[]>([]);

  useEffect(() => {
    setOrders(query.trim() ? searchOrders(query) : listOrders());
  }, [query]);

  return (
    <div className="min-h-screen bg-[#eceae6] px-4 py-8">
      <div className="mx-auto max-w-lg sm:max-w-xl">
        <h1 className="font-heading text-center text-xl font-semibold text-foreground">{t.account.title}</h1>

        <section className="mt-8 rounded-2xl border border-black/[0.06] bg-[#FFFEF9] p-5 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-heading text-base font-semibold text-foreground">{t.account.myOrders}</h2>
            <Link href={path("/shop")} className="text-xs font-medium text-[#C9A962] hover:underline">
              {t.account.viewAll}
            </Link>
          </div>
          <div className="mt-4 flex gap-2">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.account.searchPlaceholder}
              className="min-w-0 flex-1 rounded-lg border border-foreground/15 bg-white px-3 py-2.5 text-sm text-foreground focus:border-[#C9A962] focus:outline-none focus:ring-1 focus:ring-[#C9A962]"
            />
            <span className="flex shrink-0 items-center rounded-lg bg-[#1a7f3a] px-4 py-2 text-sm font-medium text-white">
              {t.account.search}
            </span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-foreground/55">{t.order.localOnly}</p>

          <ul className="mt-6 space-y-3">
            {orders.length === 0 ? (
              <li className="rounded-lg bg-foreground/[0.03] py-8 text-center text-sm text-foreground/60">
                {t.account.noOrders}
              </li>
            ) : (
              orders.map((o) => {
                const d = new Date(o.createdAt);
                return (
                  <li key={o.id}>
                    <Link
                      href={`${path("/order/view")}?id=${encodeURIComponent(o.id)}`}
                      className="block rounded-xl border border-foreground/10 bg-white p-4 transition-colors hover:border-[#C9A962]/40"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-mono text-xs text-foreground/70">{o.id}</p>
                          <p className="mt-1 text-xs text-foreground/50">
                            {d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                          </p>
                          <p className="mt-2 text-sm font-medium text-[#C9A962]">
                            ${o.snapshot.subtotal.toFixed(2)}
                          </p>
                        </div>
                        <span className="shrink-0 text-foreground/40">›</span>
                      </div>
                    </Link>
                  </li>
                );
              })
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
