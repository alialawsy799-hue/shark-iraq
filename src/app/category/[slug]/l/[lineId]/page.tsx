import { notFound } from "next/navigation";
import { ProductLinePageClient } from "@/components/ProductLinePageClient";
import { Footer } from "@/components/Footer";
import { getCategoryBySlug, getProductLine, type CategorySlug } from "@/lib/data";

export default async function ProductLinePage({
  params,
}: {
  params: Promise<{ slug: string; lineId: string }>;
}) {
  const { slug, lineId } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return notFound();

  const line = getProductLine(category.slug as CategorySlug, lineId);
  if (!line) return notFound();

  return (
    <>
      <ProductLinePageClient category={category} line={line} />
      <Footer />
    </>
  );
}
