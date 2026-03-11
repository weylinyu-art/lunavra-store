import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop elegant lingerie at NileChic. Lingerie sets, bras, sleepwear. Discreet packaging, cash on delivery.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
