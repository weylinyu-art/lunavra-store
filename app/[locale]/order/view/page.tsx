"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLocale } from "@/contexts/LocaleContext";
import { getOrderById } from "@/lib/orders/storage";
import type { StoredOrder } from "@/lib/orders/types";
import { buildOrderWhatsAppUrl } from "@/lib/orders/whatsapp";

function OrderViewInner() {
  const { t, path } = useLocale();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [order, setOrder] = useState<StoredOrder | null | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) {
      setOrder(null);
      return;
    }
    setOrder(getOrderById(id));
  }, [id]);

  const copyId = () => {
    if (!id) return;
    void navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (order === undefined) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center text-foreground/50">…</div>
    );
  }

  if (!id || order === null) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-foreground/80">{t.order.notFound}</p>
        <Link href={path("/account")} className="mt-6 inline-block text-[#C9A962] hover:underline">
          {t.account.title}
        </Link>
      </div>
    );
  }

  const snap = order.snapshot;
  const d = new Date(order.createdAt);
  const dateStr = d.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const phoneFull = `+${t.checkout.phonePrefix}${snap.formData.phoneLocal.replace(/\D/g, "")}`;
  const waUrl = buildOrderWhatsAppUrl(snap, {
    placeOrderTitle: t.checkout.placeOrderTitle,
    contactSection: t.checkout.contactSection,
    mapSection: t.checkout.mapSection,
    cityLabel: t.checkout.city,
    coordsLabel: t.checkout.coordsLabel,
    orderNotesLabel: t.checkout.orderNotes,
    phonePrefix: t.checkout.phonePrefix,
    sizeWord: t.cart.size,
    countryField: t.checkout.country,
  });

  return (
    <div className="min-h-screen bg-[#eceae6] px-4 py-6">
      <div className="mx-auto max-w-lg sm:max-w-xl">
        <div className="mb-6 flex items-center gap-3">
          <Link
            href={path("/account")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-[#FFFEF9] hover:bg-foreground/5"
            aria-label="Back"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="font-heading flex-1 text-center text-lg font-semibold">{t.order.detailTitle}</h1>
          <span className="w-10" />
        </div>

        <div className="space-y-4 rounded-2xl border border-black/[0.06] bg-[#FFFEF9] p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-foreground/10 pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-foreground/50">{t.order.orderNo}</p>
              <p className="mt-1 font-mono text-sm text-foreground">{order.id}</p>
            </div>
            <button
              type="button"
              onClick={copyId}
              className="rounded-lg border border-foreground/15 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-foreground/5"
            >
              {copied ? "✓" : t.order.copy}
            </button>
          </div>
          <p className="text-sm text-foreground/75">
            <span className="text-foreground/50">{t.order.orderDate}: </span>
            {dateStr}
          </p>
          <p className="text-sm text-foreground/75">
            <span className="text-foreground/50">{t.order.status}: </span>
            {t.order.statusProcessing}
          </p>
          <p className="text-sm text-foreground/75">
            <span className="text-foreground/50">{t.order.payment}: </span>
            {t.checkout.codOnly}
          </p>
        </div>

        <div className="mt-4 rounded-2xl border border-black/[0.06] bg-[#FFFEF9] p-5 shadow-sm">
          <h2 className="font-heading text-base font-semibold text-foreground">{t.order.shippingTo}</h2>
          <p className="mt-3 text-sm text-foreground/85">{snap.formData.fullName}</p>
          <p className="text-sm text-foreground/85">{phoneFull}</p>
          <p className="mt-2 text-sm text-foreground/85">
            {snap.formData.city}, Saudi Arabia
          </p>
          <p className="text-sm leading-relaxed text-foreground/85">{snap.formData.addressDetail}</p>
          <p className="mt-2 text-xs text-foreground/55">
            {t.checkout.coordsLabel}: {snap.mapLat.toFixed(5)}, {snap.mapLng.toFixed(5)}
          </p>
        </div>

        <div className="mt-4 rounded-2xl border border-black/[0.06] bg-[#FFFEF9] p-5 shadow-sm">
          <h2 className="font-heading text-base font-semibold text-foreground">{t.order.bag}</h2>
          <ul className="mt-4 space-y-4">
            {snap.lines.map((line, i) => (
              <li key={i} className="flex justify-between gap-3 border-b border-foreground/10 pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{line.name}</p>
                  <p className="text-xs text-foreground/55">
                    {t.cart.size} {line.size} × {line.qty}
                  </p>
                </div>
                <span className="shrink-0 font-semibold tabular-nums text-[#C9A962]">${line.lineTotal.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-foreground/10 pt-4 text-base font-semibold">
            <span>{t.cart.subtotal}</span>
            <span className="tabular-nums">${snap.subtotal.toFixed(2)}</span>
          </div>
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[#25D366] px-4 py-3 text-sm font-medium text-white hover:bg-[#20BD5A]"
        >
          {t.checkout.confirmWhatsApp}
        </a>

        <Link
          href={path("/")}
          className="mt-4 block text-center text-sm text-[#C9A962] hover:underline"
        >
          {t.order.backHome}
        </Link>
      </div>
    </div>
  );
}

export default function OrderViewPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-foreground/50">…</div>}>
      <OrderViewInner />
    </Suspense>
  );
}
