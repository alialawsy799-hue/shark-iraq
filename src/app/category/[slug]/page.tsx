import { notFound } from "next/navigation";
import { CategoryPageClient } from "@/components/CategoryPageClient";
import { getCategoryBySlug, getProductLinesByCategory, type CategorySlug } from "@/lib/data";
import { Footer } from "@/components/Footer";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return notFound();

  const lines = getProductLinesByCategory(category.slug as CategorySlug);
  if (lines.length === 0) return notFound();

  return (
    <>
      <CategoryPageClient category={category} lines={lines} />
      <Footer />
    </>
  );
}
