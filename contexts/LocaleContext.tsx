"use client";

import React, { createContext, useContext } from "react";
import { translations } from "@/lib/i18n/translations";
import { pathWithLocale } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/locale";

type TranslationType = (typeof translations)[Locale];

interface LocaleContextType {
  locale: Locale;
  t: TranslationType;
  path: (path: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

interface LocaleProviderProps {
  children: React.ReactNode;
  locale: Locale;
}

export function LocaleProvider({ children, locale }: LocaleProviderProps) {
  const value: LocaleContextType = {
    locale,
    t: translations[locale] as TranslationType,
    path: (p: string) => pathWithLocale(locale, p),
  };

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
