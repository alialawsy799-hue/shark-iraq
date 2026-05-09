import { Hero } from "@/components/Hero";
import { VideoShowcaseSection } from "@/components/VideoShowcaseSection";
import { WhySharkSection } from "@/components/WhySharkSection";
import { ProductCategoriesGrid } from "@/components/CategoryGrid";
import { Footer } from "@/components/Footer";
import { categories } from "@/lib/data";

export default function Home() {
  return (
    <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
      <Hero />
      <VideoShowcaseSection />
      <WhySharkSection />
      <div id="categories">
        <ProductCategoriesGrid categories={categories} />
      </div>
      <Footer />
    </main>
  );
}
