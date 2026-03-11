"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { pathWithLocale } from "@/lib/i18n/paths";
import { pathWithoutLocale } from "@/lib/i18n/paths";
import { getPreferredLocale, setLocaleCookie } from "@/lib/locale/utils";

export default function LocaleInit() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const currentLocale = pathname.startsWith("/ar") ? "ar" : "en";
    const preferred = getPreferredLocale();
    if (currentLocale !== preferred) {
      const base = pathWithoutLocale(pathname);
      const query = searchParams.toString();
      const fullPath = query ? `${base}?${query}` : base;
      setLocaleCookie(preferred);
      router.replace(pathWithLocale(preferred, fullPath));
    }
  }, [pathname, searchParams, router]);

  return null;
}
