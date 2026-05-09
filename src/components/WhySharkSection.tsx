"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Dumbbell, HeartPulse, Sparkles } from "lucide-react";
import { useState } from "react";

const TABS = [
  {
    id: "path",
    label: "خارطة طريق واضحة",
    title: "من التشخيص الرياضي إلى المكمل المناسب",
    body:
      "نبدأ بفهم هدفك وحالتك، ثم نربط الاستشارة بخطة تغذية وتدريب واعية — لا وصفات عامة.",
    icon: Sparkles,
  },
  {
    id: "science",
    label: "أساس علمي",
    title: "استشارات تفهم الجسد قبل المنتج",
    body:
      "أطباء ومدربون يعملون ضمن إطار آمن: الجرعة، التوقيت، والتداخل مع أي حالة صحية.",
    icon: HeartPulse,
  },
  {
    id: "products",
    label: "مكملات أصلية",
    title: "منتجات مختارة وليس تسويق عشوائي",
    body:
      "نختار ما يناسب مسارك من مكملات أصلية، مع متابعة عبر واتساب قبل وبعد الطلب.",
    icon: Dumbbell,
  },
] as const;

export function WhySharkSection() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];
  const Icon = tab.icon;
  const nextIdx = (active + 1) % TABS.length;
  const nextTab = TABS[nextIdx];
  const NextIcon = nextTab.icon;

  return (
    <section id="why-shark" className="scroll-mt-8 py-16 sm:py-20">
      <div className="shark-container">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            dir="rtl"
            className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl"
          >
            لماذا نحن الخيار المناسب؟
          </h2>
          <p dir="rtl" className="mt-4 text-white/60 leading-relaxed">
            ثلاثة محاور تلخص تجربة SHARK TEAM: وضوح المسار، العلم، والمنتج الحقيقي.
          </p>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="محاور الفريق"
          className="mt-10 flex flex-wrap justify-center gap-2 border-b border-white/10 pb-px sm:mt-12"
        >
          {TABS.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={[
                "relative px-4 py-3 text-sm font-semibold transition sm:px-5",
                active === i ? "text-white" : "text-white/45 hover:text-white/75",
              ].join(" ")}
            >
              <span dir="rtl">{t.label}</span>
              {active === i && (
                <motion.span
                  layoutId="why-tab"
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-brand"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* بطاقتان: المحور النشط + المحور التالي */}
        <motion.div
          key={tab.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-10 grid gap-4 md:grid-cols-2"
        >
            <article className="shark-card flex min-h-[220px] flex-col rounded-3xl p-6 sm:p-8">
              <div className="flex items-start justify-between gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-brand/35 bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 p-2 text-white/50">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <h3 dir="rtl" className="mt-5 text-lg font-bold text-white sm:text-xl">
                {tab.title}
              </h3>
              <p dir="rtl" className="mt-3 flex-1 text-sm leading-7 text-white/65">
                {tab.body}
              </p>
              <div className="mt-6 h-24 rounded-2xl bg-gradient-to-br from-brand/20 via-black/40 to-black/60 ring-1 ring-white/10" />
            </article>

            <article className="shark-card flex min-h-[220px] flex-col rounded-3xl p-6 sm:p-8">
              <div className="flex items-start justify-between gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/15 bg-white/5 text-brand/90">
                  <NextIcon className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 p-2 text-white/50">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <h3 dir="rtl" className="mt-5 text-lg font-bold text-white sm:text-xl">
                {nextTab.title}
              </h3>
              <p dir="rtl" className="mt-3 flex-1 text-sm leading-7 text-white/65">
                {nextTab.body}
              </p>
              <div className="mt-6 h-24 rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent ring-1 ring-white/10" />
            </article>
        </motion.div>
      </div>
    </section>
  );
}
