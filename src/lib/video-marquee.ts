/**
 * فيديوهات SHARK TEAM المعروضة في شبكة الصفحة الرئيسية.
 *
 * كيف تضيف فيديو جديد:
 * 1) ارفع الفيديو على Vimeo.
 * 2) من رابط الفيديو خذ المعرف الرقمي مثل: https://vimeo.com/1190824620 → vimeoId = "1190824620".
 * 3) أضف العنصر إلى `sourceVideos` بنفس الشكل أدناه — وسيُكرَّر تلقائياً ليملأ 10 صفوف.
 *
 * ملاحظة: البطاقة بمقاس 9:16 (عمودي) — يُفضّل أن يكون الفيديو عمودياً.
 */
export type MarqueeClip = {
  id: string;
  vimeoId: string;
  title: string;
};

/**
 * القائمة الأصلية للفيديوهات الفريدة (بدون تكرار). الترتيب هنا = ترتيب الظهور.
 * نمط الصفوف على الموقع: 5 - 4 - 5 - 4 - 5 - 4 - 5 - 4 - 5 - 4 (10 صفوف = 45 بطاقة).
 */
const sourceVideos: Pick<MarqueeClip, "vimeoId">[] = [
  // الصف 1 (5)
  { vimeoId: "1191350045" },
  { vimeoId: "1191349877" },
  { vimeoId: "1191349875" },
  { vimeoId: "1191349915" },
  { vimeoId: "1191349872" },
  // الصف 2 (4)
  { vimeoId: "1191352195" },
  { vimeoId: "1191352236" },
  { vimeoId: "1191352178" },
  { vimeoId: "1191352183" },
  // الصف 3 (5)
  { vimeoId: "1191354468" },
  { vimeoId: "1191354476" },
  { vimeoId: "1191354400" },
  { vimeoId: "1191354310" },
  { vimeoId: "1191353613" },
  // الصف 4 (4)
  { vimeoId: "1191357167" },
  { vimeoId: "1191357184" },
  { vimeoId: "1191357180" },
  { vimeoId: "1191357174" },
  // الصف 5 (5)
  { vimeoId: "1191360432" },
  { vimeoId: "1191360403" },
  { vimeoId: "1191360419" },
  { vimeoId: "1191360447" },
  { vimeoId: "1191360428" },
];

/** عدد البطاقات الإجمالي = 5+4 لكل صفين × 5 = 45 بطاقة → 10 صفوف */
const TOTAL_CLIPS = 45;

export const defaultMarqueeVideos: MarqueeClip[] = Array.from(
  { length: TOTAL_CLIPS },
  (_, i) => {
    const src = sourceVideos[i % sourceVideos.length];
    return {
      id: `clip-${(i + 1).toString().padStart(2, "0")}`,
      vimeoId: src.vimeoId,
      title: `شارك • فيديو ${i + 1}`,
    };
  }
);
