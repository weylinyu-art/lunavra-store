"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useLocale } from "@/contexts/LocaleContext";
import { pathWithoutLocale, pathWithLocale } from "@/lib/i18n/paths";
import { useState } from "react";

export default function Header() {
  const { t, locale, path } = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const basePath = pathWithoutLocale(pathname);
  const queryString = searchParams.toString();
  const fullPath = queryString ? `${basePath}?${queryString}` : basePath;
  const switchToEn = pathWithLocale("en", fullPath);
  const switchToAr = pathWithLocale("ar", fullPath);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-rose-200/50 bg-[#FFFEF9]/98 backdrop-blur-md shadow-sm">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href={path("/")}
          className="text-2xl font-light tracking-[0.2em] text-foreground transition-colors duration-200 hover:text-[#C9A962]"
        >
          LUNAVRA
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href={path("/")}
            className="text-sm font-medium text-foreground/80 transition-colors duration-200 hover:text-[#C9A962]"
          >
            {t.nav.home}
          </Link>
          <Link
            href={path("/shop")}
            className="text-sm font-medium text-foreground/80 transition-colors duration-200 hover:text-[#C9A962]"
          >
            {t.nav.shop}
          </Link>
          <Link
            href={path("/gift")}
            className="text-sm font-medium text-foreground/80 transition-colors duration-200 hover:text-[#C9A962]"
          >
            {t.nav.gift}
          </Link>
          <Link
            href={path("/about")}
            className="text-sm font-medium text-foreground/80 transition-colors duration-200 hover:text-[#C9A962]"
          >
            {t.nav.about}
          </Link>
          <Link
            href={path("/checkout")}
            className="text-sm font-medium text-foreground/80 transition-colors duration-200 hover:text-[#C9A962]"
          >
            {t.nav.cart}
          </Link>

          {/* Language switcher - links to same page in other locale */}
          <div className="flex gap-1 border-s border-foreground/20 ps-6">
            <Link
              href={switchToEn}
              className={`px-2 py-1 text-sm ${locale === "en" ? "font-semibold text-[#C9A962]" : "text-foreground/60 hover:text-foreground"}`}
            >
              EN
            </Link>
            <Link
              href={switchToAr}
              className={`px-2 py-1 text-sm ${locale === "ar" ? "font-semibold text-[#C9A962]" : "text-foreground/60 hover:text-foreground"}`}
            >
              AR
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu"
        >
          <span className="block h-0.5 w-6 bg-foreground" />
          <span className="block h-0.5 w-6 bg-foreground" />
          <span className="block h-0.5 w-6 bg-foreground" />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-rose-200/50 bg-[#FFFEF9] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link href={path("/")} onClick={() => setMobileMenuOpen(false)}>
              {t.nav.home}
            </Link>
            <Link href={path("/shop")} onClick={() => setMobileMenuOpen(false)}>
              {t.nav.shop}
            </Link>
            <Link href={path("/gift")} onClick={() => setMobileMenuOpen(false)}>
              {t.nav.gift}
            </Link>
            <Link href={path("/about")} onClick={() => setMobileMenuOpen(false)}>
              {t.nav.about}
            </Link>
            <Link href={path("/checkout")} onClick={() => setMobileMenuOpen(false)}>
              {t.nav.cart}
            </Link>
            <div className="flex gap-4 pt-2">
              <Link
                href={switchToEn}
                onClick={() => setMobileMenuOpen(false)}
                className={locale === "en" ? "font-semibold text-[#C9A962]" : ""}
              >
                EN
              </Link>
              <Link
                href={switchToAr}
                onClick={() => setMobileMenuOpen(false)}
                className={locale === "ar" ? "font-semibold text-[#C9A962]" : ""}
              >
                AR
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
