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
  title: "Journal | NileChic",
  description:
    "Premium lingerie journal—fit guides, fabric care, bridal timelines, and minimalist wardrobe edits from NileChic.",
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
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-10">
      {/* Masthead */}
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#C9A962]">NileChic</p>
        <h1 className="font-heading mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-tight tracking-wide text-foreground">
          {t.blogSection.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-foreground/75 sm:text-lg">
          {t.blogSection.subtitle}
        </p>
      </header>

      {/* Topic jump — horizontal modular nav */}
      <nav
        className="mt-10 flex flex-wrap items-center justify-center gap-2 border-y border-rose-200/40 bg-[#FFFEF9]/90 py-4 sm:gap-3"
        aria-label={t.journal.browseTopic}
      >
        <span className="w-full text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/45 sm:w-auto sm:pe-2">
          {t.journal.browseTopic}
        </span>
        {JOURNAL_SECTION_ORDER.map((id) => {
          const { title } = sectionCopy(id, t);
          return (
            <a
              key={id}
              href={`#journal-${id}`}
              className="rounded-full border border-rose-200/60 bg-[#FAF8F5] px-4 py-2 text-xs font-medium text-foreground/85 transition-colors hover:border-[#C9A962]/50 hover:bg-[#C9A962]/10 hover:text-foreground"
            >
              {title}
            </a>
          );
        })}
      </nav>

      {/* Editor’s picks — featured row */}
      {editorPicks.length > 0 && (
        <section className="mt-14" aria-labelledby="journal-picks-heading">
          <h2 id="journal-picks-heading" className="font-heading text-center text-xl font-light text-foreground sm:text-2xl">
            {t.journal.editorsPicks}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {editorPicks.map((post) => (
              <JournalPostCard
                key={post.slug}
                post={post}
                locale={locale}
                readLabel={t.journal.readArticle}
                minutesLabel={t.journal.minutesRead}
              />
            ))}
          </div>
        </section>
      )}

      {/* Modular columns — one section = one band */}
      <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-24">
        {JOURNAL_SECTION_ORDER.map((id) => {
          const posts = grouped[id];
          if (posts.length === 0) return null;
          const { title, desc } = sectionCopy(id, t);

          return (
            <section
              key={id}
              id={`journal-${id}`}
              className="scroll-mt-28 border-t border-rose-200/35 pt-14 first:border-t-0 first:pt-0 sm:pt-16"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                <div className="max-w-2xl">
                  <h2 className="font-heading text-2xl font-light tracking-wide text-foreground sm:text-3xl">{title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70 sm:text-base">{desc}</p>
                </div>
                <Link
                  href={pathWithLocale(locale, `/shop`)}
                  className="shrink-0 text-sm font-medium text-[#C9A962] hover:underline"
                >
                  {t.hero.shopNow} →
                </Link>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
                {posts.map((post) => (
                  <JournalPostCard
                    key={post.slug}
                    post={post}
                    locale={locale}
                    readLabel={t.journal.readArticle}
                    minutesLabel={t.journal.minutesRead}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
