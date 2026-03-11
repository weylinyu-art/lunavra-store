import type { Metadata } from "next";
import { products } from "@/lib/data/products";

type Props = {
  params: Promise<{ locale: string; id: string }>;
  children: React.ReactNode;
};

export function generateStaticParams() {
  return products.flatMap((product) => [
    { locale: "en", id: product.id },
    { locale: "ar", id: product.id },
  ]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | LUNAVRA`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
