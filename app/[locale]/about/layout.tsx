import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about NileChic. Our mission to celebrate femininity with elegant lingerie. Quality, privacy, elegance, comfort.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
