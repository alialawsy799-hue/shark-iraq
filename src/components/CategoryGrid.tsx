"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, Beaker, Flame, ShieldPlus, Sparkles } from "lucide-react";
import type { Category } from "@/lib/data";

const iconsBySlug: Record<string, React.ReactNode> = {
  supplements: <Beaker className="h-5 w-5" />,
  "weight-loss": <Flame className="h-5 w-5" />,
  "hair-care": <Sparkles className="h-5 w-5" />,
  dental: <ShieldPlus className="h-5 w-5" />,
};

export function ProductCategoriesGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="py-14 sm:py-16">
      <div className="shark-container max-w-xl sm:max-w-none">
        <div>
          <div className="text-xs font-extrabold tracking-[0.22em] text-brand">التصنيفات</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            اختر مسارك
          </h2>
          <p className="mt-3 leading-7 text-white/70">
            مكملات غذائية، إنقاص وزن، عناية بالشعر والأسنان — الطلب مع استشارة عبر واتساب قبل
            الشراء.
          </p>
        </div>

        {/* عمودي بالكامل: بطاقة فوق بطاقة (لا تمرير أفقي) */}
        <ul className="mt-8 flex list-none flex-col gap-4" role="list">
          {categories.map((c, idx) => (
            <motion.li
              key={c.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
            >
              <Link
                href={`/category/${c.slug}`}
                className={[
                  "group shark-card flex w-full flex-col rounded-3xl px-5 py-5 sm:px-6 sm:py-6",
                  "transition hover:border-brand/45 hover:shadow-[0_0_40px_rgba(30,111,217,0.16)] active:scale-[0.995]",
                ].join(" ")}
              >
                <div className="flex flex-row-reverse items-start justify-between gap-4">
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-brand/30 bg-brand/10 text-brand transition group-hover:border-brand/50 group-hover:bg-brand/[0.14]">
                    {iconsBySlug[c.slug] ?? <Sparkles className="h-5 w-5" />}
                  </div>
                  <div className="min-w-0 flex-1 text-end">
                    <div className="text-lg font-bold text-white sm:text-xl">{c.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-white/70">{c.subtitle}</div>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <span className="text-[11px] font-extrabold tracking-[0.22em] text-brand/85">
                    عرض التفاصيل
                  </span>
                  <ChevronLeft className="h-5 w-5 shrink-0 text-brand/75 transition group-hover:-translate-x-0.5" />
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
