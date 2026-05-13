"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, MessageCircle } from "lucide-react";
import type { Category, Product } from "@/lib/data";
import { buildWhatsappOrderMessage, buildWhatsappUrl, site } from "@/lib/site";
import { SharkFeedbackSection } from "./Reviews";

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

export function ProductPageClient({
  category,
  product,
}: {
  category: Category;
  product: Product;
}) {
  const orderHref = buildWhatsappUrl(buildWhatsappOrderMessage(product.name));

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
            <Link href="/" className="hover:text-white">الرئيسية</Link>
            <ChevronRight className="h-3.5 w-3.5 text-white/30" />
            <Link href="/mukammalat" className="hover:text-white">المكملات الغذائية</Link>
            <ChevronRight className="h-3.5 w-3.5 text-white/30" />
            <Link href={`/category/${category.slug}`} className="hover:text-white">
              {category.title}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-white/30" />
            <span className="text-white/85">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* رأس المنتج */}
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
            className="shark-card grid gap-6 rounded-3xl p-5 sm:p-7 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-8 md:p-9"
          >
            <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#f8f9fb]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width:768px) 100vw, 40vw"
                className="object-contain p-6"
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
              <p
                dir="rtl"
                className="mt-4 text-pretty text-base leading-8 text-white/75 sm:text-lg"
              >
                {product.bio}
              </p>

              <div className="mt-6">
                <a
                  href={orderHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shark-btn-primary w-full gap-2 sm:w-auto"
                >
                  <MessageCircle className="h-5 w-5 shrink-0" />
                  اطلب «{product.name}» عبر واتساب
                </a>
                <p className="mt-3 text-end text-xs leading-6 text-white/55">
                  {site.whatsappNoteAr}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* فيديو الشرح */}
      <section className="border-t border-white/[0.06] bg-white/[0.02] py-12 sm:py-16">
        <div className="shark-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
              فيديو شرح المنتج
            </p>
            <h2 dir="rtl" className="mt-1 text-xl font-extrabold text-white sm:text-2xl">
              شرح مرئي لـ {product.name}
            </h2>
          </div>
          <div className="mt-8 sm:mt-10">
            <VimeoLargeEmbed
              vimeoId={product.howToUseVimeoId}
              title={`فيديو شرح • ${product.name}`}
            />
          </div>
        </div>
      </section>

      {/* آراء العملاء */}
      <SharkFeedbackSection categoryTitle={`${category.title} — ${product.name}`} />
    </main>
  );
}
