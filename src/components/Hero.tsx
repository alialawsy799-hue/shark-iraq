"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AppleGlyph, GooglePlayGlyph, WhatsAppGlyph } from "./BrandIcons";
import { arabicBioPlaceholder, heroHeadlineAr } from "@/lib/data";
import { buildWhatsappProductsMessage, buildWhatsappUrl, site } from "@/lib/site";

const storeBtnClass = [
  "inline-flex size-11 items-center justify-center rounded-xl border border-brand/30 bg-white/[0.06] text-white",
  "shadow-[0_0_0_1px_rgba(43,126,235,0.12),0_0_16px_rgba(30,111,217,0.18)]",
  "transition hover:border-brand/50 hover:bg-brand/10",
  "hover:shadow-[0_0_0_1px_rgba(43,126,235,0.22),0_0_22px_rgba(30,111,217,0.28)]",
  "sm:size-12",
].join(" ");

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
  const productsWhatsappHref = buildWhatsappUrl(buildWhatsappProductsMessage());

  return (
    <section className="relative min-w-0 overflow-x-clip pt-12 pb-16 sm:pt-14 sm:pb-20">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[min(85vh,520px)] w-[min(140%,920px)] -translate-x-1/2 rounded-[50%] blur-[100px]"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 35%, rgba(30, 111, 217, 0.28) 0%, rgba(43, 126, 235, 0.08) 45%, transparent 72%)",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute left-1/2 top-[14%] h-56 w-56 -translate-x-1/2 rounded-full bg-brand/15 blur-3xl" />

      <div className="relative shark-container">
        {/* شريط الهوية: محاذاة واضحة، فاصل بصري عن المحتوى */}
        <header className="flex w-full items-center justify-start gap-0 border-b border-white/[0.12] pb-6 sm:pb-7">
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
            className="mt-6 max-w-2xl text-pretty text-base leading-8 text-white/75 sm:mt-8 sm:text-lg sm:leading-9"
          >
            {arabicBioPlaceholder}
          </p>

          <a
            href="#why-shark"
            className="mt-8 text-sm font-medium text-white/45 underline decoration-brand/40 decoration-2 underline-offset-[6px] transition hover:text-white/80 sm:mt-10"
          >
            لماذا SHARK TEAM؟
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          dir="ltr"
          className="mx-auto mt-10 grid w-full max-w-5xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 sm:mt-12 sm:gap-6 lg:gap-8"
        >
          {/* يسار الشاشة: صورة التطبيق ومتاجر التحميل */}
          <div className="flex flex-col items-center">
            <div className="w-full overflow-hidden rounded-2xl border border-brand/35 bg-black/30 shadow-[0_0_0_1px_rgba(43,126,235,0.16),0_0_28px_rgba(30,111,217,0.22)]">
              <Image
                src="/branding/shark-fit-app.jpg"
                alt="حمّل تطبيق شارك"
                width={1440}
                height={960}
                className="h-auto w-full"
                sizes="(min-width: 768px) 28rem, 50vw"
                priority
                unoptimized
              />
            </div>
            <div className="mt-4 flex items-center justify-center gap-3">
              <a
                href={site.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تنزيل من App Store"
                className={storeBtnClass}
              >
                <AppleGlyph className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a
                href={site.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تنزيل من Google Play"
                className={storeBtnClass}
              >
                <GooglePlayGlyph className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
          </div>

          <div
            className="h-24 w-px self-center bg-brand/55 sm:h-28"
            aria-hidden
          />

          {/* يمين الشاشة: نفس مستطيل واتساب أسفل الموقع */}
          <div dir="rtl" className="flex flex-col justify-center">
            <div className="text-sm font-semibold text-white">تواصل</div>
            <div className="mt-4">
              <a
                href={productsWhatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "inline-flex w-full items-center gap-3 rounded-xl border px-4 py-3 transition",
                  "border-[#25D366]/45 bg-[#25D366]/12 text-white shadow-[0_0_24px_rgba(37,211,102,0.12)]",
                  "hover:border-[#25D366]/70 hover:bg-[#25D366]/20 hover:shadow-[0_0_28px_rgba(37,211,102,0.22)]",
                ].join(" ")}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#25D366] text-white ring-1 ring-[#25D366]/55 shadow-[0_0_18px_rgba(37,211,102,0.45)]">
                  <WhatsAppGlyph className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold">واتساب</span>
              </a>
              <p className="mt-2 text-center text-xs text-white/70">استشارة طبية وطلب</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
