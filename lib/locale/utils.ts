const LOCALE_COOKIE = "nilechic-locale";

export function getPreferredLocale(): "en" | "ar" {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`));
  if (match) return match[1] === "ar" ? "ar" : "en";
  const lang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || "";
  return /^ar/i.test(lang) ? "ar" : "en";
}

export function setLocaleCookie(locale: "en" | "ar") {
  if (typeof document === "undefined") return;
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;samesite=lax`;
}
