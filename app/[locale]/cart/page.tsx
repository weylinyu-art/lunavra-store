"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useLocale } from "@/contexts/LocaleContext";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/lib/data/products";

export default function CartPage() {
  const { t, path, locale } = useLocale();
  const { items, updateQty, removeLine, itemCount } = useCart();

  const lines = useMemo(() => {
    return items
      .map((line) => {
        const p = products.find((x) => x.id === line.productId);
        if (!p) return null;
        const name = locale === "ar" ? p.nameAr : p.name;
        return { line, product: p, name };
      })
      .filter((row): row is NonNullable<typeof row> => row !== null);
  }, [items, locale]);

  const subtotal = useMemo(() => {
    return lines.reduce((sum, row) => sum + row.product.price * row.line.qty, 0);
  }, [lines]);

  return (
    <div className="min-h-screen bg-neutral-100 pb-32 lg:pb-12">
      <div className="mx-auto max-w-lg px-4 pt-4 sm:max-w-2xl lg:max-w-4xl">
        <h1 className="font-heading text-center text-xl font-semibold tracking-wide text-foreground sm:text-2xl">
          {t.cart.title}
        </h1>

        {lines.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-black/[0.06] bg-white p-10 text-center shadow-sm">
            <p className="text-foreground/75">{t.cart.empty}</p>
            <Link
              href={path("/shop")}
              className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-foreground px-8 py-3 text-sm font-semibold text-white"
            >
              {t.cart.emptyCta}
            </Link>
          </div>
        ) : (
          <>
            <ul className="mt-6 space-y-4">
              {lines.map(({ line, product, name }) => (
                <li
                  key={line.id}
                  className="flex gap-2 rounded-2xl border border-black/[0.06] bg-white p-3 shadow-sm sm:gap-4 sm:p-4"
                >
                  <Link
                    href={path(`/product/${product.id}`)}
                    className="relative h-28 w-24 shrink-0 overflow-hidden rounded-lg bg-neutral-50 sm:h-32 sm:w-28"
                  >
                    <Image
                      src={product.image}
                      alt=""
                      fill
                      className="object-cover"
                      unoptimized
                      sizes="112px"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={path(`/product/${product.id}`)}
                      className="line-clamp-2 text-sm font-medium leading-snug text-foreground hover:text-neutral-900"
                    >
                      {name}
                    </Link>
                    <p className="mt-1 text-xs text-foreground/60">
                      {t.cart.size}: {line.size}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-neutral-900">
                      ${product.price} {t.cart.each}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                      <div className="inline-flex items-center rounded-lg border border-foreground/15 bg-white">
                        <button
                          type="button"
                          aria-label="Decrease"
                          className="min-h-[40px] min-w-[40px] px-2 text-lg text-foreground hover:bg-foreground/5"
                          onClick={() => updateQty(line.id, line.qty - 1)}
                        >
                          −
                        </button>
                        <span className="min-w-[2rem] text-center text-sm font-medium tabular-nums">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase"
                          className="min-h-[40px] min-w-[40px] px-2 text-lg text-foreground hover:bg-foreground/5"
                          onClick={() => updateQty(line.id, line.qty + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(line.id)}
                        className="text-xs font-medium text-foreground/50 underline-offset-2 hover:text-neutral-900 hover:underline"
                      >
                        {t.cart.remove}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {lines.length > 0 && (
        <div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 backdrop-blur-md"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <div className="mx-auto flex max-w-lg flex-col gap-3 px-4 pt-3 sm:max-w-2xl lg:max-w-4xl">
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground/70">
                {t.cart.subtotal} ({itemCount} {t.checkout.itemsInBag})
              </span>
              <span className="text-lg font-bold tabular-nums text-foreground">${subtotal.toFixed(2)}</span>
            </div>
            <Link
              href={path("/checkout")}
              className="flex min-h-[52px] w-full items-center justify-center rounded-xl bg-neutral-900 py-3.5 text-base font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-neutral-800"
            >
              {t.cart.checkout}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
