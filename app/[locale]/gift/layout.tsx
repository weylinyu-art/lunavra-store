import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gifts | NileChic",
  description:
    "Curated lingerie and sleepwear gifts—lace, silk, discreet packaging. Shop by occasion: for her, anniversary, birthday, or yourself.",
  openGraph: {
    title: "Gifts | NileChic",
    description: "Hand-picked pieces for gifting, delivered with care and privacy.",
  },
};

export default function GiftLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
