"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, MessageCircle } from "lucide-react";
import type { Category, Product } from "@/lib/data";
import { buildWhatsappOrderMessage, buildWhatsappUrl } from "@/lib/site";
import { site } from "@/lib/site";
import { DualVideoMarquees } from "./VideoMarquee";
import { SharkFeedbackSection } from "./Reviews";

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

/** أرقام إنجليزية + IQD للعرض */
function formatPriceIQDEn(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
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

function ProductOrderLink({ productName }: { productName: string }) {
  const href = buildWhatsappUrl(buildWhatsappOrderMessage(productName));
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand/35 bg-brand/10 py-2.5 text-sm font-semibold text-white transition hover:border-brand/55 hover:bg-brand/18"
    >
      <MessageCircle className="h-4 w-4 shrink-0" />
      اضغط للطلب
    </a>
  );
}

export function CategoryPageClient({
  category,
  products,
}: {
  category: Category;
  products: Product[];
}) {
  const displayProducts = useMemo(() => products.slice(0, 4), [products]);

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
            شريطان يتحركان باستمرار — اضغط «صامت» أو «صوت» على أي لقطة للاستماع دون إيقاف الحركة.
          </p>
        </div>
        <div className="shark-container mt-8 min-w-0 max-w-5xl">
          <DualVideoMarquees />
        </div>
      </section>

      {/* أربعة منتجات */}
      <section className="py-12 sm:py-16">
        <div className="shark-container">
          <div>
            <p className="text-xs font-extrabold tracking-[0.22em] text-brand">منتجات المسار</p>
            <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
              اختر ما يناسبك
            </h2>
            <p dir="rtl" className="mt-3 max-w-2xl text-white/65">
              أربعة خيارات مميزة لهذا التصنيف — الطلب عبر واتساب مع استشارة سريعة قبل الشراء.
            </p>
          </div>

          <ul
            className="mt-10 grid list-none grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
            role="list"
          >
            {displayProducts.map((p) => (
              <li key={p.id}>
                <article className="shark-card group flex h-full flex-col overflow-hidden rounded-3xl p-4 transition hover:border-brand/45 hover:shadow-[0_0_40px_rgba(30,111,217,0.16)] sm:p-5">
                  <Link
                    href={`/category/${category.slug}/${p.id}`}
                    aria-label={`فتح صفحة ${p.name}`}
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/55 rounded-2xl"
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-[#f8f9fb]">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-contain p-3 transition duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width:640px) 100vw, 25vw"
                      />
                    </div>
                    <h3 className="mt-4 text-center text-sm font-bold leading-snug text-white sm:text-base">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-center text-lg font-semibold tabular-nums">
                      <span dir="ltr" lang="en" className="inline-block tracking-tight text-brand">
                        {formatPriceIQDEn(p.priceIQD)} IQD
                      </span>
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-extrabold tracking-[0.18em] text-brand/85">
                      <span>عرض المنتج</span>
                      <ChevronLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
                    </div>
                  </Link>
                  <div className="mt-4">
                    <ProductOrderLink productName={p.name} />
                  </div>
                </article>
              </li>
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
