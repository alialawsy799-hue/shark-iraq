"use client";

/**
 * ماركيه CSS (translate3d) لسلاسة أفضل من Framer على مسار طويل.
 * الحركة لا تتوقف عند تشغيل الصوت — الكتم داخل كل بطاقة فقط.
 */

import { useMemo } from "react";
import type { CSSProperties } from "react";
import { VimeoCard } from "./VimeoCard";
import { defaultMarqueeVideos } from "@/lib/video-marquee";

export type MarqueeVideo = { id: string; vimeoId: string; title: string };

/** الحد الأدنى لعدد البطاقات في كل شريط — يضمن استمرار الحلقة حتى لو كان عدد الفيديوهات قليلاً */
const MIN_SLOTS_PER_STRIP = 12;

type StripProps = {
  videos: MarqueeVideo[];
  speedSeconds?: number;
  initialOffsetFrac?: number;
  visualFlow?: "rightToLeft" | "leftToRight";
};

function VideoMarqueeStrip({
  videos,
  speedSeconds = 150,
  initialOffsetFrac = 0,
  visualFlow = "rightToLeft",
}: StripProps) {
  const slots = useMemo(() => {
    const out: { slotKey: string; video: MarqueeVideo }[] = [];
    if (videos.length === 0) return out;
    /** عند توفر فيديوهات كافية لعرض شريط مستمر، لا حاجة للتكرار الداخلي */
    const copies =
      videos.length >= MIN_SLOTS_PER_STRIP
        ? 1
        : Math.ceil(MIN_SLOTS_PER_STRIP / videos.length);
    for (let c = 0; c < copies; c++) {
      videos.forEach((v, idx) => {
        out.push({
          slotKey: `${v.id}-${c}-${idx}`,
          video: v,
        });
      });
    }
    return out;
  }, [videos]);

  /** نسختان متطابقتان لحلقة لا نهائية بـ translateX(-50%) */
  const trackItems = useMemo(() => [...slots, ...slots], [slots]);

  /** دورة أطول ≈ ٣–٤ دقائق — عدّل speedSeconds للإبطاء أو التسريع */
  const durationSec = Math.max(speedSeconds, 90 + videos.length * 6) * 1.25;
  const delaySec = -initialOffsetFrac * durationSec;
  const reverse = visualFlow === "leftToRight";

  return (
    <div className="relative isolate min-h-[14rem] overflow-hidden rounded-2xl bg-black/20 ring-1 ring-white/10 sm:min-h-[15.5rem] md:min-h-[17rem]">
      <div dir="ltr" className="shark-marquee-viewport h-full touch-pan-y">
        <div
          className={[
            "shark-marquee-track flex w-max flex-nowrap gap-2 py-3 pe-4 ps-4 sm:gap-3",
            reverse ? "shark-marquee-track--reverse" : "",
          ].join(" ")}
          style={
            {
              "--marquee-duration": `${durationSec}s`,
              "--marquee-delay": `${delaySec}s`,
            } as CSSProperties
          }
        >
          {trackItems.map(({ slotKey, video }, idx) => (
            <VimeoCard
              key={`${slotKey}-t${idx}`}
              slotKey={`${slotKey}-t${idx}`}
              vimeoId={video.vimeoId}
              title={video.title}
            />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-5 bg-gradient-to-r from-black/70 to-transparent sm:w-8" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-5 bg-gradient-to-l from-black/70 to-transparent sm:w-8" />
    </div>
  );
}

type DualProps = {
  videos?: MarqueeVideo[];
};

export function DualVideoMarquees({ videos = defaultMarqueeVideos }: DualProps) {
  /**
   * عند توفر فيديوهات وافرة (≥ ضِعف الحد الأدنى) نقسم القائمة على الشريطين
   * لتقليل عدد الـ iframes في كل شريط — وإلّا نُمرّر القائمة كاملة لكليهما
   * حتى تبقى الحلقة مكتنزة بصرياً.
   */
  const split = videos.length >= MIN_SLOTS_PER_STRIP * 2;
  const topVideos = split ? videos.filter((_, i) => i % 2 === 0) : videos;
  const bottomVideos = split ? videos.filter((_, i) => i % 2 === 1) : videos;

  return (
    <section dir="ltr" className="space-y-4 sm:space-y-6">
      <VideoMarqueeStrip
        videos={topVideos}
        speedSeconds={165}
        initialOffsetFrac={0}
        visualFlow="rightToLeft"
      />
      <VideoMarqueeStrip
        videos={bottomVideos}
        speedSeconds={165}
        initialOffsetFrac={0.35}
        visualFlow="leftToRight"
      />
    </section>
  );
}
