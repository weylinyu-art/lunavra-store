"use client";

import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";
import BrandLogo from "@/components/BrandLogo";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "@/lib/config/whatsapp";

export default function Footer() {
  const { t, path } = useLocale();
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <footer className="border-t border-neutral-200/80 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-8">
          <div className="lg:col-span-4">
            <Link href={path("/")} className="inline-block rounded-lg outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-neutral-400/50">
              <BrandLogo variant="footer" />
            </Link>
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-foreground/80">
              {t.footer.about}
            </h3>
            <div className="mt-2 space-y-2 text-sm leading-relaxed text-foreground/70">
              {t.brandStory.bodyShort.split("\n\n").map((block, i) => (
                <p key={i} className="whitespace-pre-line">
                  {block}
                </p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
              {t.footer.contact}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-foreground/70">
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900">
                  {t.footer.whatsapp} {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-neutral-900">
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-foreground/80">
              {t.footer.shipping}
            </h3>
            <p className="mt-2 text-sm text-foreground/70">{t.footer.shippingText}</p>
          </div>

          <div className="lg:col-span-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
              {t.footer.newsletter}
            </h3>
            <p className="mt-2 max-w-none text-sm leading-relaxed text-foreground/70">{t.footer.newsletterText}</p>
            <form className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-stretch" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t.footer.newsletterPlaceholder}
                className="min-h-[44px] min-w-0 flex-1 rounded-lg border border-neutral-200/80 bg-white px-4 py-3 text-base text-foreground placeholder:text-foreground/50 focus:border-neutral-400 focus:outline-none sm:py-2 sm:text-sm"
              />
              <button
                type="submit"
                className="min-h-[44px] shrink-0 rounded-lg bg-foreground px-8 py-3 text-base font-medium text-white transition-colors active:scale-[0.98] sm:min-h-0 sm:py-2 sm:text-sm hover:bg-foreground/90"
              >
                {t.footer.subscribe}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-200/80 pt-6 sm:mt-12 sm:pt-8">
          <div className="text-center lg:text-end">
            <p className="text-xs font-medium uppercase tracking-wider text-foreground/60">{t.footer.paymentMethods}</p>
            <p className="mt-2 text-xs text-foreground/50" aria-label={t.footer.paymentPlaceholder}>
              {t.footer.paymentPlaceholder}
            </p>
          </div>
          <p className="mt-8 text-center text-xs text-foreground/60 lg:text-start">
            © {new Date().getFullYear()} NileChic. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
