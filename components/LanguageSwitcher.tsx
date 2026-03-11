"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pathWithoutLocale, pathWithLocale } from "@/lib/i18n/paths";
import { setLocaleCookie } from "@/lib/locale/utils";

interface LanguageSwitcherProps {
  onNavigate?: () => void;
}

export default function LanguageSwitcher({ onNavigate }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const basePath = pathWithoutLocale(pathname);
  const fullPath = basePath || "/";

  const handleSwitch = (locale: "en" | "ar") => {
    setLocaleCookie(locale);
    onNavigate?.();
  };

  return (
    <div className="flex items-center gap-0.5 text-[11px] text-foreground/50">
      <Link
        href={pathWithLocale("en", fullPath)}
        onClick={() => handleSwitch("en")}
        className="px-1.5 py-0.5 transition-colors hover:text-foreground/80"
      >
        EN
      </Link>
      <span aria-hidden>·</span>
      <Link
        href={pathWithLocale("ar", fullPath)}
        onClick={() => handleSwitch("ar")}
        className="px-1.5 py-0.5 transition-colors hover:text-foreground/80"
      >
        ع
      </Link>
    </div>
  );
}
