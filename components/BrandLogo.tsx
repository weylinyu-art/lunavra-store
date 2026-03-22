"use client";

import { useLocale } from "@/contexts/LocaleContext";

type BrandLogoProps = {
  /** Header: larger wordmark + optional slogan. Footer: compact. */
  variant?: "header" | "footer";
  /** Second line under wordmark (header only). */
  showSlogan?: boolean;
  className?: string;
};

/** Soft blush accent — single tittle on “Nile” (Latin dotless i + pink dot). */
const LOGO_DOT = "bg-[#e8a0a8]";

type WordmarkProps = {
  wordClasses: string;
};

/**
 * “Nile” with a hand-placed pink dot on the i (U+0131 dotless i + rounded accent).
 * “Chic” stays solid neutral for contrast.
 */
function NileChicWordmark({ wordClasses }: WordmarkProps) {
  return (
    <span className={`font-heading ${wordClasses} font-semibold tracking-tight`} dir="ltr" lang="en">
      <span className="text-foreground">N</span>
      <span className="relative inline-block align-baseline">
        {/* Latin small letter dotless i — we draw the tittle in brand pink */}
        <span className="text-foreground">ı</span>
        <span
          className={`pointer-events-none absolute left-1/2 top-[0.12em] h-[0.3em] w-[0.3em] -translate-x-1/2 rounded-full ${LOGO_DOT} shadow-[0_0_0_1px_rgba(255,255,255,0.35)] sm:top-[0.14em] sm:h-[0.28em] sm:w-[0.28em]`}
          aria-hidden
        />
      </span>
      <span className="text-foreground">le</span>
      <span className="text-neutral-900">Chic</span>
    </span>
  );
}

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
        <NileChicWordmark wordClasses={wordClasses} />
      </div>
      {showSlogan && (
        <p className="mt-1.5 max-w-[16rem] text-[11px] font-normal leading-snug tracking-wide text-foreground/65 sm:mt-2 sm:max-w-none sm:text-xs">
          {t.header.slogan}
        </p>
      )}
    </div>
  );
}
