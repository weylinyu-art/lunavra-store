import Link from "next/link";
import type { BlogPost } from "@/lib/content/blog/types";
import type { Locale } from "@/lib/i18n/locale";
import { pathWithLocale } from "@/lib/i18n/paths";

/**
 * Single surface: keyword + title + excerpt only. No duplicate CTAs or read-time footer.
 */
export default function JournalPostCard({ post, locale }: { post: BlogPost; locale: Locale }) {
  const href = pathWithLocale(locale, `/blog/${post.slug}`);

  return (
    <article className="h-full">
      <Link
        href={href}
        className="group flex h-full flex-col rounded-xl border border-neutral-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:border-neutral-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 sm:p-6"
      >
        <p className="line-clamp-2 text-[11px] font-medium uppercase tracking-wider text-neutral-900/95">{post.seoKeyword}</p>
        <h3 className="font-heading mt-2 text-lg font-medium leading-snug text-foreground transition-colors group-hover:text-neutral-900 sm:text-[1.125rem]">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-foreground/72">{post.metaDescription}</p>
      </Link>
    </article>
  );
}
