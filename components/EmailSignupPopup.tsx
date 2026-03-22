"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/contexts/LocaleContext";

const STORAGE_KEY = "nilechic-email-popup-dismissed";

export default function EmailSignupPopup() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      /* ignore */
    }
    const id = window.setTimeout(() => setVisible(true), 9000);
    return () => window.clearTimeout(id);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-popup-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        aria-label="Close"
        onClick={dismiss}
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-neutral-200/70 bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={dismiss}
          className="absolute end-3 top-3 rounded-lg px-2 py-1 text-sm text-foreground/50 hover:bg-neutral-100 hover:text-foreground"
          aria-label="Close"
        >
          ×
        </button>
        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-neutral-900">{t.emailPopup.kicker}</p>
        <h2 id="email-popup-title" className="font-heading mt-2 text-2xl font-light tracking-wide text-foreground">
          {t.emailPopup.headline}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground/75">{t.emailPopup.subheadline}</p>
        <p className="mt-3 text-sm font-medium text-neutral-900">{t.emailPopup.incentive}</p>
        <form
          className="mt-5 flex flex-col gap-2 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            dismiss();
          }}
        >
          <input
            type="email"
            required
            placeholder={t.footer.newsletterPlaceholder}
            className="min-h-[48px] flex-1 rounded-lg border border-neutral-200/80 bg-white px-4 py-3 text-base text-foreground placeholder:text-foreground/45 focus:border-neutral-400 focus:outline-none sm:text-sm"
          />
          <button
            type="submit"
            className="min-h-[48px] shrink-0 rounded-lg bg-foreground px-6 py-3 text-base font-medium text-white transition-colors hover:bg-foreground/90 sm:min-h-0 sm:text-sm"
          >
            {t.emailPopup.cta}
          </button>
        </form>
        <p className="mt-3 text-xs text-foreground/55">{t.emailPopup.disclaimer}</p>
      </div>
    </div>
  );
}
