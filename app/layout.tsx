import type { Metadata } from "next";
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
    default: "NileChic | Elegant Lingerie - nilechic.com",
    template: "%s | NileChic - nilechic.com",
  },
  description:
    "Elegant lingerie designed to make every woman feel confident and beautiful. Shop discreet packaging, cash on delivery. nilechic.com",
  keywords: ["lingerie", "elegant", "feminine", "luxury", "lunavra", "cash on delivery"],
  openGraph: {
    title: "NileChic | Elegant Lingerie",
    description: "Celebrate your femininity with elegant lingerie. Discreet packaging, cash on delivery.",
    url: "https://nilechic.com",
    siteName: "NileChic",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
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
      </head>
      <body className={`${cormorant.variable} ${dmSans.variable} ${notoArabic.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
