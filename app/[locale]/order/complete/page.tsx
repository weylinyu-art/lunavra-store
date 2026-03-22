"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLocale } from "@/contexts/LocaleContext";
import { getOrderById } from "@/lib/orders/storage";
import type { StoredOrder } from "@/lib/orders/types";
import { buildOrderWhatsAppUrl } from "@/lib/orders/whatsapp";

function OrderCompleteInner() {
  const { t, path } = useLocale();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [order, setOrder] = useState<StoredOrder | null | undefined>(undefined);

  useEffect(() => {
    if (!id) {
      setOrder(null);
      return;
    }
    setOrder(getOrderById(id));
  }, [id]);

  const waUrl = useMemo(() => {
    if (!order) return null;
    return buildOrderWhatsAppUrl(order.snapshot, {
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
  }, [order, t]);

  if (order === undefined) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center text-foreground/60">
        <p>…</p>
      </div>
    );
  }

  if (!id || order === null) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-foreground/80">{t.order.notFound}</p>
        <Link href={path("/")} className="mt-6 inline-block text-[#C9A962] hover:underline">
          {t.order.backHome}
        </Link>
      </div>
    );
  }

  const email = order.snapshot.formData.email;
  const viewOrderHref = `${path("/order/view")}?id=${encodeURIComponent(order.id)}`;

  return (
    <div className="min-h-screen bg-[#eceae6] px-4 py-10">
      <div className="mx-auto max-w-md rounded-2xl border border-black/[0.06] bg-[#FFFEF9] p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#1a7f3a] text-3xl text-white">
          ✓
        </div>
        <h1 className="mt-6 font-heading text-xl font-semibold text-foreground">{t.order.successTitle}</h1>
        <p className="mt-3 text-sm text-foreground/70">
          {t.order.emailSent}{" "}
          <span className="font-medium text-[#c45c5c]">{email}</span>
        </p>
        <p className="mt-4 text-left text-sm leading-relaxed text-foreground/65">{t.order.expectNote}</p>
        <p className="mt-4 text-left text-xs text-foreground/50">{t.order.localOnly}</p>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <Link
            href={path("/")}
            className="flex min-h-[48px] items-center justify-center rounded-xl bg-[#1a7f3a] px-4 text-sm font-semibold text-white hover:bg-[#156b30]"
          >
            {t.order.backHome}
          </Link>
          <Link
            href={viewOrderHref}
            className="flex min-h-[48px] items-center justify-center rounded-xl border border-foreground/20 bg-white px-4 text-sm font-semibold text-foreground hover:bg-foreground/5"
          >
            {t.order.viewOrder}
          </Link>
        </div>

        {waUrl && (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-medium text-white hover:bg-[#20BD5A]"
          >
            {t.checkout.confirmWhatsApp}
          </a>
        )}
      </div>
    </div>
  );
}

export default function OrderCompletePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-lg px-4 py-20 text-center text-foreground/50">…</div>
      }
    >
      <OrderCompleteInner />
    </Suspense>
  );
}
