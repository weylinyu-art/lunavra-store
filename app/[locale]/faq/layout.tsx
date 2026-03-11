import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about NileChic: shipping to GCC & Egypt, delivery time, discreet packaging, cash on delivery, returns, and more.",
  openGraph: {
    title: "FAQ | NileChic",
    description:
      "Answers about shipping, delivery, packaging, and ordering from NileChic.",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
