/**
 * فيديوهات SHARK TEAM المعروضة في شبكة الصفحة الرئيسية.
 *
 * كيف تضيف فيديو جديد:
 * 1) ارفع الفيديو على Vimeo.
 * 2) من رابط الفيديو خذ المعرف الرقمي مثل: https://vimeo.com/1190824620 → vimeoId = "1190824620".
 * 3) أضف العنصر إلى `sourceVideos` بنفس الشكل أدناه — وسيُكرَّر تلقائياً ليملأ الصفوف.
 *
 * ملاحظة: البطاقة بمقاس 9:16 (عمودي) — يُفضّل أن يكون الفيديو عمودياً.
 */
export type MarqueeClip = {
  id: string;
  vimeoId: string;
  title: string;
  /** عدد المشاهدات المعروض على البطاقة (مثل Instagram) */
  viewCount: number;
};

/** تنسيق 520K أو 7.1M */
export function formatViewCount(views: number): string {
  if (views >= 1_000_000) {
    const m = Math.round((views / 1_000_000) * 10) / 10;
    if (m >= 10) return `${Math.round(views / 1_000_000)}M`;
    const text = m.toFixed(1);
    return `${text.endsWith(".0") ? text.slice(0, -2) : text}M`;
  }
  const k = Math.round((views / 1_000) * 10) / 10;
  const text = k.toFixed(1);
  return `${text.endsWith(".0") ? text.slice(0, -2) : text}K`;
}

/** توزيع متباين بين 500K و 8M لكل بطاقة */
function buildViewCounts(count: number): number[] {
  const min = 500_000;
  const max = 8_000_000;
  const out: number[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / Math.max(count - 1, 1);
    const wave =
      0.22 +
      t * 0.56 +
      Math.sin(i * 1.73) * 0.14 +
      Math.cos(i * 2.41) * 0.1 +
      ((i * 17) % 7) * 0.02;
    const norm = Math.min(1, Math.max(0, wave));
    const raw = min + norm * (max - min);
    out.push(Math.round(raw / 10_000) * 10_000);
  }
  return out;
}

/**
 * القائمة الأصلية للفيديوهات الفريدة (بدون تكرار). الترتيب هنا = ترتيب الظهور.
 * نمط الصفوف على الموقع: 5 - 4 - 5 - 4 - 5 - 4 - 5 - 4 - 5 (9 صفوف = 41 بطاقة).
 */
const sourceVideos: Pick<MarqueeClip, "vimeoId">[] = [
  // الصف 1 (5)
  { vimeoId: "1191528755" }, // أول فيديو من اليمين
  { vimeoId: "1191349877" },
  { vimeoId: "1191349875" },
  { vimeoId: "1191529174" }, // ثاني من اليسار
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
  // الصف 6 (4)
  { vimeoId: "1191366871" },
  { vimeoId: "1191366782" },
  { vimeoId: "1191542801" },
  { vimeoId: "1191540132" },
  // الصف 7 (5)
  { vimeoId: "1191529850" },
  { vimeoId: "1191529848" },
  { vimeoId: "1191529688" },
  { vimeoId: "1191529690" },
  { vimeoId: "1191529700" },
  // الصف 8 (4)
  { vimeoId: "1191568398" },
  { vimeoId: "1191559960" },
  { vimeoId: "1191558755" },
  { vimeoId: "1191530501" },
  // الصف 9 (5)
  { vimeoId: "1191530574" },
  { vimeoId: "1191530787" },
  { vimeoId: "1191530767" },
  { vimeoId: "1191530583" },
  { vimeoId: "1191530707" },
];

/** عدد البطاقات الإجمالي = 5+4+5+4+5+4+5+4+5 = 41 بطاقة → 9 صفوف */
const TOTAL_CLIPS = 41;

const VIEW_COUNTS = buildViewCounts(TOTAL_CLIPS);

export const defaultMarqueeVideos: MarqueeClip[] = Array.from(
  { length: TOTAL_CLIPS },
  (_, i) => {
    const src = sourceVideos[i % sourceVideos.length];
    return {
      id: `clip-${(i + 1).toString().padStart(2, "0")}`,
      vimeoId: src.vimeoId,
      title: `شارك • فيديو ${i + 1}`,
      viewCount: VIEW_COUNTS[i],
    };
  }
);
