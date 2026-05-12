"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Beaker, Flame, ShieldPlus, Sparkles } from "lucide-react";
import type { Category } from "@/lib/data";

const iconsBySlug: Record<string, React.ReactNode> = {
  supplements: <Beaker className="h-7 w-7 sm:h-8 sm:w-8" />,
  "weight-loss": <Flame className="h-7 w-7 sm:h-8 sm:w-8" />,
  "hair-care": <Sparkles className="h-7 w-7 sm:h-8 sm:w-8" />,
  dental: <ShieldPlus className="h-7 w-7 sm:h-8 sm:w-8" />,
};

export function ProductCategoriesGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="py-14 sm:py-16">
      <div className="shark-container">
        <div className="text-center sm:text-start">
          <div className="text-xs font-extrabold tracking-[0.22em] text-brand">التصنيفات</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            اختر مسارك
          </h2>
          <p className="mx-auto mt-3 max-w-2xl leading-7 text-white/70 sm:mx-0">
            أربعة مسارات — اضغط على المربع لعرض منتجاته.
          </p>
        </div>

        {/* شبكة 2×2 ثابتة على جميع المقاسات */}
        <ul
          className="mx-auto mt-8 grid w-full max-w-3xl list-none grid-cols-2 gap-3 sm:gap-5 lg:gap-6"
          role="list"
        >
          {categories.map((c, idx) => {
            const isComingSoon = c.slug === "dental";
            const cardClasses = [
              "group shark-card relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden rounded-3xl p-4 text-center sm:p-6",
              isComingSoon
                ? "cursor-not-allowed"
                : "transition hover:border-brand/45 hover:shadow-[0_0_40px_rgba(30,111,217,0.18)] active:scale-[0.985]",
            ].join(" ");

            const cardInner = (
              <>
                <div
                  className={[
                    "pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_70%_60%_at_50%_25%,rgba(30,111,217,0.16),transparent_70%)]",
                    isComingSoon ? "opacity-50" : "opacity-80 transition group-hover:opacity-100",
                  ].join(" ")}
                  aria-hidden
                />

                <div
                  className={[
                    "relative flex flex-col items-center",
                    isComingSoon ? "blur-[3px] opacity-55 saturate-75" : "",
                  ].join(" ")}
                  aria-hidden={isComingSoon || undefined}
                >
                  <div
                    className={[
                      "relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-brand/30 bg-brand/10 text-brand shadow-[0_0_24px_rgba(30,111,217,0.18)] sm:h-16 sm:w-16",
                      isComingSoon ? "" : "transition group-hover:border-brand/55 group-hover:bg-brand/[0.16]",
                    ].join(" ")}
                  >
                    {iconsBySlug[c.slug] ?? <Sparkles className="h-7 w-7" />}
                  </div>

                  <div className="relative mt-3 text-base font-extrabold leading-tight text-white sm:mt-4 sm:text-xl">
                    {c.title}
                  </div>
                  <div className="relative mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-white/60 sm:text-xs">
                    {c.subtitle}
                  </div>
                </div>

                {isComingSoon && (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                    {/* تعتيم إضافي للخلف */}
                    <div className="absolute inset-0 bg-black/35" aria-hidden />
                    {/* الشريط القطري من زاوية لزاوية */}
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
                )}
              </>
            );

            return (
              <motion.li
                key={c.slug}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
              >
                {isComingSoon ? (
                  <div className={cardClasses} aria-disabled="true" title="قريباً">
                    {cardInner}
                  </div>
                ) : (
                  <Link href={`/category/${c.slug}`} className={cardClasses}>
                    {cardInner}
                  </Link>
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
