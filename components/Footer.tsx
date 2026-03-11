"use client";

import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";
import { WHATSAPP_NUMBER } from "@/lib/config/whatsapp";

export default function Footer() {
  const { t, path } = useLocale();
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <footer className="border-t border-rose-200/50 bg-[#FFFEF9]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
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
            <ul className="mt-4 space-y-2">
              <li>
                <Link href={path("/")} className="text-sm text-foreground/70 hover:text-[#C9A962]">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href={path("/shop")} className="text-sm text-foreground/70 hover:text-[#C9A962]">
                  {t.nav.shop}
                </Link>
              </li>
              <li>
                <Link href={path("/gift")} className="text-sm text-foreground/70 hover:text-[#C9A962]">
                  {t.nav.gift}
                </Link>
              </li>
              <li>
                <Link href={path("/about")} className="text-sm text-foreground/70 hover:text-[#C9A962]">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href={path("/faq")} className="text-sm text-foreground/70 hover:text-[#C9A962]">
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
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t.footer.newsletterPlaceholder}
                className="flex-1 rounded-lg border border-rose-200/50 bg-white px-3 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:border-[#C9A962] focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-[#FFFEF9] transition-colors hover:bg-foreground/90"
              >
                {t.footer.subscribe}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-rose-200/50 pt-8 sm:flex-row">
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
