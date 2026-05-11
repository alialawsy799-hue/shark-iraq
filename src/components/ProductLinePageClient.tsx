"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, MessageCircle } from "lucide-react";
import type { Category, ProductLine } from "@/lib/data";
import { buildWhatsappOrderMessage, buildWhatsappUrl, site } from "@/lib/site";
import { SharkFeedbackSection } from "./Reviews";

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

function VariantOrderLink({ label }: { label: string }) {
  const href = buildWhatsappUrl(buildWhatsappOrderMessage(label));
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand/35 bg-brand/10 py-2.5 text-sm font-semibold text-white transition hover:border-brand/55 hover:bg-brand/18"
    >
      <MessageCircle className="h-4 w-4 shrink-0" />
      طلب عبر واتساب
    </a>
  );
}

export function ProductLinePageClient({
  category,
  line,
}: {
  category: Category;
  line: ProductLine;
}) {
  return (
    <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
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
            <Link href="/mukammalat" className="hover:text-white">
              المكملات الغذائية
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-white/30" />
            <Link href={`/category/${category.slug}`} className="hover:text-white">
              {category.title}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-white/30" />
            <span className="text-white/85">{line.title}</span>
          </nav>
        </div>
      </section>

      <section className="relative min-w-0 overflow-x-clip pb-8 pt-6 sm:pb-12 sm:pt-8">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[240px] w-[min(120%,640px)] -translate-x-1/2 rounded-[50%] blur-[72px]"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(30, 111, 217, 0.2) 0%, rgba(30, 111, 217, 0.06) 45%, transparent 70%)",
          }}
          aria-hidden
        />
        <div className="relative shark-container">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-extrabold tracking-[0.22em] text-brand sm:text-sm">{category.title}</p>
            <h1
              dir="rtl"
              className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl"
            >
              {line.title}
            </h1>
            <p dir="rtl" className="mt-4 max-w-2xl text-pretty text-base leading-8 text-white/70 sm:text-lg">
              {line.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* الأنواع */}
      <section className="border-t border-white/[0.06] py-12 sm:py-16">
        <div className="shark-container">
          <div>
            <p className="text-xs font-extrabold tracking-[0.22em] text-brand">الأنواع</p>
            <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">اختر النوع المناسب</h2>
            <p dir="rtl" className="mt-3 max-w-2xl text-white/65">
              كل نوع له وصف مختصر — الطلب مع استشارة عبر واتساب قبل الشراء.
            </p>
          </div>
          <ul
            className="mt-10 grid list-none grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
            role="list"
          >
            {line.variants.map((v) => (
              <li key={v.id}>
                <article className="shark-card flex h-full flex-col rounded-3xl p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-white">{v.name}</h3>
                  <p dir="rtl" className="mt-2 flex-1 text-sm leading-7 text-white/70">
                    {v.note}
                  </p>
                  <p className="mt-4 text-end text-lg font-semibold tabular-nums">
                    <span dir="ltr" lang="en" className="text-brand">
                      {formatPriceIQDEn(v.priceIQD)} IQD
                    </span>
                  </p>
                  <div className="mt-4">
                    <VariantOrderLink label={`${line.title} — ${v.name}`} />
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* فيديو شرح الخط */}
      <section className="border-t border-white/[0.06] bg-white/[0.02] py-12 sm:py-16">
        <div className="shark-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">فيديو الشرح</p>
            <h2 dir="rtl" className="mt-1 text-xl font-extrabold text-white sm:text-2xl">
              {line.explainerVideoTitleAr}
            </h2>
            <p dir="rtl" className="mt-2 text-sm text-white/55 sm:text-base">
              {line.explainerVideoNameAr}
            </p>
          </div>
          <div className="mt-8 sm:mt-10">
            <VimeoLargeEmbed vimeoId={line.explainerVimeoId} title={line.explainerVideoTitleAr} />
          </div>
          <p className="mx-auto mt-6 max-w-xl text-center text-xs leading-6 text-white/50">
            {site.whatsappNoteAr}
          </p>
        </div>
      </section>

      <SharkFeedbackSection categoryTitle={`${category.title} — ${line.title}`} />
    </main>
  );
}
