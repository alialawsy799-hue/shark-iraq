import { notFound } from "next/navigation";
import { ProductPageClient } from "@/components/ProductPageClient";
import { Footer } from "@/components/Footer";
import { getCategoryBySlug, getProductById } from "@/lib/data";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; productId: string }>;
}) {
  const { slug, productId } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return notFound();

  const product = getProductById(productId);
  if (!product || product.category !== category.slug) return notFound();

  return (
    <>
      <ProductPageClient category={category} product={product} />
      <Footer />
    </>
  );
}
