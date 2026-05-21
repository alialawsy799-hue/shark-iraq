"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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

/** جلب thumbnail مباشرة من Vimeo (يعكس الصورة المخصّصة في إعدادات الفيديو) */
async function fetchVimeoThumbnail(vimeoId: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(
        `https://vimeo.com/${vimeoId}`
      )}&width=1280`
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { thumbnail_url?: string };
    return data.thumbnail_url ?? null;
  } catch {
    return null;
  }
}

/** يحمّل كل المعرفات الفريدة دفعات لتجنّب حد الطلبات */
function useVimeoThumbnails(uniqueIds: string[]) {
  const idsKey = uniqueIds.join(",");
  const [thumbs, setThumbs] = useState<Record<string, string>>({});

  useEffect(() => {
    if (uniqueIds.length === 0) return;
    let cancelled = false;
    const map: Record<string, string> = {};

    (async () => {
      const BATCH = 5;
      for (let i = 0; i < uniqueIds.length; i += BATCH) {
        const batch = uniqueIds.slice(i, i + BATCH);
        await Promise.all(
          batch.map(async (id) => {
            const url = await fetchVimeoThumbnail(id);
            if (url) map[id] = url;
          })
        );
        if (!cancelled) setThumbs({ ...map });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [idsKey]);

  return thumbs;
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
  const [activeClip, setActiveClip] = useState<MarqueeClip | null>(null);
  const displayVideos = useMemo(
    () => (targetRows ? expandToTargetRows(videos, targetRows) : videos),
    [videos, targetRows]
  );
  const rows = chunkAlternating(displayVideos);
  const uniqueVimeoIds = useMemo(
    () => [...new Set(displayVideos.map((c) => c.vimeoId))],
    [displayVideos]
  );
  const thumbs = useVimeoThumbnails(uniqueVimeoIds);

  return (
    <>
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
                  transition={{
                    duration: 0.35,
                    delay: Math.min(idx * 0.015, 0.2),
                  }}
                  className={[
                    "col-span-2 min-w-0",
                    isOffsetRow && idx === 0 ? "col-start-2" : "",
                  ].join(" ")}
                >
                  <VideoTile
                    clip={clip}
                    thumbUrl={thumbs[clip.vimeoId]}
                    onOpen={() => setActiveClip(clip)}
                  />
                </motion.li>
              ))}
            </ul>
          );
        })}
      </div>

      <VideoLightbox clip={activeClip} onClose={() => setActiveClip(null)} />
    </>
  );
}

function VideoTile({
  clip,
  thumbUrl,
  onOpen,
}: {
  clip: MarqueeClip;
  thumbUrl?: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`فتح ${clip.title}`}
      className="group relative block aspect-[9/16] w-full overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_0_0_1px_rgba(30,111,217,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 sm:rounded-2xl"
    >
      {thumbUrl ? (
        <Image
          src={thumbUrl}
          alt={clip.title}
          fill
          sizes="(max-width:640px) 20vw, (max-width:1024px) 20vw, 200px"
          className="object-cover transition group-hover:scale-[1.03]"
          unoptimized
          loading="lazy"
        />
      ) : (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-brand/20 via-black to-brand/10"
          aria-hidden
        />
      )}
      <span
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10 transition group-hover:opacity-80"
        aria-hidden
      />
    </button>
  );
}

function VideoLightbox({
  clip,
  onClose,
}: {
  clip: MarqueeClip | null;
  onClose: () => void;
}) {
  const [playable, setPlayable] = useState<"checking" | "ok" | "missing">("checking");

  useEffect(() => {
    if (!clip) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [clip, onClose]);

  useEffect(() => {
    if (!clip) return;
    let cancelled = false;
    setPlayable("checking");
    (async () => {
      try {
        const res = await fetch(
          `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(
            `https://vimeo.com/${clip.vimeoId}`
          )}`
        );
        if (!cancelled) setPlayable(res.ok ? "ok" : "missing");
      } catch {
        if (!cancelled) setPlayable("missing");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [clip]);

  return (
    <AnimatePresence>
      {clip && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={clip.title}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-auto max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative aspect-[9/16] h-[min(82vh,calc(100vw*16/9))] overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_24px_80px_rgba(30,111,217,0.35)]"
              style={{ maxWidth: "92vw" }}
            >
              {playable === "checking" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 grid place-items-center bg-black/90"
                >
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-brand" />
                </motion.div>
              )}

              {playable === "missing" && (
                <div className="absolute inset-0 grid place-items-center bg-black/95 p-6 text-center">
                  <p className="text-lg font-extrabold text-white">الفيديو غير متوفر</p>
                  <p dir="rtl" className="mt-2 text-sm leading-7 text-white/65">
                    هذا المقطع محذوف أو غير متاح على Vimeo. أرسل رابط embed جديد ليُستبدل
                    في الموقع.
                  </p>
                  <p className="mt-3 font-mono text-xs text-white/40">ID: {clip.vimeoId}</p>
                </div>
              )}

              {playable === "ok" && (
                <iframe
                  src={`https://player.vimeo.com/video/${encodeURIComponent(
                    clip.vimeoId
                  )}?autoplay=1&playsinline=1&title=0&byline=0&portrait=0&dnt=1`}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  title={clip.title}
                />
              )}

              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق الفيديو"
                className="absolute right-2 top-2 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/30 bg-black/75 text-white shadow-[0_6px_20px_rgba(0,0,0,0.55)] backdrop-blur-md transition hover:scale-105 hover:border-white/60 hover:bg-black/90 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:right-3 sm:top-3 sm:h-12 sm:w-12"
              >
                <X className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.5} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

