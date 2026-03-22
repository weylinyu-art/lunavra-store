"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocale } from "@/contexts/LocaleContext";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/lib/data/products";
import type { OrderSnapshot } from "@/lib/orders/types";
import { saveOrder } from "@/lib/orders/storage";

const SaudiMapPicker = dynamic(() => import("@/components/SaudiMapPicker"), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 w-full items-center justify-center rounded-xl border border-dashed border-foreground/20 bg-foreground/[0.03] text-sm text-foreground/50">
      …
    </div>
  ),
});

export default function CheckoutPage() {
  const { t, path, locale } = useLocale();
  const router = useRouter();
  const { items, clearCart } = useCart();
  const skipEmptyRedirect = useRef(false);

  const [mapLat, setMapLat] = useState<number | null>(null);
  const [mapLng, setMapLng] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneLocal: "",
    email: "",
    city: "",
    addressDetail: "",
    orderNotes: "",
  });

  useEffect(() => {
    if (items.length === 0 && !skipEmptyRedirect.current) {
      router.replace(path("/cart"));
    }
  }, [items.length, path, router]);

  const handlePositionChange = (lat: number, lng: number) => {
    setMapLat(lat);
    setMapLng(lng);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const linesResolved = items
    .map((line) => {
      const p = products.find((x) => x.id === line.productId);
      if (!p) return null;
      const name = locale === "ar" ? p.nameAr : p.name;
      return { line, product: p, name };
    })
    .filter((row): row is NonNullable<typeof row> => row !== null);

  const subtotal = linesResolved.reduce((s, r) => s + r.product.price * r.line.qty, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapLat == null || mapLng == null) {
      return;
    }
    const snap: OrderSnapshot = {
      lines: linesResolved.map((r) => ({
        name: r.name,
        qty: r.line.qty,
        size: r.line.size,
        lineTotal: r.product.price * r.line.qty,
      })),
      formData: { ...formData },
      mapLat,
      mapLng,
      subtotal,
    };
    const orderId = saveOrder(snap);
    skipEmptyRedirect.current = true;
    clearCart();
    router.push(`${path("/order/complete")}?id=${encodeURIComponent(orderId)}`);
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center text-foreground/60">
        <p>{t.cart.empty}</p>
        <Link href={path("/cart")} className="mt-4 inline-block text-[#C9A962] hover:underline">
          {t.cart.title}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eceae6] pb-8">
      <div className="mx-auto max-w-lg px-4 py-6 sm:max-w-xl lg:max-w-2xl">
        <div className="mb-6 flex items-center gap-3">
          <Link
            href={path("/cart")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-[#FFFEF9] text-foreground hover:bg-foreground/5"
            aria-label="Back"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="font-heading flex-1 text-center text-lg font-semibold tracking-wide text-foreground sm:text-xl">
            {t.checkout.placeOrderTitle}
          </h1>
          <span className="w-10" aria-hidden />
        </div>

        <p className="mb-6 rounded-xl bg-emerald-50/80 px-4 py-3 text-center text-sm text-emerald-900/90">
          {t.checkout.saudiOnly}
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="rounded-2xl border border-black/[0.06] bg-[#FFFEF9] p-5 shadow-sm sm:p-6">
            <h2 className="font-heading text-base font-semibold text-foreground">{t.checkout.mapSection}</h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/65">{t.checkout.mapHelp}</p>
            <div className="mt-4">
              <SaudiMapPicker lat={mapLat} lng={mapLng} onPositionChange={handlePositionChange} />
            </div>
            {mapLat != null && mapLng != null && (
              <p className="mt-2 text-xs text-foreground/50">
                {t.checkout.coordsLabel}: {mapLat.toFixed(5)}, {mapLng.toFixed(5)}
              </p>
            )}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="city" className="text-xs font-semibold uppercase tracking-wide text-foreground/55">
                  {t.checkout.city} *
                </label>
                <input
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1.5 w-full min-h-[48px] rounded-lg border border-foreground/15 bg-white px-4 py-3 text-base text-foreground focus:border-[#C9A962] focus:outline-none focus:ring-1 focus:ring-[#C9A962] sm:min-h-0"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="addressDetail" className="text-xs font-semibold uppercase tracking-wide text-foreground/55">
                  {t.checkout.addressDetail} *
                </label>
                <textarea
                  id="addressDetail"
                  name="addressDetail"
                  required
                  rows={3}
                  value={formData.addressDetail}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-lg border border-foreground/15 bg-white px-4 py-3 text-base text-foreground focus:border-[#C9A962] focus:outline-none focus:ring-1 focus:ring-[#C9A962]"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-black/[0.06] bg-[#FFFEF9] p-5 shadow-sm sm:p-6">
            <h2 className="font-heading text-base font-semibold text-foreground">{t.checkout.contactSection}</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="fullName" className="text-xs font-semibold uppercase tracking-wide text-foreground/55">
                  {t.checkout.fullName} *
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1.5 w-full min-h-[48px] rounded-lg border border-foreground/15 bg-white px-4 py-3 text-base text-foreground focus:border-[#C9A962] focus:outline-none focus:ring-1 focus:ring-[#C9A962] sm:min-h-0"
                />
              </div>
              <div>
                <label htmlFor="phoneLocal" className="text-xs font-semibold uppercase tracking-wide text-foreground/55">
                  {t.checkout.phoneLocal} * (+{t.checkout.phonePrefix})
                </label>
                <div className="mt-1.5 flex min-h-[48px] overflow-hidden rounded-lg border border-foreground/15 bg-white">
                  <span className="flex shrink-0 items-center border-e border-foreground/10 bg-foreground/[0.04] px-3 text-sm text-foreground/70">
                    +{t.checkout.phonePrefix}
                  </span>
                  <input
                    id="phoneLocal"
                    name="phoneLocal"
                    type="tel"
                    required
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder="5xxxxxxxx"
                    value={formData.phoneLocal}
                    onChange={handleChange}
                    className="min-w-0 flex-1 px-4 py-3 text-base text-foreground focus:outline-none focus:ring-1 focus:ring-inset focus:ring-[#C9A962]"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-foreground/55">
                  {t.checkout.email} *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1.5 w-full min-h-[48px] rounded-lg border border-foreground/15 bg-white px-4 py-3 text-base text-foreground focus:border-[#C9A962] focus:outline-none focus:ring-1 focus:ring-[#C9A962] sm:min-h-0"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-black/[0.06] bg-[#FFFEF9] p-5 shadow-sm sm:p-6">
            <h2 className="font-heading text-base font-semibold text-foreground">{t.checkout.paymentSection}</h2>
            <div className="mt-4 flex items-start gap-3 rounded-xl border-2 border-[#1a7f3a] bg-emerald-50/50 p-4">
              <input type="radio" checked readOnly className="mt-1 h-4 w-4 accent-[#1a7f3a]" aria-label={t.checkout.codOnly} />
              <div>
                <p className="font-medium text-foreground">{t.checkout.codOnly}</p>
                <p className="mt-1 text-sm text-foreground/70">{t.checkout.codDescription}</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-black/[0.06] bg-[#FFFEF9] p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-base font-semibold text-foreground">{t.checkout.orderSummary}</h2>
              <span className="text-sm text-foreground/60">
                {linesResolved.length} {t.checkout.itemsInBag}
              </span>
            </div>
            <ul className="mt-4 space-y-3 border-b border-foreground/10 pb-4">
              {linesResolved.map(({ line, product, name }) => (
                <li key={line.id} className="flex gap-3 text-sm">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#FAF8F5]">
                    <Image src={product.image} alt="" fill className="object-cover" unoptimized sizes="56px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 font-medium leading-snug text-foreground">{name}</p>
                    <p className="text-xs text-foreground/55">
                      {t.cart.size} {line.size} × {line.qty}
                    </p>
                  </div>
                  <span className="shrink-0 font-semibold tabular-nums text-[#C9A962]">
                    ${(product.price * line.qty).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between text-base font-semibold text-foreground">
              <span>{t.cart.subtotal}</span>
              <span className="tabular-nums">${subtotal.toFixed(2)}</span>
            </div>
            <div className="mt-4">
              <label htmlFor="orderNotes" className="text-xs font-semibold uppercase tracking-wide text-foreground/55">
                {t.checkout.orderNotes}
              </label>
              <textarea
                id="orderNotes"
                name="orderNotes"
                rows={2}
                value={formData.orderNotes}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-lg border border-foreground/15 bg-white px-4 py-3 text-base text-foreground focus:border-[#C9A962] focus:outline-none focus:ring-1 focus:ring-[#C9A962]"
              />
            </div>
          </section>

          <button
            type="submit"
            disabled={mapLat == null || mapLng == null}
            title={mapLat == null || mapLng == null ? t.checkout.pinRequired : undefined}
            className="flex min-h-[52px] w-full items-center justify-center rounded-xl bg-[#1a7f3a] py-4 text-base font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-[#156b30] disabled:cursor-not-allowed disabled:opacity-45"
          >
            {t.checkout.placeOrder}
          </button>
        </form>
      </div>
    </div>
  );
}
