"use client";

/**
 * ماركيه CSS (translate3d) لسلاسة أفضل من Framer على مسار طويل.
 * على الهاتف: شريط واحد + عدد أقل من الفيديوهات لتجنّب خنق Safari لعدد كبير من iframes.
 */

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { VimeoCard } from "./VimeoCard";
import { defaultMarqueeVideos } from "@/lib/video-marquee";

export type MarqueeVideo = { id: string; vimeoId: string; title: string };

const DESKTOP_MIN_SLOTS = 12;
const MOBILE_MIN_SLOTS = 8;
const MOBILE_MAX_UNIQUE = 8;

function pickMobileSubset(videos: MarqueeVideo[]): MarqueeVideo[] {
  if (videos.length <= MOBILE_MAX_UNIQUE) return videos;
  const step = Math.ceil(videos.length / MOBILE_MAX_UNIQUE);
  return videos.filter((_, i) => i % step === 0).slice(0, MOBILE_MAX_UNIQUE);
}

type StripProps = {
  videos: MarqueeVideo[];
  speedSeconds?: number;
  initialOffsetFrac?: number;
  visualFlow?: "rightToLeft" | "leftToRight";
  /** أقل عدد بطاقات قبل تكرار القائمة داخل الشريط */
  minSlotsPerStrip?: number;
};

function VideoMarqueeStrip({
  videos,
  speedSeconds = 150,
  initialOffsetFrac = 0,
  visualFlow = "rightToLeft",
  minSlotsPerStrip = DESKTOP_MIN_SLOTS,
}: StripProps) {
  const slots = useMemo(() => {
    const out: { slotKey: string; video: MarqueeVideo }[] = [];
    if (videos.length === 0) return out;
    const copies =
      videos.length >= minSlotsPerStrip
        ? 1
        : Math.ceil(minSlotsPerStrip / videos.length);
    for (let c = 0; c < copies; c++) {
      videos.forEach((v, idx) => {
        out.push({
          slotKey: `${v.id}-${c}-${idx}`,
          video: v,
        });
      });
    }
    return out;
  }, [videos, minSlotsPerStrip]);

  /** نسختان متطابقتان لحلقة لا نهائية بـ translateX(-50%) */
  const trackItems = useMemo(() => [...slots, ...slots], [slots]);

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
  /** null = لم نعرف بعد (تجنّب تكديس iframes على الهاتف قبل الجلسة) */
  const [layout, setLayout] = useState<"pending" | "narrow" | "wide">("pending");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setLayout(mq.matches ? "narrow" : "wide");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const mobilePool = useMemo(() => pickMobileSubset(videos), [videos]);

  if (layout === "pending") {
    return (
      <section
        dir="ltr"
        aria-hidden
        className="min-h-[15rem] rounded-2xl bg-black/25 ring-1 ring-white/10 sm:min-h-[16rem]"
      />
    );
  }

  /** هاتف: شريط واحد + فيديوهات أقل = أقل iframes نشطة (Safari يخنق الكثرة) */
  if (layout === "narrow") {
    return (
      <section dir="ltr" className="space-y-4 sm:space-y-6">
        <VideoMarqueeStrip
          videos={mobilePool}
          speedSeconds={200}
          initialOffsetFrac={0}
          visualFlow="rightToLeft"
          minSlotsPerStrip={MOBILE_MIN_SLOTS}
        />
      </section>
    );
  }

  const split = videos.length >= DESKTOP_MIN_SLOTS * 2;
  const topVideos = split ? videos.filter((_, i) => i % 2 === 0) : videos;
  const bottomVideos = split ? videos.filter((_, i) => i % 2 === 1) : videos;

  return (
    <section dir="ltr" className="space-y-4 sm:space-y-6">
      <VideoMarqueeStrip
        videos={topVideos}
        speedSeconds={165}
        initialOffsetFrac={0}
        visualFlow="rightToLeft"
        minSlotsPerStrip={DESKTOP_MIN_SLOTS}
      />
      <VideoMarqueeStrip
        videos={bottomVideos}
        speedSeconds={165}
        initialOffsetFrac={0.35}
        visualFlow="leftToRight"
        minSlotsPerStrip={DESKTOP_MIN_SLOTS}
      />
    </section>
  );
}
