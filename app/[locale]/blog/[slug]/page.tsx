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
  if (!post) return { title: "Journal" };
  return {
    title: `${post.title} | NileChic Journal`,
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
          <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-foreground/60">
            <Link href={pathWithLocale(locale, "/")} className="transition-colors hover:text-[#C9A962]">
              {t.nav.home}
            </Link>
            <span className="text-foreground/35" aria-hidden>
              /
            </span>
            <Link href={pathWithLocale(locale, "/blog")} className="transition-colors hover:text-[#C9A962]">
              {t.nav.blog}
            </Link>
            <span className="text-foreground/35" aria-hidden>
              /
            </span>
            <span className="line-clamp-2 text-foreground/80">{post.title}</span>
          </nav>

          <header className="mt-8 rounded-2xl border border-rose-200/40 bg-[#FFFEF9] px-5 py-8 sm:px-8 sm:py-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C9A962]">{post.seoKeyword}</p>
            <p className="mt-3 text-xs font-medium uppercase tracking-wider text-foreground/50">{sectionLabel}</p>
            <h1 className="font-heading mt-3 text-[clamp(1.5rem,4vw,2.35rem)] font-light leading-[1.2] tracking-wide text-foreground">
              {post.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/72 sm:text-lg">{post.metaDescription}</p>
          </header>

          <div className="mx-auto mt-12 max-w-[42rem]">
            <BlogBody body={post.body} locale={locale} />
          </div>

          {related.length > 0 && (
            <section className="mx-auto mt-16 max-w-[42rem] border-t border-rose-200/45 pt-12" aria-labelledby="related-products-heading">
              <h2 id="related-products-heading" className="font-heading text-xl font-light text-foreground">
                {t.product.relatedTitle}
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                {related.map((p) => {
                  const name = locale === "ar" ? p.nameAr : p.name;
                  return (
                    <li key={p.id}>
                      <Link
                        href={pathWithLocale(locale, `/product/${p.id}`)}
                        className="group block overflow-hidden rounded-xl border border-rose-200/40 bg-[#FFFEF9] transition-shadow hover:shadow-md"
                      >
                        <div className="relative aspect-[3/4] bg-[#FAF8F5]">
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
                          <p className="font-heading text-sm font-medium text-foreground group-hover:text-[#C9A962]">{name}</p>
                          <p className="mt-1 text-sm font-semibold text-[#C9A962]">${p.price}</p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <footer className="mx-auto mt-16 max-w-[42rem] rounded-2xl bg-gradient-to-br from-[#FDF2F4] to-[#FFFEF9] px-6 py-8 text-center sm:px-10">
            <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">{t.blogSection.articleOutro}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Link
                href={pathWithLocale(locale, "/shop")}
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-foreground px-8 py-3 text-sm font-medium text-[#FFFEF9] transition-colors hover:bg-foreground/90"
              >
                {t.hero.shopNow}
              </Link>
              <Link
                href={pathWithLocale(locale, "/blog")}
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-[#C9A962]/50 px-8 py-3 text-sm font-medium text-foreground hover:bg-[#C9A962]/10"
              >
                {t.blogSection.discoverMore}
              </Link>
            </div>
          </footer>
        </article>

        {/* Sidebar — desktop */}
        <aside className="mt-14 hidden lg:mt-0 lg:block">
          <div className="sticky top-28 space-y-10">
            <div className="rounded-2xl border border-rose-200/45 bg-[#FFFEF9] p-5">
              <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground/70">
                {t.journal.moreInSection}
              </h2>
              <p className="mt-1 text-xs text-foreground/55">{sectionLabel}</p>
              <ul className="mt-4 space-y-3 border-t border-rose-200/35 pt-4">
                {moreInSection.length === 0 ? (
                  <li className="text-sm text-foreground/55">
                    <Link href={pathWithLocale(locale, "/blog")} className="text-[#C9A962] hover:underline">
                      {t.blogSection.discoverMore}
                    </Link>
                  </li>
                ) : (
                  moreInSection.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={pathWithLocale(locale, `/blog/${p.slug}`)}
                        className="line-clamp-2 text-sm leading-snug text-foreground/85 transition-colors hover:text-[#C9A962]"
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
              className="flex w-full items-center justify-center rounded-xl border border-[#C9A962]/40 bg-[#FAF8F5] px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-[#C9A962] hover:bg-[#C9A962]/10"
            >
              {t.journal.browseTopic}
            </Link>
          </div>
        </aside>
      </div>

      {/* Mobile: more in topic below */}
      <section className="mt-12 border-t border-rose-200/40 pt-10 lg:hidden" aria-labelledby="more-mobile-heading">
        <h2 id="more-mobile-heading" className="font-heading text-lg font-medium text-foreground">
          {t.journal.moreInSection}
        </h2>
        <ul className="mt-4 space-y-3">
          {moreInSection.slice(0, 4).map((p) => (
            <li key={p.slug}>
              <Link href={pathWithLocale(locale, `/blog/${p.slug}`)} className="text-sm text-[#C9A962] hover:underline">
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
