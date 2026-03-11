import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "NileChic Privacy Policy: how we collect, use, and protect your data. Discreet packaging, no data sharing.",
  openGraph: {
    title: "Privacy Policy | NileChic",
    description: "How NileChic protects your privacy and personal data.",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
