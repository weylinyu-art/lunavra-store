"use client";

import { useLocale } from "@/contexts/LocaleContext";

export default function AboutPage() {
  const { t } = useLocale();

  const values = [
    { key: "quality", name: t.about.quality },
    { key: "privacy", name: t.about.privacy },
    { key: "elegance", name: t.about.elegance },
    { key: "comfort", name: t.about.comfort },
  ];

  return (
    <div className="mx-auto max-w-4xl bg-neutral-100 px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-16 text-center">
        <h1 className="font-heading text-4xl font-light tracking-wide text-foreground md:text-5xl">
          {t.about.title}
        </h1>
      </header>

      <section className="mb-16" aria-labelledby="mission-heading">
        <h2 id="mission-heading" className="font-heading text-2xl font-light text-foreground">
          {t.about.mission}
        </h2>
        <p className="mt-4 leading-relaxed text-foreground/80">
          {t.about.missionText}
        </p>
      </section>

      <section className="mb-16" aria-labelledby="story-heading">
        <h2 id="story-heading" className="font-heading text-2xl font-light text-foreground">
          {t.about.story}
        </h2>
        <p className="mt-4 leading-relaxed text-foreground/80">
          {t.about.storyText}
        </p>
        <p className="mt-4 leading-relaxed text-foreground/80">
          {t.about.storyPara2}
        </p>
        <p className="mt-4 leading-relaxed text-foreground/80">
          {t.about.storyPara3}
        </p>
      </section>

      <section aria-labelledby="values-heading">
        <h2 id="values-heading" className="font-heading text-2xl font-light text-foreground">
          {t.about.values}
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {values.map((v) => (
            <div
              key={v.key}
              className="hover-lift rounded-xl bg-white p-6 text-center shadow-sm transition-all duration-300"
            >
              <span className="font-medium text-foreground">{v.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
