"use client";

import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

function CartIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  );
}

export default function Header() {
  const { t, path } = useLocale();
  const { count } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { slug: "lingerie-sets", name: t.categories.lingerieSets },
    { slug: "bras", name: t.categories.bras },
    { slug: "panties", name: t.categories.panties },
    { slug: "sleepwear", name: t.categories.sleepwear },
    { slug: "bridal", name: t.categories.bridal },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-rose-200/50 bg-[#FFFEF9]/98 backdrop-blur-md shadow-sm">
      {/* Top bar: Logo + Slogan + Free shipping + Lang */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href={path("/")} className="flex flex-col min-w-0 shrink-0">
          <span className="text-xl font-light tracking-[0.2em] text-foreground transition-colors duration-200 hover:text-[#C9A962] sm:text-2xl">
            NileChic
          </span>
          <span className="mt-0.5 truncate text-xs text-foreground/70 sm:text-sm">
            {t.header.slogan}
          </span>
        </Link>

        <div className="hidden min-w-0 max-w-xs flex-1 sm:block">
          <div className="promo-ticker-single mx-auto w-full">
            <div className="promo-ticker-single-track">
              <span className="promo-ticker-single-item rounded-full bg-[#C9A962]/12 px-4 py-1.5 text-xs font-medium text-[#C9A962]">
                🚚 {t.header.freeShipping}
              </span>
              <span className="promo-ticker-single-item rounded-full bg-[#C9A962]/12 px-4 py-1.5 text-xs font-medium text-[#C9A962]">
                🚚 {t.header.freeShipping}
              </span>
              <span className="promo-ticker-single-item rounded-full bg-[#C9A962]/12 px-4 py-1.5 text-xs font-medium text-[#C9A962]">
                🚚 {t.header.freeShipping}
              </span>
              <span className="promo-ticker-single-item rounded-full bg-[#C9A962]/12 px-4 py-1.5 text-xs font-medium text-[#C9A962]">
                🚚 {t.header.freeShipping}
              </span>
              <span className="promo-ticker-single-item rounded-full bg-[#C9A962]/12 px-4 py-1.5 text-xs font-medium text-[#C9A962]">
                🚚 {t.header.freeShipping}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={path("/checkout")}
            className="relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-[#C9A962]/10 hover:text-[#C9A962]"
          >
            <CartIcon />
            <span className="hidden sm:inline">{t.nav.cart}</span>
            {count > 0 && (
              <span className="absolute -top-0.5 -end-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C9A962] px-1 text-[10px] font-semibold text-white">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </Link>
          <LanguageSwitcher />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col gap-1.5 p-2 md:hidden"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            <span className="block h-0.5 w-5 bg-foreground" />
            <span className="block h-0.5 w-5 bg-foreground" />
            <span className="block h-0.5 w-5 bg-foreground" />
          </button>
        </div>
      </div>

      {/* Category row */}
      <nav
        className="border-t border-rose-200/30 bg-[#FFFEF9]/95"
        aria-label="Categories"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-start gap-1 overflow-x-auto px-4 py-2 sm:gap-4 sm:px-6 lg:px-8 scrollbar-hide">
          <Link
            href={path("/")}
            className="flex shrink-0 items-center rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors min-h-[44px] hover:bg-[#C9A962]/10 hover:text-[#C9A962] active:bg-[#C9A962]/10 sm:min-h-0"
          >
            {t.nav.home}
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={path(`/shop?category=${cat.slug}`)}
              className="flex shrink-0 items-center rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors min-h-[44px] hover:bg-[#C9A962]/10 hover:text-[#C9A962] active:bg-[#C9A962]/10 sm:min-h-0"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href={path("/gift")}
            className="flex shrink-0 items-center rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors min-h-[44px] hover:bg-[#C9A962]/10 hover:text-[#C9A962] active:bg-[#C9A962]/10 sm:min-h-0"
          >
            {t.nav.gift}
          </Link>
        </div>
      </nav>

      {/* Mobile menu: touch-optimized */}
      {mobileMenuOpen && (
        <div className="border-t border-rose-200/50 bg-[#FFFEF9] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            <p className="mb-3 px-1 text-sm text-foreground/70">🚚 {t.header.freeShipping}</p>
            <Link href={path("/")} onClick={() => setMobileMenuOpen(false)} className="touch-target flex min-h-[44px] items-center rounded-lg px-3 py-3 text-base font-medium text-foreground active:bg-rose-100/50">
              {t.nav.home}
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={path(`/shop?category=${cat.slug}`)}
                onClick={() => setMobileMenuOpen(false)}
                className="touch-target flex min-h-[44px] items-center rounded-lg px-3 py-3 text-base font-medium text-foreground active:bg-rose-100/50"
              >
                {cat.name}
              </Link>
            ))}
            <Link href={path("/gift")} onClick={() => setMobileMenuOpen(false)} className="touch-target flex min-h-[44px] items-center rounded-lg px-3 py-3 text-base font-medium text-foreground active:bg-rose-100/50">
              {t.nav.gift}
            </Link>
            <Link
              href={path("/checkout")}
              onClick={() => setMobileMenuOpen(false)}
              className="touch-target flex min-h-[44px] items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-foreground active:bg-rose-100/50"
            >
              <CartIcon />
              {t.nav.cart}
              {count > 0 && (
                <span className="rounded-full bg-[#C9A962] px-2 py-0.5 text-xs font-semibold text-white">
                  {count}
                </span>
              )}
            </Link>
            <div className="mt-4 flex items-center gap-2 border-t border-rose-200/30 pt-4">
              <LanguageSwitcher onNavigate={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
