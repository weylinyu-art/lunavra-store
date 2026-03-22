"use client";

import { useLocale } from "@/contexts/LocaleContext";
import { privacySections } from "@/lib/content/privacy";

export default function PrivacyPage() {
  const { locale } = useLocale();
  const isAr = locale === "ar";

  return (
    <div className="mx-auto max-w-3xl bg-neutral-100 px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-12">
        <h1 className="font-heading text-4xl font-light tracking-wide text-foreground md:text-5xl">
          {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
        </h1>
        <p className="mt-4 text-sm text-foreground/60">
          {isAr ? "آخر تحديث" : "Last updated"}: {new Date().toLocaleDateString(isAr ? "ar" : "en")}
        </p>
      </header>

      <div className="space-y-10">
        {privacySections.map((section, i) => (
          <section key={i}>
            <h2 className="font-heading text-xl font-medium text-foreground">
              {isAr ? section.titleAr : section.title}
            </h2>
            <p className="mt-4 leading-relaxed text-foreground/80">
              {isAr ? section.contentAr : section.content}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
