export const site = {
  name: "SHARK TEAM",
  tagline: "القمة في التغذية والتدريب",
  /** واتساب الاستشارة الطبية والطلب */
  whatsappNumberE164: "9647718669911",
  whatsappNoteAr:
    "ملاحظة: الطلب يكون عبر واتساب للحصول على استشارة صحية أفضل قبل الشراء.",
};

export function buildWhatsappOrderMessage(productName: string) {
  return `مرحباً SHARK TEAM، أرغب بطلب منتج «${productName}» مع الحصول على استشارة.`;
}

export function buildWhatsappUrl(message: string, numberE164 = site.whatsappNumberE164) {
  const text = encodeURIComponent(message);
  const cleaned = numberE164.replace(/[^\d]/g, "");
  return `https://wa.me/${cleaned}?text=${text}`;
}
