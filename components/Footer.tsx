"use client";

import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";

export default function Footer() {
  const { t, path } = useLocale();

  return (
    <footer className="border-t border-rose-200/50 bg-[#FFFEF9]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href={path("/")} className="text-xl font-light tracking-[0.2em] text-foreground">
              LUNAVRA
            </Link>
            <p className="mt-3 text-sm text-foreground/70">{t.footer.tagline}</p>
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
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
              {t.footer.contact}
            </h3>
            <p className="mt-4 text-sm text-foreground/70">{t.footer.domain}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-rose-200/50 pt-8 sm:flex-row">
          <p className="text-xs text-foreground/60">
            © {new Date().getFullYear()} LUNAVRA. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
