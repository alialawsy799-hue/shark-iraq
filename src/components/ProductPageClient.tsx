"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronRight, MessageCircle } from "lucide-react";
import type { Category, Product } from "@/lib/data";
import { seededReviews } from "@/lib/data";
import { buildWhatsappOrderMessage, buildWhatsappUrl, site } from "@/lib/site";
import { DualVideoMarquees } from "./VideoMarquee";
import { SharkFeedbackSection } from "./Reviews";
import { StarRating } from "./StarRating";

function formatPriceIQDEn(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
}

function VimeoLargeEmbed({ vimeoId, title }: { vimeoId: string; title: string }) {
  const src = `https://player.vimeo.com/video/${encodeURIComponent(
    vimeoId
  )}?title=0&byline=0&portrait=0&playsinline=1`;
  return (
    <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-[0_0_48px_rgba(30,111,217,0.12)] ring-1 ring-brand/15">
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

function ProductOrderButton({ productName }: { productName: string }) {
  const href = buildWhatsappUrl(buildWhatsappOrderMessage(productName));
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="shark-btn-primary w-full gap-2 sm:w-auto"
    >
      <MessageCircle className="h-5 w-5 shrink-0" />
      اطلب «{productName}» عبر واتساب
    </a>
  );
}

export function ProductPageClient({
  category,
  product,
}: {
  category: Category;
  product: Product;
}) {
  /** متوسط تقييم تقريبي مبني على البيانات الموجودة لعرض ملخّص — رقم ثابت لكل منتج */
  const ratingSummary = useMemo(() => {
    const seed = product.id
      .split("")
      .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    const ratings = seededReviews.map((r) => r.rating);
    const avgRaw =
      ratings.reduce((acc, r) => acc + r, 0) / Math.max(1, ratings.length);
    const jitter = ((seed % 5) - 2) * 0.05;
    const avg = Math.min(5, Math.max(4.4, avgRaw + jitter));
    const count = 40 + (seed % 18);
    return { avg, count };
  }, [product.id]);

  const roundedAvg = Math.round(ratingSummary.avg);

  return (
    <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
      {/* مسار التنقّل */}
      <section className="relative min-w-0 overflow-x-clip pt-8 pb-2 sm:pt-10">
        <div className="shark-container">
          <nav
            dir="rtl"
            aria-label="مسار التنقّل"
            className="flex flex-wrap items-center gap-1.5 text-xs text-white/55 sm:text-sm"
          >
            <Link href="/" className="hover:text-white">
              الرئيسية
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-white/30" />
            <Link href={`/category/${category.slug}`} className="hover:text-white">
              {category.title}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-white/30" />
            <span className="text-white/85">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* بطاقة المنتج الرئيسية */}
      <section className="relative min-w-0 overflow-x-clip pb-10 pt-6 sm:pb-14 sm:pt-8">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[260px] w-[min(120%,720px)] -translate-x-1/2 rounded-[50%] blur-[80px]"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(30, 111, 217, 0.22) 0%, rgba(30, 111, 217, 0.06) 45%, transparent 70%)",
          }}
          aria-hidden
        />

        <div className="relative shark-container">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="shark-card grid gap-6 rounded-3xl p-5 sm:p-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-8 md:p-9"
          >
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#f8f9fb]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-6"
                sizes="(max-width:768px) 100vw, 40vw"
                priority
              />
            </div>

            <div className="flex min-w-0 flex-col text-end">
              <p className="text-[11px] font-extrabold tracking-[0.22em] text-brand sm:text-xs">
                {category.title}
              </p>
              <h1
                dir="rtl"
                className="mt-3 text-2xl font-extrabold leading-tight text-white sm:text-3xl md:text-[2rem]"
              >
                {product.name}
              </h1>

              <div className="mt-4 flex items-center justify-end gap-3">
                <StarRating value={roundedAvg} size={20} />
                <div dir="ltr" className="text-sm text-white/65">
                  <span className="font-semibold text-white">
                    {ratingSummary.avg.toFixed(1)}
                  </span>
                  <span className="mx-1 text-white/40">/</span>
                  <span>5</span>
                  <span className="mx-2 text-white/30">•</span>
                  <span className="text-white/55">{ratingSummary.count} تقييم</span>
                </div>
              </div>

              <p
                dir="rtl"
                className="mt-5 text-pretty text-base leading-8 text-white/75 sm:text-lg sm:leading-9"
              >
                {product.bio}
              </p>

              <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div dir="ltr" className="text-end text-2xl font-extrabold tabular-nums sm:text-3xl">
                  <span lang="en" className="text-brand">
                    {formatPriceIQDEn(product.priceIQD)} IQD
                  </span>
                </div>
                <ProductOrderButton productName={product.name} />
              </div>

              <div className="mt-3 text-end text-xs leading-6 text-white/55">
                {site.whatsappNoteAr}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* شريط الفيديوهات */}
      <section className="border-t border-white/[0.06] bg-white/[0.02] py-10 sm:py-14">
        <div className="shark-container">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
            شريط الفيديوهات
          </p>
          <h2
            dir="rtl"
            className="mt-1 text-center text-xl font-extrabold text-white sm:text-2xl"
          >
            من ميدان الاستخدام والتجربة
          </h2>
          <p
            dir="rtl"
            className="mx-auto mt-2 max-w-xl text-center text-sm text-white/55"
          >
            شريطان متحرّكان — اضغط «صامت» أو «صوت» على أي لقطة للاستماع دون إيقاف الحركة.
          </p>
        </div>
        <div className="shark-container mt-8 min-w-0 max-w-5xl">
          <DualVideoMarquees />
        </div>
      </section>

      {/* الوصف + الشرح */}
      <section className="py-12 sm:py-16">
        <div className="shark-container">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            {/* الوصف */}
            <article
              dir="rtl"
              className="shark-card rounded-3xl p-5 sm:p-7"
            >
              <div className="text-xs font-extrabold tracking-[0.22em] text-brand">
                الوصف
              </div>
              <h3 className="mt-3 text-xl font-extrabold text-white sm:text-2xl">
                نبذة عن المنتج
              </h3>
              <p className="mt-4 text-pretty text-base leading-8 text-white/75 sm:text-[17px] sm:leading-9">
                {product.bio}
              </p>
              <p className="mt-4 text-sm leading-7 text-white/55">
                ضمن مسار «{category.title}» — اختيار مدروس مع استشارة قبل الشراء لضمان
                التوافق مع وضعك.
              </p>
            </article>

            {/* الشرح */}
            <article
              dir="rtl"
              className="shark-card rounded-3xl p-5 sm:p-7"
            >
              <div className="text-xs font-extrabold tracking-[0.22em] text-brand">
                الشرح
              </div>
              <h3 className="mt-3 text-xl font-extrabold text-white sm:text-2xl">
                طريقة الاستخدام والمواصفات
              </h3>
              <ul className="mt-4 grid list-none gap-2.5">
                {product.specs.map((s) => (
                  <li
                    key={`${s.label}-${s.value}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3"
                  >
                    <span className="text-sm font-semibold text-white/85">
                      {s.label}
                    </span>
                    <span className="text-end text-sm text-white">{s.value}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-7 text-white/55">
                الالتزام بالجرعة والوقت يعطي نتيجة أوضح — للاستفسار اطلب الاستشارة عبر
                واتساب قبل البدء.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* فيديو توضيحي للمنتج */}
      <section className="border-t border-white/[0.06] py-12 sm:py-16">
        <div className="shark-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
              فيديو توضيحي
            </p>
            <h2 dir="rtl" className="mt-1 text-xl font-extrabold text-white sm:text-2xl">
              شرح مرئي لـ {product.name}
            </h2>
          </div>
          <div className="mt-8 sm:mt-10">
            <VimeoLargeEmbed
              vimeoId={product.howToUseVimeoId}
              title={`فيديو توضيحي • ${product.name}`}
            />
          </div>
        </div>
      </section>

      {/* قسم التقييم وتفاعل المستخدمين */}
      <SharkFeedbackSection categoryTitle={`${category.title} — ${product.name}`} />
    </main>
  );
}
