"use client";

import { Star } from "lucide-react";

export function StarRating({
  value,
  onChange,
  size = 18,
}: {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
}) {
  const interactive = Boolean(onChange);
  return (
    <div
      className="inline-flex items-center gap-1"
      aria-label={`${value} من ٥ نجوم`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const v = i + 1;
        const filled = v <= value;
        const common =
          "transition-colors " +
          (interactive ? "cursor-pointer hover:text-brand" : "");
        return (
          <button
            key={v}
            type="button"
            disabled={!interactive}
            onClick={() => onChange?.(v)}
            className={interactive ? "p-0.5" : "p-0.5 pointer-events-none"}
            aria-label={`تقييم ${v} من ٥`}
          >
            <Star
              className={[
                common,
                filled ? "text-brand" : "text-white/28",
              ].join(" ")}
              width={size}
              height={size}
              fill={filled ? "currentColor" : "transparent"}
            />
          </button>
        );
      })}
    </div>
  );
}

