import Link from "next/link";
import type { Metadata } from "next";
import { allBlogPosts } from "@/lib/content/blog";
import type { Locale } from "@/lib/i18n/locale";
import { pathWithLocale } from "@/lib/i18n/paths";
import { translations } from "@/lib/i18n/translations";

export const metadata: Metadata = {
  title: "Journal | NileChic",
  description:
    "Premium lingerie journal—fit guides, fabric care, bridal timelines, and minimalist wardrobe edits from NileChic.",
};

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params;
  const locale = (loc === "ar" ? "ar" : "en") as Locale;
  const t = translations[locale];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#C9A962]">NileChic</p>
        <h1 className="font-heading mt-2 text-3xl font-light tracking-wide text-foreground sm:text-4xl">
          {t.blogSection.title}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-foreground/75 sm:text-base">{t.blogSection.subtitle}</p>
      </header>
      <ul className="mt-12 space-y-6">
        {allBlogPosts.map((post) => (
          <li key={post.slug}>
            <article className="rounded-2xl border border-rose-200/40 bg-[#FFFEF9] p-6 transition-shadow hover:shadow-md sm:p-8">
              <p className="text-[10px] font-medium uppercase tracking-widest text-[#C9A962]">{post.seoKeyword}</p>
              <h2 className="font-heading mt-2 text-xl font-medium text-foreground sm:text-2xl">
                <Link href={pathWithLocale(locale, `/blog/${post.slug}`)} className="hover:text-[#C9A962]">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-foreground/70">{post.metaDescription}</p>
              <Link
                href={pathWithLocale(locale, `/blog/${post.slug}`)}
                className="mt-4 inline-block text-sm font-medium text-[#C9A962] hover:underline"
              >
                {t.blogSection.readArticle}
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
