"use client";

import { useLocale } from "@/contexts/LocaleContext";
import { faqItems } from "@/lib/content/faq";
import { getFAQSchema } from "@/lib/seo/structured-data";

export default function FAQPage() {
  const { t, locale } = useLocale();
  const isAr = locale === "ar";

  const schema = getFAQSchema(
    faqItems.map((item) => ({
      question: isAr ? item.questionAr : item.question,
      answer: isAr ? item.answerAr : item.answer,
    }))
  );

  return (
    <div className="mx-auto max-w-3xl bg-neutral-100 px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="mb-12">
        <h1 className="font-heading text-4xl font-light tracking-wide text-foreground md:text-5xl">
          {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
        </h1>
        <p className="mt-4 text-foreground/70">
          {isAr
            ? "إجابات على الأسئلة الأكثر شيوعاً حول NileChic"
            : "Answers to the most common questions about NileChic"}
        </p>
      </header>

      <dl className="space-y-8">
        {faqItems.map((item, i) => (
          <div key={i} className="rounded-xl bg-white p-6 shadow-sm">
            <dt className="font-heading text-lg font-medium text-foreground">
              {isAr ? item.questionAr : item.question}
            </dt>
            <dd className="mt-4 leading-relaxed text-foreground/80">
              {isAr ? item.answerAr : item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
