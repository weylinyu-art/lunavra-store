import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogBody from "@/components/BlogBody";
import { getAllSlugs, getPostBySlug } from "@/lib/content/blog";
import { products } from "@/lib/data/products";
import type { Locale } from "@/lib/i18n/locale";
import { pathWithLocale } from "@/lib/i18n/paths";
import { translations } from "@/lib/i18n/translations";

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

export default async function BlogArticlePage({ params }: Props) {
  const { locale: loc, slug } = await params;
  const locale = (loc === "ar" ? "ar" : "en") as Locale;
  const t = translations[locale];
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = post.relatedProductIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="text-sm text-foreground/65">
        <Link href={pathWithLocale(locale, "/")} className="hover:text-[#C9A962]">
          {t.nav.home}
        </Link>
        <span className="mx-2">/</span>
        <Link href={pathWithLocale(locale, "/blog")} className="hover:text-[#C9A962]">
          {t.nav.blog}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground/90">{post.title}</span>
      </nav>

      <header className="mt-8 border-b border-rose-200/40 pb-8">
        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#C9A962]">{post.seoKeyword}</p>
        <h1 className="font-heading mt-3 text-3xl font-light leading-tight tracking-wide text-foreground sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-foreground/70 sm:text-base">{post.metaDescription}</p>
      </header>

      <div className="mt-10">
        <BlogBody body={post.body} locale={locale} />
      </div>

      {related.length > 0 && (
        <section className="mt-14 border-t border-rose-200/50 pt-10">
          <h2 className="font-heading text-lg font-medium text-foreground sm:text-xl">{t.product.relatedTitle}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {related.map((p) => {
              const name = locale === "ar" ? p.nameAr : p.name;
              return (
                <li key={p.id}>
                  <Link href={pathWithLocale(locale, `/product/${p.id}`)} className="text-[#C9A962] hover:underline">
                    {name}
                  </Link>
                  <span className="text-foreground/60"> — ${p.price}</span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <footer className="mt-12 rounded-2xl bg-[#FDF2F4]/80 p-6 text-center sm:p-8">
        <p className="text-sm text-foreground/80">{t.blogSection.articleOutro}</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Link
            href={pathWithLocale(locale, "/shop")}
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-[#FFFEF9] hover:bg-foreground/90"
          >
            {t.hero.shopNow}
          </Link>
          <Link
            href={pathWithLocale(locale, "/blog")}
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#C9A962]/50 px-6 py-3 text-sm font-medium text-foreground hover:bg-[#C9A962]/10"
          >
            {t.blogSection.discoverMore}
          </Link>
        </div>
      </footer>
    </article>
  );
}
