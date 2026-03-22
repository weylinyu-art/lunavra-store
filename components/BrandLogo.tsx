"use client";

import { useLocale } from "@/contexts/LocaleContext";

type BrandLogoProps = {
  /** Header: larger wordmark + optional slogan. Footer: compact. */
  variant?: "header" | "footer";
  /** Second line under wordmark (header only). */
  showSlogan?: boolean;
  className?: string;
};

/**
 * NileChic wordmark: serif split (Nile / Chic) + slim accent bar.
 * Avoids ultra-light + extreme tracking for better legibility and brand recall.
 */
export default function BrandLogo({ variant = "header", showSlogan = false, className = "" }: BrandLogoProps) {
  const { t } = useLocale();
  const isFooter = variant === "footer";

  const wordClasses = isFooter
    ? "text-xl leading-none sm:text-[1.35rem]"
    : "text-[1.4rem] leading-none sm:text-[1.75rem] md:text-[1.85rem]";

  return (
    <div className={`min-w-0 ${className}`}>
      {/* border-s follows inline-start → correct side in LTR & RTL */}
      <div className="border-s-[3px] border-neutral-900 ps-3">
        <span className={`font-heading ${wordClasses} font-semibold tracking-tight`}>
          <span className="text-foreground">Nile</span>
          <span className="text-neutral-900">Chic</span>
        </span>
      </div>
      {showSlogan && (
        <p className="mt-1.5 max-w-[16rem] text-[11px] font-normal leading-snug tracking-wide text-foreground/65 sm:mt-2 sm:max-w-none sm:text-xs">
          {t.header.slogan}
        </p>
      )}
    </div>
  );
}
