import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogBody from "@/components/BlogBody";
import { getAllSlugs, getPostBySlug, allBlogPosts } from "@/lib/content/blog";
import { getRelatedInSection, getSectionForSlug } from "@/lib/content/blog/journal-sections";
import { products } from "@/lib/data/products";
import type { Locale } from "@/lib/i18n/locale";
import { pathWithLocale } from "@/lib/i18n/paths";
import { translations } from "@/lib/i18n/translations";

type Messages = (typeof translations)[Locale];

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  const locales = ["en", "ar"];
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Tips & ideas" };
  return {
    title: `${post.title} | NileChic`,
    description: post.metaDescription,
    keywords: [post.seoKeyword],
  };
}

function sectionTitleForArticle(sectionId: ReturnType<typeof getSectionForSlug>, t: Messages) {
  switch (sectionId) {
    case "fit":
      return t.journal.sectionFitTitle;
    case "fabrics":
      return t.journal.sectionFabricsTitle;
    case "style":
      return t.journal.sectionStyleTitle;
    case "occasion":
      return t.journal.sectionOccasionTitle;
    case "brand":
      return t.journal.sectionBrandTitle;
    default:
      return t.nav.blog;
  }
}

export default async function BlogArticlePage({ params }: Props) {
  const { locale: loc, slug } = await params;
  const locale = (loc === "ar" ? "ar" : "en") as Locale;
  const t = translations[locale];
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const sectionId = getSectionForSlug(post.slug);
  const sectionLabel = sectionTitleForArticle(sectionId, t);
  const moreInSection = getRelatedInSection(sectionId, allBlogPosts, post.slug, 5);

  const related = post.relatedProductIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12 xl:gap-16">
        {/* Main column */}
        <article className="min-w-0">
          <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-rose-800/55">
            <Link href={pathWithLocale(locale, "/")} className="transition-colors hover:text-rose-950">
              {t.nav.home}
            </Link>
            <span className="text-rose-300/90" aria-hidden>
              /
            </span>
            <Link href={pathWithLocale(locale, "/blog")} className="transition-colors hover:text-rose-950">
              {t.nav.blog}
            </Link>
            <span className="text-rose-300/90" aria-hidden>
              /
            </span>
            <span className="line-clamp-2 text-rose-950/90">{post.title}</span>
          </nav>

          <header className="relative mt-8 overflow-hidden rounded-[1.75rem] border border-rose-100/55 bg-gradient-to-br from-white/95 via-rose-50/35 to-amber-50/25 px-5 py-10 shadow-[0_20px_50px_rgba(80,40,40,0.06)] sm:px-9 sm:py-12">
            <div
              className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-rose-200/30 blur-3xl"
              aria-hidden
            />
            <div className="relative">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-rose-800/70">{post.seoKeyword}</p>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-rose-800/50">{sectionLabel}</p>
              <h1 className="font-heading mt-4 text-[clamp(1.6rem,4vw,2.45rem)] font-light leading-[1.18] tracking-[-0.02em] text-rose-950">
                {post.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-700/95 sm:text-lg">{post.metaDescription}</p>
            </div>
          </header>

          <div className="mx-auto mt-12 max-w-[42rem]">
            <BlogBody body={post.body} locale={locale} />
          </div>

          {related.length > 0 && (
            <section className="mx-auto mt-16 max-w-[42rem] border-t border-rose-200/60 pt-12" aria-labelledby="related-products-heading">
              <h2 id="related-products-heading" className="font-heading text-xl font-light text-rose-950">
                {t.product.relatedTitle}
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                {related.map((p) => {
                  const name = locale === "ar" ? p.nameAr : p.name;
                  return (
                    <li key={p.id}>
                      <Link
                        href={pathWithLocale(locale, `/product/${p.id}`)}
                        className="group block overflow-hidden rounded-xl border border-rose-100/80 bg-white/90 shadow-[0_6px_24px_rgba(80,40,40,0.05)] transition-shadow hover:shadow-[0_12px_32px_rgba(80,40,40,0.1)]"
                      >
                        <div className="relative aspect-[3/4] bg-neutral-50">
                          <Image
                            src={p.image}
                            alt={name}
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            sizes="(max-width: 640px) 100vw, 200px"
                          />
                        </div>
                        <div className="p-3">
                          <p className="font-heading text-sm font-medium text-rose-950 group-hover:text-rose-900">{name}</p>
                          <p className="mt-1 text-sm font-semibold text-rose-950/90">${p.price}</p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <footer className="mx-auto mt-16 max-w-[42rem] rounded-2xl border border-rose-100/50 bg-gradient-to-br from-rose-50/50 via-white to-amber-50/20 px-6 py-9 text-center shadow-[0_12px_40px_rgba(70,35,35,0.05)] sm:px-10">
            <p className="text-sm leading-relaxed text-stone-700/95 sm:text-base">{t.blogSection.articleOutro}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Link
                href={pathWithLocale(locale, "/shop")}
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-rose-950 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-rose-900"
              >
                {t.hero.shopNow}
              </Link>
              <Link
                href={pathWithLocale(locale, "/blog")}
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-rose-200/90 bg-white/80 px-8 py-3 text-sm font-medium text-rose-900 shadow-sm hover:bg-rose-50/90"
              >
                {t.blogSection.discoverMore}
              </Link>
            </div>
          </footer>
        </article>

        {/* Sidebar — desktop */}
        <aside className="mt-14 hidden lg:mt-0 lg:block">
          <div className="sticky top-28 space-y-10">
            <div className="rounded-2xl border border-rose-100/50 bg-gradient-to-b from-white/90 to-rose-50/25 p-5 shadow-[0_8px_32px_rgba(70,35,35,0.05)]">
              <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-rose-900/75">
                {t.journal.moreInSection}
              </h2>
              <p className="mt-1 text-xs text-rose-800/55">{sectionLabel}</p>
              <ul className="mt-4 space-y-3 border-t border-rose-100/60 pt-4">
                {moreInSection.length === 0 ? (
                  <li className="text-sm text-stone-600">
                    <Link href={pathWithLocale(locale, "/blog")} className="text-rose-900/90 underline decoration-rose-300/60 hover:decoration-rose-500/80">
                      {t.blogSection.discoverMore}
                    </Link>
                  </li>
                ) : (
                  moreInSection.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={pathWithLocale(locale, `/blog/${p.slug}`)}
                        className="line-clamp-2 text-sm leading-snug text-stone-700 transition-colors hover:text-rose-950"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>

            <Link
              href={pathWithLocale(locale, `/blog#journal-${sectionId}`)}
              className="flex w-full items-center justify-center rounded-xl border border-rose-200/70 bg-white/70 px-4 py-3 text-sm font-medium text-rose-900 shadow-sm transition-colors hover:border-rose-300 hover:bg-rose-50/90"
            >
              {t.journal.browseTopic}
            </Link>
          </div>
        </aside>
      </div>

      {/* Mobile: more in topic below */}
      <section className="mt-12 border-t border-rose-200/60 pt-10 lg:hidden" aria-labelledby="more-mobile-heading">
        <h2 id="more-mobile-heading" className="font-heading text-lg font-medium text-rose-950">
          {t.journal.moreInSection}
        </h2>
        <ul className="mt-4 space-y-3">
          {moreInSection.slice(0, 4).map((p) => (
            <li key={p.slug}>
              <Link href={pathWithLocale(locale, `/blog/${p.slug}`)} className="text-sm text-rose-900/90 hover:underline">
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
