"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Beaker, Flame, ShieldPlus, Sparkles } from "lucide-react";
import type { Category, CategorySlug, Product } from "@/lib/data";
import { site } from "@/lib/site";

const productIconByCategory: Record<CategorySlug, React.ReactNode> = {
  supplements: <Beaker className="h-7 w-7 sm:h-8 sm:w-8" />,
  "weight-loss": <Flame className="h-7 w-7 sm:h-8 sm:w-8" />,
  "hair-care": <Sparkles className="h-7 w-7 sm:h-8 sm:w-8" />,
  dental: <ShieldPlus className="h-7 w-7 sm:h-8 sm:w-8" />,
};

function hasProductPhoto(image: string) {
  return image.startsWith("/products/");
}

/** نسبة إطار بطاقات المنتجات (مطابقة لصور شارك بيرنر) */
const PRODUCT_CARD_ASPECT = "aspect-[819/1024]";

function ProductSoonOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-3xl">
      <div className="absolute inset-0 bg-black/35" aria-hidden />
      <div
        className="absolute left-1/2 top-1/2 w-[155%] -translate-x-1/2 -translate-y-1/2 -rotate-45 transform-gpu border-y border-brand/45 bg-gradient-to-r from-brand/95 via-brand-strong to-brand/95 py-2 text-center shadow-[0_8px_28px_rgba(30,111,217,0.55)] sm:py-2.5"
        role="status"
        aria-label="قريباً"
      >
        <span
          dir="ltr"
          className="block text-[15px] font-black tracking-[0.4em] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)] sm:text-base"
        >
          SOON&nbsp;!
        </span>
      </div>
    </div>
  );
}

/** يقسّم السطر الفرعي على • بأسلوب عرض أنظف */
function CategorySubtitle({ text }: { text: string }) {
  const parts = text.split(/\s*•\s*/).map((p) => p.trim()).filter(Boolean);
  if (parts.length <= 1) {
    return <span className="text-white">{text}</span>;
  }
  return (
    <>
      {parts.map((part, i) => (
        <span key={`${i}-${part}`}>
          {i > 0 && (
            <span className="mx-1.5 text-brand/50 sm:mx-2" aria-hidden>
              •
            </span>
          )}
          <span
            className={
              i === 0
                ? "bg-gradient-to-l from-brand via-brand-strong to-white/95 bg-clip-text text-transparent"
                : "text-white"
            }
          >
            {part}
          </span>
        </span>
      ))}
    </>
  );
}

export function CategoryPageClient({
  category,
  products,
}: {
  category: Category;
  products: Product[];
}) {
  return (
    <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
      {/* رأس المسار */}
      <section className="relative min-w-0 overflow-x-clip pt-8 pb-10 sm:pt-10 sm:pb-14">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[280px] w-[min(120%,720px)] -translate-x-1/2 rounded-[50%] blur-[80px] sm:h-[320px]"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(30, 111, 217, 0.22) 0%, rgba(30, 111, 217, 0.06) 45%, transparent 70%)",
          }}
          aria-hidden
        />

        <div className="relative shark-container">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start"
          >
            <div className="mb-6 flex w-full flex-col items-stretch gap-5 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
              <motion.div
                className="flex items-center gap-3 sm:gap-4"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.08, duration: 0.45, type: "spring", stiffness: 260, damping: 22 }}
              >
                <motion.div
                  className="relative shrink-0"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="pointer-events-none absolute -inset-2 rounded-2xl bg-brand/20 blur-xl" aria-hidden />
                  <div className="relative overflow-hidden rounded-2xl bg-white/[0.05] p-2 ring-1 ring-white/15 shadow-[0_0_32px_rgba(30,111,217,0.25)]">
                    <Image
                      src="/branding/shark-logo.png"
                      alt={site.name}
                      width={180}
                      height={64}
                      className="h-11 w-auto sm:h-12"
                      priority
                    />
                  </div>
                </motion.div>
                <div className="min-w-0 text-start">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand/90 sm:text-xs">
                    {site.name}
                  </p>
                  <p className="mt-0.5 text-xs text-white/45">{site.tagline}</p>
                </div>
              </motion.div>
            </div>

            <p className="text-xs font-extrabold tracking-[0.22em] text-brand sm:text-sm">{category.title}</p>
            <h1
              dir="rtl"
              className="mt-3 max-w-3xl text-balance text-3xl font-extrabold leading-[1.25] tracking-tight sm:text-4xl md:text-[2.5rem] md:leading-snug"
            >
              <CategorySubtitle text={category.subtitle} />
            </h1>
            <p
              dir="rtl"
              className="mt-5 max-w-3xl text-pretty text-base leading-8 text-white/70 sm:mt-6 sm:text-lg sm:leading-9"
            >
              {category.introAr}
            </p>
          </motion.div>
        </div>
      </section>

      {/* المنتجات — مربعات بنفس تصميم «اختر مسارك» */}
      <section className="border-t border-white/[0.06] py-12 sm:py-16">
        <div className="shark-container">
          <div className="text-center sm:text-start">
            <p className="text-xs font-extrabold tracking-[0.22em] text-brand">المنتجات</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              اختر المنتج
            </h2>
            <p dir="rtl" className="mx-auto mt-3 max-w-2xl leading-7 text-white/70 sm:mx-0">
              اضغط على أي منتج لعرض التفاصيل وآراء العملاء.
            </p>
          </div>

          <ul
            className="mx-auto mt-8 grid w-full max-w-3xl list-none grid-cols-2 gap-3 sm:gap-5 lg:gap-6"
            role="list"
          >
            {products.map((p, idx) => {
              const isComingSoon = Boolean(p.comingSoon);
              const cardClass = [
                "group shark-card relative w-full overflow-hidden rounded-3xl text-center",
                hasProductPhoto(p.image)
                  ? `block ${PRODUCT_CARD_ASPECT}`
                  : "flex aspect-square flex-col items-center justify-center p-4 sm:p-6",
                isComingSoon
                  ? "cursor-not-allowed"
                  : "transition hover:border-brand/45 hover:shadow-[0_0_40px_rgba(30,111,217,0.18)] active:scale-[0.985] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/55",
              ].join(" ");

              const cardInner = (
                <>
                  {hasProductPhoto(p.image) ? (
                    <div
                      className={[
                        "relative h-full w-full bg-black",
                        isComingSoon ? "blur-[3px] opacity-55 saturate-75" : "",
                      ].join(" ")}
                      aria-hidden={isComingSoon || undefined}
                    >
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(max-width:640px) 45vw, 320px"
                        className={[
                          "object-cover object-center",
                          isComingSoon ? "" : "transition duration-300 group-hover:scale-[1.03]",
                        ].join(" ")}
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"
                        aria-hidden
                      />
                      <div className="absolute inset-x-0 bottom-0 z-10 px-3 pb-3 pt-8 sm:px-4 sm:pb-4">
                        <div className="line-clamp-2 text-base font-extrabold leading-tight text-white sm:text-xl">
                          {p.name}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div
                        className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_70%_60%_at_50%_25%,rgba(30,111,217,0.16),transparent_70%)] opacity-80 transition group-hover:opacity-100"
                        aria-hidden
                      />
                      <div
                        className={[
                          "relative flex flex-col items-center",
                          isComingSoon ? "blur-[3px] opacity-55 saturate-75" : "",
                        ].join(" ")}
                        aria-hidden={isComingSoon || undefined}
                      >
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-brand/30 bg-brand/10 text-brand shadow-[0_0_24px_rgba(30,111,217,0.18)] sm:h-16 sm:w-16">
                          {productIconByCategory[category.slug] ?? (
                            <Sparkles className="h-7 w-7" />
                          )}
                        </div>
                        <div className="mt-3 line-clamp-2 text-base font-extrabold leading-tight text-white sm:mt-4 sm:text-xl">
                          {p.name}
                        </div>
                      </div>
                    </>
                  )}
                  {isComingSoon && <ProductSoonOverlay />}
                </>
              );

              return (
                <motion.li
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                >
                  {isComingSoon ? (
                    <div className={cardClass} role="status" aria-label={`${p.name} — قريباً`}>
                      {cardInner}
                    </div>
                  ) : (
                    <Link
                      href={`/category/${category.slug}/${p.id}`}
                      aria-label={`فتح ${p.name}`}
                      className={cardClass}
                    >
                      {cardInner}
                    </Link>
                  )}
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
