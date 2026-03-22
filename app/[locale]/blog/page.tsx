import Link from "next/link";
import type { Metadata } from "next";
import { allBlogPosts, getPostBySlug } from "@/lib/content/blog";
import type { JournalSectionId } from "@/lib/content/blog/journal-sections";
import { groupPostsBySection, JOURNAL_SECTION_ORDER } from "@/lib/content/blog/journal-sections";
import type { Locale } from "@/lib/i18n/locale";
import { pathWithLocale } from "@/lib/i18n/paths";
import { translations } from "@/lib/i18n/translations";
import JournalPostCard from "@/components/JournalPostCard";

type Messages = (typeof translations)[Locale];

export const metadata: Metadata = {
  title: "Tips & ideas | NileChic",
  description:
    "Fit, fabrics, care, and quiet luxury—guides for lingerie, sleepwear, and dressing for yourself from NileChic.",
};

function sectionCopy(
  id: JournalSectionId,
  t: Messages
): { title: string; desc: string } {
  switch (id) {
    case "fit":
      return { title: t.journal.sectionFitTitle, desc: t.journal.sectionFitDesc };
    case "fabrics":
      return { title: t.journal.sectionFabricsTitle, desc: t.journal.sectionFabricsDesc };
    case "style":
      return { title: t.journal.sectionStyleTitle, desc: t.journal.sectionStyleDesc };
    case "occasion":
      return { title: t.journal.sectionOccasionTitle, desc: t.journal.sectionOccasionDesc };
    case "brand":
      return { title: t.journal.sectionBrandTitle, desc: t.journal.sectionBrandDesc };
    default:
      return { title: "", desc: "" };
  }
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params;
  const locale = (loc === "ar" ? "ar" : "en") as Locale;
  const t = translations[locale];
  const grouped = groupPostsBySection(allBlogPosts);

  const pickSlugs = [t.blogHighlights.oneSlug, t.blogHighlights.twoSlug, t.blogHighlights.threeSlug];
  const editorPicks = pickSlugs.map((slug) => getPostBySlug(slug)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 sm:py-12 lg:px-10">
      {/* Masthead — editorial, warm, not corporate white */}
      <header className="relative mx-auto overflow-hidden rounded-[2rem] border border-rose-100/50 bg-gradient-to-b from-white/90 via-rose-50/30 to-amber-50/20 px-6 py-12 text-center shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_20px_50px_rgba(90,40,40,0.06)] sm:px-10 sm:py-16">
        <div
          className="pointer-events-none absolute -left-24 top-0 h-48 w-48 rounded-full bg-rose-200/25 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 bottom-0 h-40 w-40 rounded-full bg-amber-100/30 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center">
          <div className="h-px w-14 bg-gradient-to-r from-transparent via-rose-400/60 to-transparent" aria-hidden />
          <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.42em] text-rose-800/75">NileChic</p>
          <h1 className="font-heading mt-4 text-[clamp(1.85rem,4.5vw,2.85rem)] font-light leading-[1.12] tracking-[-0.02em] text-rose-950">
            {t.blogSection.title}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-stone-700/90 sm:text-lg">
            {t.blogSection.subtitle}
          </p>
        </div>
      </header>

      {/* Topic jump */}
      <nav
        className="mt-10 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-rose-100/60 bg-white/45 px-3 py-5 shadow-[0_8px_32px_rgba(80,40,40,0.04)] backdrop-blur-sm sm:gap-3 sm:px-5"
        aria-label={t.journal.browseTopic}
      >
        <span className="w-full text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-rose-800/50 sm:w-auto sm:pe-2">
          {t.journal.browseTopic}
        </span>
        {JOURNAL_SECTION_ORDER.map((id) => {
          const { title } = sectionCopy(id, t);
          return (
            <a
              key={id}
              href={`#journal-${id}`}
              className="rounded-full border border-rose-200/70 bg-white/70 px-4 py-2 text-xs font-medium text-rose-900/85 shadow-sm transition-colors hover:border-rose-300 hover:bg-rose-50/90 hover:text-rose-950"
            >
              {title}
            </a>
          );
        })}
      </nav>

      {/* Editor’s picks */}
      {editorPicks.length > 0 && (
        <section className="mt-14 sm:mt-16" aria-labelledby="journal-picks-heading">
          <div className="text-center">
            <h2
              id="journal-picks-heading"
              className="font-heading text-xl font-light tracking-wide text-rose-950 sm:text-2xl"
            >
              {t.journal.editorsPicks}
            </h2>
            <div className="mx-auto mt-3 h-px w-16 bg-gradient-to-r from-transparent via-rose-300/70 to-transparent" aria-hidden />
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {editorPicks.map((post) => (
              <JournalPostCard key={post.slug} post={post} locale={locale} />
            ))}
          </div>
        </section>
      )}

      {/* Sections by topic */}
      <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-24">
        {JOURNAL_SECTION_ORDER.map((id) => {
          const posts = grouped[id];
          if (posts.length === 0) return null;
          const { title, desc } = sectionCopy(id, t);

          return (
            <section
              key={id}
              id={`journal-${id}`}
              className="scroll-mt-28 rounded-3xl border border-rose-100/40 bg-white/25 px-4 py-12 shadow-[0_12px_40px_rgba(70,35,35,0.04)] backdrop-blur-[1px] sm:px-8 sm:py-14"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                <div className="max-w-2xl">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-rose-800/55">{t.nav.blog}</p>
                  <h2 className="font-heading mt-2 text-2xl font-light tracking-wide text-rose-950 sm:text-3xl">{title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-stone-700/90 sm:text-base">{desc}</p>
                </div>
                <Link
                  href={pathWithLocale(locale, `/shop`)}
                  className="inline-flex shrink-0 items-center justify-center rounded-full border border-rose-200/80 bg-white/80 px-5 py-2.5 text-sm font-medium text-rose-900 shadow-sm transition-colors hover:border-rose-300 hover:bg-rose-50/90"
                >
                  {t.hero.shopNow} →
                </Link>
              </div>

              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
                {posts.map((post) => (
                  <JournalPostCard key={post.slug} post={post} locale={locale} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
