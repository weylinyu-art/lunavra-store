"use client";

import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";
import { WHATSAPP_NUMBER } from "@/lib/config/whatsapp";

export default function Footer() {
  const { t, path } = useLocale();
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <footer className="border-t border-rose-200/50 bg-[#FFFEF9]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href={path("/")} className="text-xl font-light tracking-[0.2em] text-foreground">
              NileChic
            </Link>
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-foreground/80">
              {t.footer.about}
            </h3>
            <p className="mt-2 text-sm text-foreground/70">{t.footer.aboutText}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
              {t.footer.links}
            </h3>
            <ul className="mt-4 space-y-1 sm:space-y-2">
              <li>
                <Link href={path("/")} className="block min-h-[40px] py-2 text-sm text-foreground/70 hover:text-[#C9A962] active:text-[#C9A962] sm:min-h-0 sm:py-0">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href={path("/shop")} className="block min-h-[40px] py-2 text-sm text-foreground/70 hover:text-[#C9A962] active:text-[#C9A962] sm:min-h-0 sm:py-0">
                  {t.nav.shop}
                </Link>
              </li>
              <li>
                <Link href={path("/gift")} className="block min-h-[40px] py-2 text-sm text-foreground/70 hover:text-[#C9A962] active:text-[#C9A962] sm:min-h-0 sm:py-0">
                  {t.nav.gift}
                </Link>
              </li>
              <li>
                <Link href={path("/about")} className="block min-h-[40px] py-2 text-sm text-foreground/70 hover:text-[#C9A962] active:text-[#C9A962] sm:min-h-0 sm:py-0">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href={path("/faq")} className="block min-h-[40px] py-2 text-sm text-foreground/70 hover:text-[#C9A962] active:text-[#C9A962] sm:min-h-0 sm:py-0">
                  {t.footer.faq}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
              {t.footer.contact}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-foreground/70">
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A962]">
                  {t.footer.whatsapp}
                </a>
              </li>
              <li>{t.footer.domain}</li>
            </ul>
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-foreground/80">
              {t.footer.shipping}
            </h3>
            <p className="mt-2 text-sm text-foreground/70">{t.footer.shippingText}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
              {t.footer.newsletter}
            </h3>
            <p className="mt-2 text-sm text-foreground/70">{t.footer.newsletterText}</p>
            <form className="mt-4 flex flex-col gap-2 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t.footer.newsletterPlaceholder}
                className="min-h-[44px] flex-1 rounded-lg border border-rose-200/50 bg-white px-4 py-3 text-base text-foreground placeholder:text-foreground/50 focus:border-[#C9A962] focus:outline-none sm:py-2 sm:text-sm"
              />
              <button
                type="submit"
                className="min-h-[44px] shrink-0 rounded-lg bg-foreground px-6 py-3 text-base font-medium text-[#FFFEF9] transition-colors active:scale-[0.98] sm:min-h-0 sm:py-2 sm:text-sm hover:bg-foreground/90"
              >
                {t.footer.subscribe}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-rose-200/50 pt-6 sm:mt-12 sm:flex-row sm:pt-8">
          <p className="text-xs text-foreground/60">
            © {new Date().getFullYear()} NileChic. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <Link href={path("/privacy")} className="text-xs text-foreground/60 hover:text-[#C9A962]">
              {t.footer.privacy}
            </Link>
            <Link href={path("/faq")} className="text-xs text-foreground/60 hover:text-[#C9A962]">
              {t.footer.faq}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
