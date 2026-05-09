"use client";

import { motion, useReducedMotion } from "framer-motion";
import { User } from "lucide-react";
import { useMemo, useState } from "react";
import type { Review } from "@/lib/data";
import { seededReviews } from "@/lib/data";
import { StarRating } from "./StarRating";

/** بطاقة تقييم: تعليق كامل مع لفّ أسطر (بدون line-clamp) */
function ReviewCard({ r }: { r: Review }) {
  return (
    <div
      dir="rtl"
      className="shark-card flex h-full w-[min(18.5rem,calc(100%-1rem))] shrink-0 flex-col gap-3 rounded-2xl p-4 sm:w-[19.5rem] sm:flex-[0_0_19.5rem]"
    >
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand/35 bg-brand/5">
          <User className="h-5 w-5 text-brand/90" />
        </div>
        <div className="min-w-0 flex-1 text-end">
          <div className="text-sm font-semibold text-white">{r.name}</div>
          <div className="mt-1 flex justify-end">
            <StarRating value={r.rating} />
          </div>
        </div>
      </div>
      <p className="text-end text-sm leading-7 text-white/85 [overflow-wrap:anywhere] break-words">
        {r.comment}
      </p>
    </div>
  );
}

const REVIEW_MARQUEE_DURATION_SEC = 240;

function ReviewsMarquee({ reviews }: { reviews: Review[] }) {
  const reduceMotion = useReducedMotion();
  const items = useMemo(() => [...reviews, ...reviews], [reviews]);
  const shouldAnimate = !reduceMotion;

  return (
    <div
      dir="ltr"
      className="relative min-h-[10rem] overflow-hidden rounded-2xl ring-1 ring-white/10 sm:min-h-[11rem]"
    >
      <motion.div
        className="flex w-max flex-row flex-nowrap items-stretch gap-4 py-3 pe-2 ps-2 will-change-transform sm:gap-5 sm:pe-3 sm:ps-3"
        animate={shouldAnimate ? { x: ["0%", "-50%"] } : { x: "0%" }}
        transition={
          shouldAnimate
            ? {
                duration: REVIEW_MARQUEE_DURATION_SEC,
                repeat: Infinity,
                ease: "linear",
              }
            : undefined
        }
      >
        {items.map((r, idx) => (
          <ReviewCard key={`${r.id}-${idx}`} r={r} />
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-4 bg-gradient-to-r from-black/55 to-transparent sm:w-6" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-4 bg-gradient-to-l from-black/55 to-transparent sm:w-6" />
    </div>
  );
}

function ReviewForm({ onAdd }: { onAdd: (r: Review) => void }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  return (
    <form
      className="shark-card rounded-2xl p-5"
      onSubmit={(e) => {
        e.preventDefault();
        const trimmedName = name.trim();
        const trimmedComment = comment.trim();
        if (!trimmedName || !trimmedComment) return;
        onAdd({
          id: `user-${Date.now()}`,
          name: trimmedName,
          comment: trimmedComment,
          rating: Math.min(5, Math.max(1, rating)) as Review["rating"],
        });
        setComment("");
        setRating(5);
      }}
    >
      <div className="text-sm font-semibold text-white">شارك تجربتك</div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-white/80">
          الاسم الكامل
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="اسمك الثلاثي أو اللقب"
            className="h-11 rounded-xl border border-white/10 bg-black/40 px-3 text-white placeholder:text-white/35 outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/25"
          />
        </label>
        <label className="grid gap-2 text-sm text-white/80">
          عدد النجوم
          <div className="flex h-11 items-center rounded-xl border border-brand/20 bg-black/40 px-3 focus-within:border-brand/45">
            <StarRating value={rating} onChange={setRating} />
          </div>
        </label>
      </div>

      <label className="mt-3 grid gap-2 text-sm text-white/80">
        التجربة / التقييم
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="اكتب تجربتك باللهجة العراقية…"
          rows={4}
          className="rounded-xl border border-white/10 bg-black/40 p-3 text-white placeholder:text-white/35 outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/25"
        />
      </label>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs leading-6 text-white/55">
          بعد الإرسال يظهر تعليقك مباشرة في شريط الآراء.
        </div>
        <button type="submit" className="shark-btn-primary w-full sm:w-auto">
          إرسال
        </button>
      </div>
    </form>
  );
}

type SharkFeedbackSectionProps = {
  /** عند التمرير من صفحة تصنيف يُظهر سياق المسار */
  categoryTitle?: string;
};

export function SharkFeedbackSection({ categoryTitle }: SharkFeedbackSectionProps = {}) {
  const [reviews, setReviews] = useState<Review[]>(seededReviews);

  const heading = categoryTitle
    ? `آراء العملاء — ${categoryTitle}`
    : "تقييمات حقيقية. نتائج أوضح.";
  const subtext = categoryTitle
    ? `تجارب من اختاروا مسار «${categoryTitle}». شاركنا تجربتك لتساعد الآخرين على الاختيار.`
    : "تجارب ناس قبلك — قائمة متحركة ويتم تجديدها باستمرار.";

  return (
    <section className="min-w-0 py-12 sm:py-16">
      <div className="shark-container min-w-0">
        <div>
          <div className="text-xs font-extrabold tracking-[0.22em] text-brand">آراء العملاء</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-white/70">{subtext}</p>
        </div>

        <div className="mt-8 min-w-0">
          <ReviewsMarquee reviews={reviews} />
        </div>

        <div className="mt-10 grid min-w-0 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="shark-card min-w-0 rounded-2xl p-5 sm:p-6">
            <div className="text-sm font-semibold text-white">ماذا يقول الآخرون؟</div>
            <div className="mt-3 leading-7 text-white/70">
              تقييمات أكثر من 50 مستخدم—وكل يوم نضيف تجارب جديدة حتى يكون اختيارك أدق.
            </div>
            <div className="mt-5 grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
              {reviews.slice(0, 4).map((r) => (
                <div
                  key={r.id}
                  className="min-w-0 rounded-xl border border-brand/15 bg-black/30 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-white">{r.name}</div>
                    <StarRating value={r.rating} />
                  </div>
                  <p className="mt-2 text-sm leading-7 text-white/80 [overflow-wrap:anywhere] break-words">
                    {r.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <ReviewForm onAdd={(r) => setReviews((cur) => [r, ...cur])} />
        </div>
      </div>
    </section>
  );
}
