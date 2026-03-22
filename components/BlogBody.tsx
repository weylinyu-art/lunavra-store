import Link from "next/link";
import type { Locale } from "@/lib/i18n/locale";
import { pathWithLocale } from "@/lib/i18n/paths";

function parseInline(text: string, locale: Locale) {
  const segments = text.split(/(\[[^\]]+\]\(\/product\/[^)]+\))/g);
  return segments.map((seg, i) => {
    const m = seg.match(/^\[([^\]]+)\]\(\/product\/([^)]+)\)$/);
    if (m) {
      const href = pathWithLocale(locale, `/product/${m[2]}`);
      return (
        <Link key={i} href={href} className="font-medium text-[#C9A962] underline decoration-[#C9A962]/40 underline-offset-[3px] transition-colors hover:decoration-[#C9A962]">
          {m[1]}
        </Link>
      );
    }
    return <span key={i}>{seg}</span>;
  });
}

export default function BlogBody({ body, locale }: { body: string; locale: Locale }) {
  const blocks = body.trim().split(/\n\n+/);
  return (
    <div className="journal-article-body space-y-6 text-foreground/90">
      {blocks.map((block, i) => {
        const line = block.trim();
        if (line.startsWith("### ")) {
          return (
            <h3 key={i} className="font-heading pt-2 text-[1.125rem] font-semibold leading-snug tracking-wide text-foreground sm:text-xl">
              {parseInline(line.slice(4), locale)}
            </h3>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="font-heading mt-12 border-b border-rose-200/50 pb-3 text-[1.35rem] font-light leading-tight tracking-wide text-foreground first:mt-0 sm:mt-14 sm:text-[1.5rem]"
            >
              {parseInline(line.slice(3), locale)}
            </h2>
          );
        }
        return (
          <p key={i} className="text-[1.0625rem] leading-[1.82] tracking-[0.01em] text-foreground/88 sm:text-[1.075rem]">
            {parseInline(line, locale)}
          </p>
        );
      })}
    </div>
  );
}
