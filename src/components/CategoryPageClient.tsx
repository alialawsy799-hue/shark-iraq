"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import type { Category, Product } from "@/lib/data";
import { site } from "@/lib/site";

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
              اضغط على أي منتج لعرض الفيديو الشرح وآراء العملاء.
            </p>
          </div>

          <ul
            className="mx-auto mt-8 grid w-full max-w-3xl list-none grid-cols-2 gap-3 sm:gap-5 lg:gap-6"
            role="list"
          >
            {products.map((p, idx) => (
              <motion.li
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
              >
                <Link
                  href={`/category/${category.slug}/${p.id}`}
                  aria-label={`فتح ${p.name}`}
                  className={[
                    "group shark-card relative flex aspect-square w-full flex-col items-center justify-center rounded-3xl p-4 text-center sm:p-6",
                    "transition hover:border-brand/45 hover:shadow-[0_0_40px_rgba(30,111,217,0.18)] active:scale-[0.985]",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/55",
                  ].join(" ")}
                >
                  <div
                    className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_70%_60%_at_50%_25%,rgba(30,111,217,0.16),transparent_70%)] opacity-80 transition group-hover:opacity-100"
                    aria-hidden
                  />

                  <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-brand/30 bg-white/95 p-1.5 shadow-[0_0_24px_rgba(30,111,217,0.18)] transition group-hover:border-brand/55 sm:h-20 sm:w-20">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="(max-width:640px) 6rem, 8rem"
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="relative mt-3 line-clamp-2 text-base font-extrabold leading-tight text-white sm:mt-4 sm:text-lg">
                    {p.name}
                  </div>
                  <div className="relative mt-2 flex items-center justify-center gap-1.5 text-[11px] font-extrabold tracking-[0.18em] text-brand/85">
                    <span>عرض المنتج</span>
                    <ChevronLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
