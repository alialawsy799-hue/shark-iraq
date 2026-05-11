"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Beaker, ChevronLeft, Flame, ShieldPlus, Sparkles } from "lucide-react";
import type { Category, ProductLine } from "@/lib/data";
import { site } from "@/lib/site";
import { DualVideoMarquees } from "./VideoMarquee";
import { SharkFeedbackSection } from "./Reviews";

const lineCardIconByCategory: Record<string, React.ReactNode> = {
  supplements: <Beaker className="h-7 w-7 sm:h-8 sm:w-8" />,
  "weight-loss": <Flame className="h-7 w-7 sm:h-8 sm:w-8" />,
  "hair-care": <Sparkles className="h-7 w-7 sm:h-8 sm:w-8" />,
  dental: <ShieldPlus className="h-7 w-7 sm:h-8 sm:w-8" />,
};

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

function VimeoLargeEmbed({ vimeoId, title }: { vimeoId: string; title: string }) {
  const src = `https://player.vimeo.com/video/${encodeURIComponent(
    vimeoId
  )}?title=0&byline=0&portrait=0&playsinline=1`;
  return (
    <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-[0_0_48px_rgba(30,111,217,0.12)] ring-1 ring-brand/15">
      <div className="aspect-video w-full min-h-[200px]">
        <iframe
          src={src}
          className="h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          title={title}
        />
      </div>
    </div>
  );
}

export function CategoryPageClient({
  category,
  lines,
}: {
  category: Category;
  lines: ProductLine[];
}) {
  return (
    <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
      {/* تعريف المسار — شعار + حركات + توهج */}
      <section className="relative min-w-0 overflow-x-clip pt-8 pb-12 sm:pt-10 sm:pb-16">
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
            <div className="mb-8 flex w-full flex-col items-stretch gap-5 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
              <motion.div
                className="flex items-center gap-3 sm:gap-4"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.08, duration: 0.45, type: "spring", stiffness: 260, damping: 22 }}
              >
                <motion.div
                  className="relative shrink-0"
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div
                    className="pointer-events-none absolute -inset-2 rounded-2xl bg-brand/20 blur-xl"
                    aria-hidden
                  />
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

              <motion.div
                className="origin-right h-px w-full bg-gradient-to-l from-transparent via-white/15 to-transparent sm:hidden"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.25, duration: 0.6 }}
              />
            </div>

            <motion.p
              className="text-xs font-extrabold tracking-[0.22em] text-brand sm:text-sm"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12, duration: 0.4 }}
            >
              {category.title}
            </motion.p>

            <motion.h1
              dir="rtl"
              className="mt-3 max-w-3xl text-balance text-3xl font-extrabold leading-[1.25] tracking-tight sm:text-4xl md:text-[2.5rem] md:leading-snug"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.45 }}
            >
              <CategorySubtitle text={category.subtitle} />
            </motion.h1>

            <motion.p
              dir="rtl"
              className="mt-6 max-w-3xl text-pretty text-base leading-8 text-white/70 sm:mt-7 sm:text-lg sm:leading-9"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28, duration: 0.5 }}
            >
              {category.introAr}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* شريط الفيديوهات مثل الصفحة الرئيسية */}
      <section className="border-t border-white/[0.06] bg-white/[0.02] py-10 sm:py-14">
        <div className="shark-container">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
            لقطات ومحتوى
          </p>
          <h2
            dir="rtl"
            className="mt-1 text-center text-xl font-extrabold text-white sm:text-2xl"
          >
            من عملنا ومسارات التدريب
          </h2>
          <p
            dir="rtl"
            className="mx-auto mt-2 max-w-xl text-center text-sm text-white/55"
          >
            فيديوهات من ثقة المستخدمين — لقطات حقيقية من التجربة والمتابعة مع SHARK TEAM، تعكس الشفافية
            والالتزام بالجودة قبل أن تختار. يمكنك تشغيل الصوت على أي مقطع عبر زر «صوت» عند الحاجة.
          </p>
        </div>
        <div className="shark-container mt-8 min-w-0 max-w-5xl">
          <DualVideoMarquees />
        </div>
      </section>

      {/* ثلاثة خطوط منتج — مربعات مثل مسارات المكملات */}
      <section className="py-12 sm:py-16">
        <div className="shark-container">
          <div>
            <p className="text-xs font-extrabold tracking-[0.22em] text-brand">خطوط المنتج</p>
            <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">اختر خط المنتج</h2>
            <p dir="rtl" className="mt-3 max-w-2xl text-white/65">
              ثلاثة خطوط لكل مسار — اضغط على المربع لعرض الأنواع وفيديو الشرح وآراء العملاء.
            </p>
          </div>

          <ul
            className="mx-auto mt-10 grid w-full max-w-3xl list-none grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5 lg:gap-6"
            role="list"
          >
            {lines.map((line, idx) => (
              <motion.li
                key={line.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
              >
                <Link
                  href={`/category/${category.slug}/l/${line.id}`}
                  aria-label={`فتح ${line.title}`}
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
                  <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-brand/30 bg-brand/10 text-brand shadow-[0_0_24px_rgba(30,111,217,0.18)] transition group-hover:border-brand/55 group-hover:bg-brand/[0.16] sm:h-16 sm:w-16">
                    {lineCardIconByCategory[category.slug] ?? (
                      <Sparkles className="h-7 w-7 sm:h-8 sm:w-8" />
                    )}
                  </div>
                  <div className="relative mt-3 text-base font-extrabold leading-tight text-white sm:mt-4 sm:text-xl">
                    {line.title}
                  </div>
                  <div className="relative mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-white/60 sm:text-xs">
                    {line.subtitle}
                  </div>
                  <div className="relative mt-3 flex items-center justify-center gap-1.5 text-[11px] font-extrabold tracking-[0.18em] text-brand/85">
                    <span>عرض التفاصيل</span>
                    <ChevronLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* فيديو توضيحي كبير */}
      <section className="border-t border-white/[0.06] py-12 sm:py-16" id="explainer-video">
        <div className="shark-container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 dir="rtl" className="text-xl font-extrabold text-white sm:text-2xl">
              {category.explainerVideoTitleAr}
            </h2>
            <p dir="rtl" className="mt-2 text-sm text-white/55 sm:text-base">
              {category.explainerVideoNameAr}
            </p>
          </div>
          <div className="mt-8 sm:mt-10">
            <VimeoLargeEmbed
              vimeoId={category.explainerVimeoId}
              title={category.explainerVideoTitleAr}
            />
          </div>
        </div>
      </section>

      <SharkFeedbackSection categoryTitle={category.title} />
    </main>
  );
}
