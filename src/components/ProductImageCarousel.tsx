"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const AUTO_MS = 5000;
const SWIPE_THRESHOLD = 50;

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

type Props = {
  images: string[];
  alt: string;
};

export function ProductImageCarousel({ images, alt }: Props) {
  const slides = images.filter(Boolean);
  const [[index, direction], setSlide] = useState([0, 0]);
  const [pausedUntil, setPausedUntil] = useState(0);

  const slideCount = slides.length;
  const safeIndex = slideCount > 0 ? ((index % slideCount) + slideCount) % slideCount : 0;

  const paginate = useCallback(
    (dir: 1 | -1) => {
      if (slideCount <= 1) return;
      setPausedUntil(Date.now() + AUTO_MS * 2);
      setSlide(([i]) => [(i + dir + slideCount) % slideCount, dir]);
    },
    [slideCount]
  );

  useEffect(() => {
    if (slideCount <= 1) return;
    const timer = setInterval(() => {
      if (Date.now() < pausedUntil) return;
      paginate(1);
    }, AUTO_MS);
    return () => clearInterval(timer);
  }, [slideCount, pausedUntil, paginate]);

  if (slideCount === 0) return null;

  const frameClass =
    "relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-black ring-1 ring-white/5 touch-pan-y";

  if (slideCount === 1) {
    return (
      <div className={frameClass}>
        <Image
          src={slides[0]}
          alt={alt}
          fill
          sizes="(max-width:768px) 100vw, 40vw"
          className="object-contain"
          priority
        />
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className={frameClass}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={safeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            onDragEnd={(_, info) => {
              if (info.offset.x < -SWIPE_THRESHOLD) paginate(1);
              else if (info.offset.x > SWIPE_THRESHOLD) paginate(-1);
            }}
          >
            <Image
              src={slides[safeIndex]}
              alt={`${alt} — ${safeIndex + 1}`}
              fill
              sizes="(max-width:768px) 100vw, 40vw"
              className="pointer-events-none object-contain select-none"
              priority={safeIndex === 0}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className="mt-3 flex items-center justify-center gap-1.5"
        role="tablist"
        aria-label="صور المنتج"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === safeIndex}
            aria-label={`صورة ${i + 1}`}
            onClick={() => {
              if (i === safeIndex) return;
              setPausedUntil(Date.now() + AUTO_MS * 2);
              setSlide([i, i > safeIndex ? 1 : -1]);
            }}
            className={[
              "h-1.5 rounded-full transition-all",
              i === safeIndex
                ? "w-6 bg-brand shadow-[0_0_10px_rgba(30,111,217,0.55)]"
                : "w-1.5 bg-white/30 hover:bg-white/50",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
