"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Player from "@vimeo/player";
import { Volume2, VolumeX } from "lucide-react";

type Props = {
  slotKey: string;
  vimeoId: string;
  title: string;
};

/** بطاقة فيميو: الكتم محلي حتى لا يُعاد رسم الشريط كاملاً ولا يتوقف الماركيه */
export function VimeoCard({ slotKey, vimeoId, title }: Props) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  const [ready, setReady] = useState(false);
  /** false = صوت يعمل، true = صامت (افتراضياً صامت لتسمح المتصفحات بالتشغيل التلقائي) */
  const [muted, setMuted] = useState(true);
  const stableId = useId();

  const src = useMemo(() => {
    const base = `https://player.vimeo.com/video/${encodeURIComponent(vimeoId)}`;
    const params = new URLSearchParams({
      background: "1",
      autoplay: "1",
      loop: "1",
      muted: "1",
      autopause: "0",
      title: "0",
      byline: "0",
      portrait: "0",
      playsinline: "1",
      controls: "0",
    });
    return `${base}?${params.toString()}`;
  }, [vimeoId]);

  useEffect(() => {
    if (!iframeRef.current) return;
    const p = new Player(iframeRef.current);
    playerRef.current = p;

    let cancelled = false;
    (async () => {
      try {
        await p.setVolume(0);
        await p.setMuted(true);
        await p.play();
        if (!cancelled) setReady(true);
      } catch {
        if (!cancelled) setReady(true);
      }
    })();

    return () => {
      cancelled = true;
      playerRef.current?.destroy().catch(() => {});
      playerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    (async () => {
      try {
        if (muted) {
          await p.setMuted(true);
          await p.setVolume(0);
        } else {
          await p.setMuted(false);
          await p.setVolume(1);
        }
        await p.play();
      } catch {
        // سياسات التشغيل التلقائي قد ترفض الصوت حتى بعد النقر
      }
    })();
  }, [muted]);

  return (
    <div
      className={[
        "relative shrink-0 overflow-hidden rounded-2xl border",
        "border-white/10 bg-black shadow-[0_0_0_1px_rgba(30,111,217,0.15)]",
        "w-[7.75rem] sm:w-[9.25rem] md:w-[10.75rem]",
        "aspect-[9/16]",
        "transition-[transform,box-shadow] duration-300",
        muted
          ? "hover:scale-[1.02] hover:border-brand/25"
          : "z-[2] scale-[1.03] ring-2 ring-brand/60 shadow-[0_0_32px_rgba(30,111,217,0.35)]",
      ].join(" ")}
      data-slot={slotKey}
      aria-label={title}
    >
      <iframe
        ref={iframeRef}
        id={`vimeo-${stableId}-${slotKey}`}
        src={src}
        className="absolute inset-0 h-full w-full"
        allow="autoplay; fullscreen; picture-in-picture"
        title={title}
      />

      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        className={[
          "absolute end-2 top-2 z-10 inline-flex items-center gap-1",
          "rounded-full border border-brand/35 bg-black/70 px-2 py-1.5",
          "text-[10px] font-bold text-white backdrop-blur-md sm:gap-2 sm:px-3 sm:py-2 sm:text-xs",
          "hover:border-brand/55 hover:bg-black/75 active:scale-[0.98] transition",
        ].join(" ")}
        aria-label={muted ? "تشغيل الصوت" : "كتم الصوت"}
      >
        {muted ? (
          <VolumeX className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        ) : (
          <Volume2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        )}
        <span>{muted ? "صامت" : "صوت"}</span>
      </button>

      {!ready && (
        <div className="absolute inset-0 grid place-items-center px-2 text-center text-[11px] text-white/70 sm:text-sm">
          جاري التحميل…
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-2 sm:p-2.5">
        <div className="rounded-lg border border-brand/20 bg-black/70 px-2 py-1.5 backdrop-blur-md">
          <div className="line-clamp-2 text-[10px] font-semibold leading-snug tracking-wide text-white/90 sm:text-[11px]">
            {title}
          </div>
        </div>
      </div>
    </div>
  );
}
