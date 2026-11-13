import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";
import { productsData } from "@/data/products";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = productsData.find((item) => item.id === id);

  return product
    ? {
        title: `${product.title} | holzvanta`,
        description: product.description,
      }
    : {
        title: "Produkt nicht verfügbar | holzvanta",
        description:
          "Dieser Artikel ist derzeit nicht im holzvanta-Sortiment verfügbar. Entdecken Sie weitere Angebote an holzvanta, Pellets und Heizlösungen.",
      };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = productsData.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
