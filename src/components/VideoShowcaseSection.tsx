"use client";

import { DualVideoMarquees } from "./VideoMarquee";

export function VideoShowcaseSection() {
  return (
    <section className="relative min-w-0 py-10 sm:py-14">
      <div className="shark-container">
        <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
          لقطات ومحتوى
        </p>
        <h2
          dir="rtl"
          className="text-center text-xl font-extrabold text-white sm:text-2xl"
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
  );
}
