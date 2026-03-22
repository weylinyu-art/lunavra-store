import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nilechic.com"),
  title: {
    default: "NileChic | Elegant Lingerie - Luxury Intimate Wear | nilechic.com",
    template: "%s | NileChic - nilechic.com",
  },
  description:
    "NileChic offers elegant lingerie and intimate wear for women. Free shipping over $100. Discreet packaging. Cash on delivery. Ships to GCC & Egypt. Shop lingerie sets, bras, panties, sleepwear.",
  keywords: [
    "NileChic",
    "lingerie",
    "elegant lingerie",
    "luxury intimate wear",
    "women's underwear",
    "GCC lingerie",
    "Egypt lingerie",
    "cash on delivery",
    "discreet packaging",
    "bridal lingerie",
    "romantic gifts",
  ],
  openGraph: {
    title: "NileChic | Elegant Lingerie - Elegance Inspired by Beauty",
    description:
      "Luxury lingerie designed to celebrate femininity and confidence. Discreet packaging. Cash on delivery. Free shipping over $100. Ships to GCC & Egypt.",
    url: "https://nilechic.com",
    siteName: "NileChic",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://nilechic.com",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#fafafa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var path = window.location.pathname;
                if (path.startsWith('/ar')) {
                  document.documentElement.lang = 'ar';
                  document.documentElement.dir = 'rtl';
                } else {
                  document.documentElement.lang = 'en';
                  document.documentElement.dir = 'ltr';
                }
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "NileChic",
              url: "https://nilechic.com",
              description:
                "Elegant lingerie designed to celebrate femininity and confidence. Discreet packaging, cash on delivery. Ships to GCC & Egypt.",
            }),
          }}
        />
      </head>
      <body className={`${cormorant.variable} ${dmSans.variable} ${notoArabic.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
