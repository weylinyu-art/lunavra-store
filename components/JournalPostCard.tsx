import Link from "next/link";
import type { BlogPost } from "@/lib/content/blog/types";
import type { Locale } from "@/lib/i18n/locale";
import { pathWithLocale } from "@/lib/i18n/paths";

function estimateReadMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export default function JournalPostCard({
  post,
  locale,
  readLabel,
  minutesLabel,
}: {
  post: BlogPost;
  locale: Locale;
  readLabel: string;
  minutesLabel: string;
}) {
  const href = pathWithLocale(locale, `/blog/${post.slug}`);
  const mins = estimateReadMinutes(post.body);

  return (
    <article className="group flex h-full flex-col rounded-xl border border-rose-200/45 bg-[#FFFEF9] p-5 shadow-sm transition-all duration-300 hover:border-[#C9A962]/35 hover:shadow-[0_8px_30px_rgba(201,169,98,0.12)] sm:p-6">
      <p className="line-clamp-2 text-[11px] font-medium uppercase tracking-wider text-[#C9A962]/95">{post.seoKeyword}</p>
      <h3 className="font-heading mt-2 text-lg font-medium leading-snug text-foreground sm:text-[1.125rem]">
        <Link href={href} className="transition-colors hover:text-[#C9A962]">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-foreground/72">{post.metaDescription}</p>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-rose-200/35 pt-4">
        <span className="text-xs text-foreground/50">
          {mins} {minutesLabel}
        </span>
        <Link
          href={href}
          className="shrink-0 text-sm font-medium text-[#C9A962] underline-offset-4 transition-colors hover:underline"
        >
          {readLabel}
        </Link>
      </div>
    </article>
  );
}
