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
        title: `${product.title} | Woodenza`,
        description: product.description,
      }
    : {
        title: "Producto no disponible | Woodenza",
        description:
          "No encontramos esta referencia en el catálogo actual de Woodenza. Explora otras opciones de leña, pellets y calefacción.",
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
