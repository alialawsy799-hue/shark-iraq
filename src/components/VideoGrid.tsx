"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { MarqueeClip } from "@/lib/video-marquee";
import { defaultMarqueeVideos } from "@/lib/video-marquee";

type Props = {
  videos?: MarqueeClip[];
  /** عدد الصفوف المطلوب — تتكرر الفيديوهات بنفس الترتيب لتعبئة الصفوف */
  targetRows?: number;
};

/**
 * يقسّم القائمة على نمط متناوب 5 - 4 - 5 - 4 ... لإنتاج صفوف نشطة بصرياً.
 * الصف ذو 4 بطاقات يُزاح للوسط (offset نصف بطاقة على كل جانب) داخل شبكة من 10 أعمدة.
 */
function chunkAlternating(videos: MarqueeClip[]): MarqueeClip[][] {
  const rows: MarqueeClip[][] = [];
  let i = 0;
  let big = true;
  while (i < videos.length) {
    const size = big ? 5 : 4;
    rows.push(videos.slice(i, i + size));
    i += size;
    big = !big;
  }
  return rows;
}

/** يكرر الفيديوهات بنفس الترتيب لملء العدد المطلوب من الفتحات (Slots) */
function expandToTargetRows(
  videos: MarqueeClip[],
  targetRows: number
): MarqueeClip[] {
  if (videos.length === 0 || targetRows <= 0) return videos;
  let totalSlots = 0;
  for (let r = 0; r < targetRows; r++) {
    totalSlots += r % 2 === 0 ? 5 : 4;
  }
  const out: MarqueeClip[] = [];
  for (let i = 0; i < totalSlots; i++) {
    const src = videos[i % videos.length];
    const cycle = Math.floor(i / videos.length);
    out.push({
      ...src,
      id: cycle === 0 ? src.id : `${src.id}-c${cycle}`,
    });
  }
  return out;
}

export function VideoGrid({
  videos = defaultMarqueeVideos,
  targetRows,
}: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const displayVideos = useMemo(
    () => (targetRows ? expandToTargetRows(videos, targetRows) : videos),
    [videos, targetRows]
  );
  const rows = chunkAlternating(displayVideos);

  return (
    <div className="space-y-1.5 sm:space-y-3 lg:space-y-4">
      {rows.map((row, rowIdx) => {
        const isOffsetRow = row.length === 4;
        return (
          <ul
            key={`row-${rowIdx}`}
            role="list"
            className="grid grid-cols-10 gap-1.5 sm:gap-3 lg:gap-4"
          >
            {row.map((clip, idx) => (
              <motion.li
                key={clip.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, delay: Math.min(idx * 0.015, 0.2) }}
                className={[
                  "col-span-2 min-w-0",
                  isOffsetRow && idx === 0 ? "col-start-2" : "",
                ].join(" ")}
              >
                <VideoTile
                  clip={clip}
                  isActive={activeId === clip.id}
                  onPlay={() => setActiveId(clip.id)}
                />
              </motion.li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}

function VideoTile({
  clip,
  isActive,
  onPlay,
}: {
  clip: MarqueeClip;
  isActive: boolean;
  onPlay: () => void;
}) {
  const thumbUrl = `https://vumbnail.com/${clip.vimeoId}.jpg`;
  const playerSrc = `https://player.vimeo.com/video/${encodeURIComponent(
    clip.vimeoId
  )}?autoplay=1&playsinline=1&title=0&byline=0&portrait=0&dnt=1`;

  return (
    <div className="group relative aspect-[9/16] overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_0_0_1px_rgba(30,111,217,0.18)] sm:rounded-2xl">
      {isActive ? (
        <iframe
          src={playerSrc}
          className="absolute inset-0 h-full w-full border-0"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          title={clip.title}
        />
      ) : (
        <button
          type="button"
          onClick={onPlay}
          aria-label={`تشغيل ${clip.title}`}
          className="absolute inset-0 block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
        >
          <Image
            src={thumbUrl}
            alt={clip.title}
            fill
            sizes="(max-width:640px) 20vw, (max-width:1024px) 20vw, 200px"
            className="object-cover transition group-hover:scale-[1.03]"
            unoptimized
            loading="lazy"
          />
          <span
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10 opacity-100 transition group-hover:opacity-80"
            aria-hidden
          />
        </button>
      )}
    </div>
  );
}
