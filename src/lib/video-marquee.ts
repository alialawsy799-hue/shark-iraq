/**
 * أضِف أكبر عدد تريده من مقاطع فيميو؛ يُستخدم في شريطي الماركيه.
 * استبدِل `vimeoId` بمعرّف كل فيديو من رابط فيميو.
 */
export type MarqueeClip = {
  id: string;
  vimeoId: string;
  title: string;
};

export const defaultMarqueeVideos: MarqueeClip[] = [
  { id: "c01", vimeoId: "76979871", title: "شارك • تدريب" },
  { id: "c02", vimeoId: "76979871", title: "شارك • تعافي" },
  { id: "c03", vimeoId: "76979871", title: "شارك • منتج اليوم" },
  { id: "c04", vimeoId: "76979871", title: "شارك • لياقة" },
  { id: "c05", vimeoId: "76979871", title: "شارك • تغذية" },
  { id: "c06", vimeoId: "76979871", title: "شارك • نتائج" },
  { id: "c07", vimeoId: "76979871", title: "شارك • قبل / بعد" },
  { id: "c08", vimeoId: "76979871", title: "شارك • نصائح" },
  { id: "c09", vimeoId: "76979871", title: "شارك • وراء الكواليس" },
  { id: "c10", vimeoId: "76979871", title: "شارك • عميل سعيد" },
  { id: "c11", vimeoId: "76979871", title: "شارك • تمرين منزل🏠" },
  { id: "c12", vimeoId: "76979871", title: "شارك • دفعة طاقة⚡" },
];
