import type { Metadata } from "next";
import { ProductCategoriesGrid } from "@/components/CategoryGrid";
import { Footer } from "@/components/Footer";
import { categories } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `المكملات الغذائية • ${site.name}`,
  description:
    "اختر مسارك: بروتينات، حوارق دهون، منتجات الشعر والأسنان — مع استشارة قبل الطلب عبر واتساب.",
};

export default function MukammalatPage() {
  return (
    <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
      <div id="categories">
        <ProductCategoriesGrid categories={categories} />
      </div>
      <Footer />
    </main>
  );
}
