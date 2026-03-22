import Link from "next/link";
import type { BlogPost } from "@/lib/content/blog/types";
import type { Locale } from "@/lib/i18n/locale";
import { pathWithLocale } from "@/lib/i18n/paths";
import { translations } from "@/lib/i18n/translations";

/**
 * Editorial card: soft lingerie-brand mood — warm surface, lace-adjacent accent, no corporate gray slab.
 */
export default function JournalPostCard({ post, locale }: { post: BlogPost; locale: Locale }) {
  const t = translations[locale];
  const href = pathWithLocale(locale, `/blog/${post.slug}`);

  return (
    <article className="h-full">
      <Link
        href={href}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-rose-100/90 bg-white/75 p-5 shadow-[0_6px_28px_rgba(120,60,50,0.06)] backdrop-blur-[2px] transition-all duration-300 hover:border-rose-200/90 hover:shadow-[0_14px_40px_rgba(120,60,50,0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400/60 sm:p-6"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-rose-200/90 via-amber-100/80 to-rose-100/50 opacity-90"
          aria-hidden
        />
        <p className="line-clamp-2 text-[10px] font-medium uppercase tracking-[0.22em] text-rose-800/65">
          {post.seoKeyword}
        </p>
        <h3 className="font-heading mt-3 text-lg font-medium leading-snug text-rose-950 transition-colors group-hover:text-rose-900 sm:text-[1.125rem]">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-stone-700/90">{post.metaDescription}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-rose-800/55 transition-colors group-hover:text-rose-950">
          <span className="border-b border-rose-300/60 pb-px group-hover:border-rose-400/80">{t.blogSection.readArticle}</span>
          <span aria-hidden>→</span>
        </span>
      </Link>
    </article>
  );
}
