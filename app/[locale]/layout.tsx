import { Suspense } from "react";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/locale";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LocaleInit from "@/components/LocaleInit";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <LocaleProvider locale={locale}>
      <CartProvider>
      <Suspense fallback={null}>
        <LocaleInit />
      </Suspense>
      <div className="flex min-h-screen flex-col">
        <Suspense fallback={<header className="h-16 border-b border-rose-200/50" />}>
          <Header />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </div>
      </CartProvider>
    </LocaleProvider>
  );
}
