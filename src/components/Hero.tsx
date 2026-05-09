"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { arabicBioPlaceholder, heroHeadlineAr } from "@/lib/data";
import { site } from "@/lib/site";

/** يفصل العنوان لإبراز الجزء العربي باللون */
function HeadlineDisplay() {
  const dash = heroHeadlineAr.indexOf(" - ");
  if (dash === -1) {
    return (
      <span className="text-white drop-shadow-sm">{heroHeadlineAr}</span>
    );
  }
  const en = heroHeadlineAr.slice(0, dash).trim();
  const ar = heroHeadlineAr.slice(dash + 3).trim();
  return (
    <>
      <span className="text-white">{en}</span>
      <span className="mx-1.5 text-white/40 sm:mx-2">—</span>
      <span className="bg-gradient-to-l from-brand via-brand-strong to-white bg-clip-text font-extrabold text-transparent">
        {ar}
      </span>
    </>
  );
}

export function Hero() {
  return (
    <section className="relative min-w-0 overflow-x-clip pt-12 pb-16 sm:pt-14 sm:pb-20">
      {/* توهج خفيف في الخلفية */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[min(85vh,520px)] w-[min(140%,920px)] -translate-x-1/2 rounded-[50%] blur-[100px]"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 35%, rgba(30, 111, 217, 0.28) 0%, rgba(43, 126, 235, 0.08) 45%, transparent 72%)",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-[14%] h-56 w-56 -translate-x-1/2 rounded-full bg-brand/15 blur-3xl" />

      <div className="relative shark-container">
        {/* شريط الهوية: محاذاة واضحة، فاصل بصري عن المحتوى */}
        <header className="flex w-full items-center justify-start gap-0 border-b border-white/[0.07] pb-6 sm:pb-7">
          <div className="flex min-w-0 items-center gap-3.5 sm:gap-5">
            <div
              className={[
                "relative flex size-[52px] shrink-0 items-center justify-center overflow-hidden rounded-2xl sm:size-[60px] md:size-[68px]",
                "bg-white/[0.04] ring-1 ring-white/[0.12]",
                "shadow-[0_0_0_1px_rgba(30,111,217,0.12),0_12px_40px_rgba(30,111,217,0.22),0_0_80px_rgba(30,111,217,0.12)]",
              ].join(" ")}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_80%_80%_at_50%_30%,rgba(30,111,217,0.35),transparent_65%)]"
                aria-hidden
              />
              <Image
                src="/branding/shark-logo.png"
                alt={`شعار ${site.name}`}
                width={200}
                height={72}
                className="relative z-[1] h-8 w-auto sm:h-9 md:h-10"
                priority
              />
            </div>

            <div className="min-w-0 text-start">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand/90 sm:text-xs">
                {site.name}
              </p>
              <p
                dir="rtl"
                className="mt-1 max-w-[min(100%,280px)] text-[13px] leading-snug text-white/55 sm:text-sm sm:leading-relaxed"
              >
                {site.tagline}
              </p>
            </div>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-3xl flex-col items-center pt-10 text-center sm:pt-12 md:pt-14"
        >
          <h1
            dir="rtl"
            className="text-balance text-3xl font-extrabold leading-[1.22] tracking-[-0.02em] sm:text-4xl md:text-5xl lg:text-[3.1rem] lg:leading-[1.18]"
          >
            <HeadlineDisplay />
          </h1>

          <p
            dir="rtl"
            className="mt-6 max-w-2xl text-pretty text-base leading-8 text-white/60 sm:mt-8 sm:text-lg sm:leading-9"
          >
            {arabicBioPlaceholder}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <a
              href="#categories"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-6 text-sm font-semibold text-white shadow-[0_0_40px_rgba(30,111,217,0.12)] transition hover:border-brand/35 hover:bg-brand/10"
            >
              ابدأ اليوم
              <ArrowUpLeft className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#why-shark"
              className="text-sm font-medium text-white/45 underline decoration-brand/40 decoration-2 underline-offset-[6px] transition hover:text-white/80"
            >
              لماذا SHARK TEAM؟
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
