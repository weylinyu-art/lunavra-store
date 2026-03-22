"use client";

import { useLocale } from "@/contexts/LocaleContext";
import type { Product } from "@/lib/data/products";
import { getFulfillmentOrigin } from "@/lib/data/products";

type Placement = "card" | "inline" | "detail";

interface FulfillmentBadgeProps {
  product: Product;
  placement?: Placement;
}

export default function FulfillmentBadge({ product, placement = "card" }: FulfillmentBadgeProps) {
  const { t } = useLocale();
  const o = getFulfillmentOrigin(product);
  const isLocal = o === "ksa-local";
  const F = t.product.fulfillment;

  if (placement === "detail") {
    return (
      <div
        className={`rounded-lg border p-4 ${
          isLocal ? "border-neutral-300/80 bg-neutral-50" : "border-foreground/12 bg-white"
        }`}
        role="region"
        aria-label={isLocal ? F.ksaLocalTitle : F.intlTitle}
      >
        <p className="text-sm font-semibold text-foreground">{isLocal ? F.ksaLocalTitle : F.intlTitle}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">
          {isLocal ? F.ksaLocalDetail : F.intlDetail}
        </p>
        <p className="mt-2 text-xs font-medium text-foreground/65">{isLocal ? F.ksaLocalEta : F.intlEta}</p>
      </div>
    );
  }

  if (placement === "inline") {
    return (
      <p className="text-xs text-foreground/70">
        <span className="font-medium text-foreground">{isLocal ? F.ksaLocalBadge : F.intlBadge}</span>
        <span className="text-foreground/50"> · </span>
        <span>{isLocal ? F.ksaLocalEta : F.intlEta}</span>
      </p>
    );
  }

  return (
    <div className="pointer-events-none flex max-w-[95%] flex-col gap-1">
      <div
        className={`inline-flex w-fit max-w-full rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-wide shadow-md ring-1 ring-black/5 sm:text-[11px] ${
          isLocal ? "bg-neutral-900 text-white" : "bg-foreground/88 text-white"
        }`}
      >
        {isLocal ? F.ksaLocalBadge : F.intlBadge}
      </div>
      <div className="inline-flex w-fit rounded-md bg-black/55 px-2 py-0.5 text-[9px] font-medium text-white/95 backdrop-blur-[2px] sm:text-[10px]">
        {isLocal ? F.ksaLocalEta : F.intlEta}
      </div>
    </div>
  );
}
