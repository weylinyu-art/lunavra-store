"use client";

import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";
import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header() {
  const { t, path } = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { slug: "lingerie-sets", name: t.categories.lingerieSets },
    { slug: "bras", name: t.categories.bras },
    { slug: "panties", name: t.categories.panties },
    { slug: "sleepwear", name: t.categories.sleepwear },
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

        <div className="hidden flex-1 items-center justify-center gap-2 sm:flex">
          <span className="rounded-full bg-[#C9A962]/15 px-4 py-1.5 text-center text-xs font-medium text-[#C9A962]">
            🚚 {t.header.freeShipping}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={path("/checkout")}
            className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-[#C9A962]/10 hover:text-[#C9A962]"
          >
            {t.nav.cart}
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
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-1 px-4 py-2 sm:gap-4 sm:px-6 lg:px-8">
          <Link
            href={path("/")}
            className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-[#C9A962]/10 hover:text-[#C9A962]"
          >
            {t.nav.home}
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={path(`/shop?category=${cat.slug}`)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-[#C9A962]/10 hover:text-[#C9A962]"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href={path("/gift")}
            className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-[#C9A962]/10 hover:text-[#C9A962]"
          >
            {t.nav.gift}
          </Link>
          <Link
            href={path("/about")}
            className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-[#C9A962]/10 hover:text-[#C9A962]"
          >
            {t.nav.about}
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-rose-200/50 bg-[#FFFEF9] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            <p className="mb-2 text-xs text-foreground/70">🚚 {t.header.freeShipping}</p>
            <Link href={path("/")} onClick={() => setMobileMenuOpen(false)}>
              {t.nav.home}
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={path(`/shop?category=${cat.slug}`)}
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <Link href={path("/gift")} onClick={() => setMobileMenuOpen(false)}>
              {t.nav.gift}
            </Link>
            <Link href={path("/about")} onClick={() => setMobileMenuOpen(false)}>
              {t.nav.about}
            </Link>
            <Link href={path("/checkout")} onClick={() => setMobileMenuOpen(false)}>
              {t.nav.cart}
            </Link>
            <div className="mt-4 flex items-center gap-2 border-t border-rose-200/30 pt-4">
              <span className="text-xs text-foreground/50">Language</span>
              <LanguageSwitcher onNavigate={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
