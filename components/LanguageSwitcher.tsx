"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { pathWithoutLocale, pathWithLocale } from "@/lib/i18n/paths";
import { setLocaleCookie } from "@/lib/locale/utils";
import { useLocale } from "@/contexts/LocaleContext";

interface LanguageSwitcherProps {
  onNavigate?: () => void;
}

const options = [
  { locale: "en" as const, label: "English" },
  { locale: "ar" as const, label: "العربية" },
];

export default function LanguageSwitcher({ onNavigate }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const basePath = pathWithoutLocale(pathname);
  const fullPath = basePath || "/";
  const current = options.find((o) => o.locale === locale) ?? options[0];

  const handleSelect = (loc: "en" | "ar") => {
    setLocaleCookie(loc);
    onNavigate?.();
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg border border-foreground/20 bg-[#FFFEF9] px-2.5 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:border-[#C9A962]/50 hover:text-[#C9A962]"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <span>{current.locale.toUpperCase()}</span>
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul
          className="absolute end-0 top-full z-50 mt-1 min-w-[7rem] overflow-hidden rounded-lg border border-rose-200/50 bg-[#FFFEF9] py-1 shadow-lg"
          role="listbox"
        >
          {options.map((opt) => (
            <li key={opt.locale} role="option">
              <Link
                href={pathWithLocale(opt.locale, fullPath)}
                onClick={() => handleSelect(opt.locale)}
                className={`block px-3 py-2 text-sm transition-colors ${
                  opt.locale === locale
                    ? "bg-[#C9A962]/15 font-medium text-[#C9A962]"
                    : "text-foreground/80 hover:bg-rose-100/50 hover:text-foreground"
                }`}
              >
                {opt.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
