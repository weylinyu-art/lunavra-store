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
        <Link key={i} href={href} className="font-medium text-[#C9A962] underline-offset-2 hover:underline">
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
    <div className="prose-blog space-y-4 text-foreground/85">
      {blocks.map((block, i) => {
        const line = block.trim();
        if (line.startsWith("### ")) {
          return (
            <h3 key={i} className="font-heading text-lg font-medium text-foreground">
              {parseInline(line.slice(4), locale)}
            </h3>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h2 key={i} className="font-heading mt-8 text-xl font-light text-foreground first:mt-0 sm:text-2xl">
              {parseInline(line.slice(3), locale)}
            </h2>
          );
        }
        return (
          <p key={i} className="text-sm leading-relaxed sm:text-base">
            {parseInline(line, locale)}
          </p>
        );
      })}
    </div>
  );
}
