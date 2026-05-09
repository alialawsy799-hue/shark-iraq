import { notFound } from "next/navigation";
import { CategoryPageClient } from "@/components/CategoryPageClient";
import { getCategoryBySlug, getProductsByCategory, type CategorySlug } from "@/lib/data";
import { Footer } from "@/components/Footer";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return notFound();

  const products = getProductsByCategory(category.slug as CategorySlug);
  if (products.length === 0) return notFound();

  return (
    <>
      <CategoryPageClient category={category} products={products} />
      <Footer />
    </>
  );
}

