"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * يُعاد تركيبه عند كل تنقّل بين الصفحات وعند التحديث — مناسب لانتقال دخول ناعم.
 */
export default function RootTemplate({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col">{children}</div>
    );
  }

  return (
    <motion.div
      className="flex min-h-0 w-full min-w-0 flex-1 flex-col"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.48,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
