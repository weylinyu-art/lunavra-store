"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "@/contexts/LocaleContext";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import BrandLogo from "@/components/BrandLogo";
import { pathWithoutLocale } from "@/lib/i18n/paths";

function navTabClass(active: boolean) {
  return active
    ? "bg-[#C9A962]/12 font-semibold text-[#C9A962] ring-1 ring-inset ring-[#C9A962]/35"
    : "text-foreground/80 hover:bg-[#C9A962]/10 hover:text-[#C9A962]";
}

function mobileNavClass(active: boolean) {
  return active
    ? "bg-[#C9A962]/12 font-semibold text-[#C9A962] ring-1 ring-inset ring-[#C9A962]/30"
    : "text-foreground active:bg-rose-100/50";
}

function SearchIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  );
}

export default function Header() {
  const { t, path } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { itemCount } = useCart();
  const { user, loading: authLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const basePath = pathWithoutLocale(pathname);
  const categoryParam = searchParams.get("category");
  const isHome = basePath === "/";
  const isShop = basePath === "/shop";
  const isGift = basePath === "/gift";
  const isBlog = basePath.startsWith("/blog");
  const isCart = basePath === "/cart";
  const isAccount = basePath === "/account";
  const isLogin = basePath === "/login";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) router.push(path(`/search?q=${encodeURIComponent(q)}`));
  };

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
        <Link
          href={path("/")}
          className="group min-w-0 shrink-0 rounded-lg outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#C9A962]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFEF9]"
        >
          <BrandLogo variant="header" showSlogan />
        </Link>

        <form
          onSubmit={handleSearch}
          className="hidden sm:flex flex-1 max-w-md mx-4 items-center gap-0 rounded-lg border border-foreground/20 bg-white overflow-hidden focus-within:border-[#C9A962] focus-within:ring-1 focus-within:ring-[#C9A962]"
        >
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.search.placeholder}
            className="flex-1 min-w-0 px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/50 focus:outline-none"
            aria-label="Search products"
          />
          <button
            type="submit"
            className="flex h-10 w-10 shrink-0 items-center justify-center bg-foreground text-[#FFFEF9] transition-colors hover:bg-foreground/90"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
        </form>

        <div className="flex items-center gap-1 sm:gap-2">
          {!authLoading && !user && (
            <Link
              href={path("/login?return=/account")}
              aria-current={isLogin ? "page" : undefined}
              className={`hidden rounded-lg px-2.5 py-2 text-sm font-medium transition-colors hover:bg-[#C9A962]/10 hover:text-[#C9A962] sm:inline-block ${navTabClass(isLogin)}`}
            >
              {t.nav.signIn}
            </Link>
          )}
          <Link
            href={path("/account")}
            aria-current={isAccount ? "page" : undefined}
            className={`hidden rounded-lg px-2.5 py-2 text-sm font-medium transition-colors hover:bg-[#C9A962]/10 hover:text-[#C9A962] sm:inline-block ${navTabClass(isAccount)}`}
          >
            {t.nav.account}
          </Link>
          <Link
            href={path("/cart")}
            aria-current={isCart ? "page" : undefined}
            className={`relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[#C9A962]/10 hover:text-[#C9A962] ${navTabClass(isCart)}`}
          >
            <CartIcon />
            <span className="hidden sm:inline">{t.nav.cart}</span>
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -end-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C9A962] px-1 text-[10px] font-semibold text-white">
                {itemCount > 99 ? "99+" : itemCount}
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
            aria-current={isHome ? "page" : undefined}
            className={`flex min-h-[44px] shrink-0 items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors sm:min-h-0 ${navTabClass(isHome)}`}
          >
            {t.nav.home}
          </Link>
          {categories.map((cat) => {
            const active = isShop && categoryParam === cat.slug && !searchParams.get("tag");
            return (
              <Link
                key={cat.slug}
                href={path(`/shop?category=${cat.slug}`)}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-[44px] shrink-0 items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors sm:min-h-0 ${navTabClass(active)}`}
              >
                {cat.name}
              </Link>
            );
          })}
          <Link
            href={path("/gift")}
            aria-current={isGift ? "page" : undefined}
            className={`flex min-h-[44px] shrink-0 items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors sm:min-h-0 ${navTabClass(isGift)}`}
          >
            {t.nav.gift}
          </Link>
          <Link
            href={path("/blog")}
            aria-current={isBlog ? "page" : undefined}
            className={`flex min-h-[44px] shrink-0 items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors sm:min-h-0 ${navTabClass(isBlog)}`}
          >
            {t.nav.blog}
          </Link>
        </div>
      </nav>

      {/* Mobile menu: touch-optimized */}
      {mobileMenuOpen && (
        <div className="border-t border-rose-200/50 bg-[#FFFEF9] px-4 py-4 md:hidden">
          <form onSubmit={handleSearch} className="mb-4 flex gap-0 rounded-lg border border-foreground/20 bg-white overflow-hidden">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.search.placeholder}
              className="flex-1 min-w-0 px-4 py-3 text-base text-foreground placeholder:text-foreground/50 focus:outline-none"
              aria-label="Search products"
            />
            <button
              type="submit"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-12 w-12 shrink-0 items-center justify-center bg-foreground text-[#FFFEF9]"
              aria-label="Search"
            >
              <SearchIcon />
            </button>
          </form>
          <div className="flex flex-col gap-1">
            <p className="mb-3 px-1 text-sm text-foreground/70">🚚 {t.header.freeShipping}</p>
            <Link
              href={path("/")}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={isHome ? "page" : undefined}
              className={`touch-target flex min-h-[44px] items-center rounded-lg px-3 py-3 text-base font-medium ${mobileNavClass(isHome)}`}
            >
              {t.nav.home}
            </Link>
            {categories.map((cat) => {
              const active = isShop && categoryParam === cat.slug && !searchParams.get("tag");
              return (
                <Link
                  key={cat.slug}
                  href={path(`/shop?category=${cat.slug}`)}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`touch-target flex min-h-[44px] items-center rounded-lg px-3 py-3 text-base font-medium ${mobileNavClass(active)}`}
                >
                  {cat.name}
                </Link>
              );
            })}
            <Link
              href={path("/gift")}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={isGift ? "page" : undefined}
              className={`touch-target flex min-h-[44px] items-center rounded-lg px-3 py-3 text-base font-medium ${mobileNavClass(isGift)}`}
            >
              {t.nav.gift}
            </Link>
            <Link
              href={path("/blog")}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={isBlog ? "page" : undefined}
              className={`touch-target flex min-h-[44px] items-center rounded-lg px-3 py-3 text-base font-medium ${mobileNavClass(isBlog)}`}
            >
              {t.nav.blog}
            </Link>
            {!authLoading && !user && (
              <Link
                href={path("/login?return=/account")}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isLogin ? "page" : undefined}
                className={`touch-target flex min-h-[44px] items-center rounded-lg px-3 py-3 text-base font-medium ${mobileNavClass(isLogin)}`}
              >
                {t.nav.signIn}
              </Link>
            )}
            <Link
              href={path("/account")}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={isAccount ? "page" : undefined}
              className={`touch-target flex min-h-[44px] items-center rounded-lg px-3 py-3 text-base font-medium ${mobileNavClass(isAccount)}`}
            >
              {t.nav.account}
            </Link>
            <Link
              href={path("/cart")}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={isCart ? "page" : undefined}
              className={`touch-target flex min-h-[44px] items-center gap-2 rounded-lg px-3 py-3 text-base font-medium ${mobileNavClass(isCart)}`}
            >
              <CartIcon />
              {t.nav.cart}
              {itemCount > 0 && (
                <span className="rounded-full bg-[#C9A962] px-2 py-0.5 text-xs font-semibold text-white">
                  {itemCount}
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
