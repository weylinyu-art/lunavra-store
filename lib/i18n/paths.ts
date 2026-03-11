import type { Locale } from "./locale";

/**
 * Prefix a path with the locale. Use for building hrefs in links.
 * Handles query strings: pathWithLocale("en", "/shop?category=x") => "/en/shop?category=x"
 * @example pathWithLocale("en", "/shop") => "/en/shop"
 * @example pathWithLocale("ar", "/") => "/ar"
 */
export function pathWithLocale(locale: Locale, path: string): string {
  const [pathPart, queryPart] = path.split("?");
  const cleanPath = pathPart === "/" ? "" : pathPart.replace(/^\//, "");
  const base = `/${locale}${cleanPath ? `/${cleanPath}` : ""}`;
  return queryPart ? `${base}?${queryPart}` : base;
}

/**
 * Get the path without the locale prefix from a pathname.
 * @example pathWithoutLocale("/en/shop") => "/shop"
 * @example pathWithoutLocale("/ar/product/1") => "/product/1"
 */
export function pathWithoutLocale(pathname: string, locales: string[] = ["en", "ar"]): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "/";
  if (locales.includes(segments[0])) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname;
}
