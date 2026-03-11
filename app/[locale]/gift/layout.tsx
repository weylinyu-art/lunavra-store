import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gift",
  description:
    "The perfect gift for someone special. Explore LUNAVRA romantic gift collections for anniversaries and birthdays.",
};

export default function GiftLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
